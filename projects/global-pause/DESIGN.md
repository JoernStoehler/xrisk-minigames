# Engine Design — V2 Rearchitecture

This documents the target engine design, decided in the Feb 15 2026 design session. The current engine (v1) uses flat resources (PC, cooperation, globalSupport) and template-based events with dice rolls. V2 replaces this with a richer simulation that communicates *why enforcement is hard*, not just *that it is hard*.

The player-facing surface stays the same: events appear on a map, player reads and decides, consequences ripple. What changes is the simulation underneath.

---

## Core Principles

1. **Factions are event generators, not UI elements.** Terrorists, opposition parties, pro-ASI movements — none need their own panel. They're implicit in event rate functions that read opinion/political state.
2. **The player sees polls, not numbers.** Opinion distributions are shown as survey results, not raw floats. The player learns to read the world rather than optimize a spreadsheet.
3. **Ordered reducer list, not ECS/phases.** The tick is a flat `Array<(state: State) => State>` run sequentially. Most do no-ops. Ordering is just position in the array.
4. **Safety progress is milestone-based, not linear.** No fake 0-100 bar that implies steady progress. Discrete breakthroughs unlocked by events.
5. **Budget is earmarked, not fungible.** Free pool + project-bound pools that expire.

---

## State Shape

```ts
interface GameState {
  week: number
  phase: GamePhase        // 'playing' | 'won' | 'lost'
  difficulty: Difficulty
  speed: GameSpeed        // 0 | 1 | 2 | 4
  maxWeeks: number
  rngState: number

  // --- Opinion distribution ---
  // N simulated population members, 2 axes each
  // Modules communicate through this: media shifts it, politics reads it,
  // producers check it to spawn protests/support events
  opinion: {
    salience: Float64Array   // [0,1] how much they care about AI/ASI risk
    valence: Float64Array    // [-1,1] anti-pause ↔ pro-pause
    // N ~ 200: enough for meaningful distributions, cheap to iterate
  }

  // --- Budget ---
  budget: {
    free: number             // unallocated $M, spend on anything
    projects: Array<{
      id: string
      label: string
      amount: number         // remaining $M
      expiresWeek: number    // unused funds returned to member states
    }>
  }

  // --- Frontier capability ---
  frontier: number           // 0-100, how close to ASI
  // No linear safety bar. Safety tracked as milestone flags in history.

  // --- Political actors (AoS) ---
  political: {
    media:    { salience: number; valence: number }
    usGov:    { salience: number; valence: number; trust: number }
    chinaGov: { salience: number; valence: number; trust: number }
  }
  // salience: how much this actor treats ASI/IAS as worth acting on
  // valence:  is IAS seen as useful (+) or harmful (-)?
  // trust:    where in the org structure does this gov place its people?
  //           high = internal/supportive, low = external/controlling
  //
  // These three pick the *variant* of government events:
  //   low salience + any       → neglect (no funding, no interference)
  //   high sal + pos val + hi trust  → internal support (grants, embedded advisors)
  //   high sal + pos val + lo trust  → external control (funding with strings)
  //   high sal + neg val + lo trust  → hostile (defunding, investigation)
  //   high sal + neg val + hi trust  → coup-like (insiders redirect mission)

  // --- Events ---
  events: ActiveEvent[]      // currently on the map
  timers: Timer[]            // pending delayed effects
  history: ActiveEvent[][]   // history[week] = events resolved that week
}
```

### ActiveEvent

```ts
interface ActiveEvent {
  id: string
  type: string
  location: [number, number]       // lat, lng for map placement
  bubble: { icon: string; color: string; label: string }
  modal: {
    title: string
    description: string
    decisions: Decision[]
  }
  createdWeek: number
  timeoutWeek: number | null       // null = persists until decided
  onTick?: ReducerFn               // e.g. drain budget while unresolved
  onTimeout?: ReducerFn            // what happens if player ignores it
  autoResolve?: (state: GameState) => string | null  // returns decision id if condition met
}

interface Decision {
  id: string
  label: string
  description: string
  apply: (state: GameState) => GameState  // immediate effects
  followUp?: EventSpawner                 // delayed consequences
}
```

### Timer

```ts
interface Timer {
  id: string
  firesAtWeek: number
  apply: ReducerFn
}
```

---

## Reducer List (tick order)

Each tick runs these in order. Most are no-ops most ticks.

| # | Reducer | What it does |
|---|---------|-------------|
| 1 | **opinionDrift** | Social learning: agents communicate, salience/valence drift toward local weighted averages. Clustering emerges naturally. |
| 2 | **mediaDynamics** | Media outlets (in opinion array) optimize for readership (corporate incentive), socially learn (workers have opinions), influence readers. Negative news bias. |
| 3 | **politicalUpdate** | US gov & China gov salience/valence/trust drift based on opinion distribution, recent events in history, bilateral tension. |
| 4 | **budgetAccrual** | Income from political actors based on their salience × valence × trust. Low salience = low funding. Negative valence = funding with strings or cuts. |
| 5 | **projectExpiry** | Check project budgets, expire any past deadline, return unused funds to member states (they're gone). |
| 6 | **frontierAdvance** | Passive advancement based on frontier level + modifiers from history (breakthroughs, leaked research, compute availability). |
| 7 | **eventGeneration** | Loop over event producers. Each computes spawn probability from state. Roll. Sample parameters (location, names). Add to map. |
| 8 | **eventTickEffects** | Active events with `onTick` run their effects (e.g. ongoing budget drain, opinion pressure). |
| 9 | **timerTick** | Check timers, fire any where `firesAtWeek <= week`. |
| 10 | **eventTimeout** | Events past `timeoutWeek` trigger `onTimeout` effects, move to history. |
| 11 | **autoResolve** | Events with `autoResolve` check condition, apply matching decision if met. |
| 12 | **bookkeeping** | Move resolved events to `history[week]`. |
| 13 | **winLoseCheck** | Check loss conditions (frontier >= 100, treaty collapse, etc.) and win condition (safety milestones). |

---

## Win / Lose

- **Win:** Sufficient safety milestones achieved (exact count TBD — replaces the old 0-100 bar)
- **Lose (ASI):** `frontier` reaches 100
- **Lose (treaty collapse):** Political actors hostile enough that the treaty is effectively dead (exact condition TBD — replaces the old "3+ regions < 15 cooperation")
- **Lose (time):** `maxWeeks` reached without winning

---

## Open Design Questions

1. **China gov**: included in state shape above, but event templates and reducer logic for US-China bilateral tension not yet designed. How much does the US-China dynamic drive gameplay vs. being background flavor?

2. **Safety milestones**: what are they, how many to win, what unlocks them? Proposal: ~5 discrete milestones (e.g. "interpretability breakthrough", "formal verification method", "corrigibility proof sketch"), each unlocked by specific event chains. Player sees a milestone tracker, not a percentage bar.

3. **Opinion drift model**: the N=200 population simulation needs concrete parameters. How fast does social learning converge? How strong is media influence? How noisy? This will need tuning, but we need a starting model to implement.

4. **Budget income**: how exactly do political actors fund IAS? Flat rate modulated by salience/valence? Annual budget review events? Both?

5. **Treaty collapse condition**: with cooperation-per-region gone, what triggers treaty collapse? Proposal: weighted combination of US gov + China gov valence falling below threshold, possibly with a "defection event chain" that gives the player a few weeks to intervene.

6. **Difficulty configs**: how do Tutorial/Normal/Realistic differ in the new model? Starting opinion distributions, budget, frontier rate, event frequency still make sense. But the old PC/cooperation numbers need rethinking.

---

## Migration Path

The v1 engine works and has a complete UI. The rearchitecture should be incremental:

1. **New state shape + reducer skeleton** — define types, write tick() as reducer list, wire into useGame hook
2. **Port existing events** — current 15 templates rewritten as producer functions + decision functions
3. **Add opinion system** — Float64Array, drift reducer, connect to event producers
4. **Add political actors** — usGov/chinaGov/media structs, political update reducer
5. **Replace budget** — free + project pools, budget accrual from political actors
6. **Replace safety progress** — milestone tracker, remove linear bar
7. **New event templates** — exploit the richer state for more varied events
8. **UI updates** — opinion polls display, milestone tracker, budget breakdown
