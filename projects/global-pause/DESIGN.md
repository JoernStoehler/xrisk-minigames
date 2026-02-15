# Game Design — Core Mechanics

This documents the actual game engine logic, why each rule/constant exists, and how the pieces interact. Written for humans iterating on balance, not for code reference.

---

## The Core Race

The game is a race between two 0→100 progress bars:

1. **Safety research** (player wins at 100) — advances through funding allocation + rare safety milestone events
2. **Algorithmic progress** (player loses at 100) — advances passively every week + spikes from unhandled events

The player doesn't control either bar directly. They control *funding allocation* (which slowly fills the safety bar while draining political capital) and *event triage* (which prevents spikes to the algorithmic bar). The tension: both cost the same scarce resource (PC).

Two other loss conditions create additional drains:
- **Global support** (lose at 0) — decays passively, battered by political events
- **Regional cooperation** (lose if 3+ regions < 15) — eroded by event catastrophes

### Why this structure

The game communicates: "even with a treaty, the world is constantly trying to defect, and you're holding it together with limited authority." The passive decay of support and algorithmic progress says: doing nothing means losing. The event system says: even *trying* costs resources and can fail.

---

## Time & Pacing

Each game tick = 1 week of in-game time. Real-time speeds:

| Speed | Interval | Weeks/minute |
|-------|----------|-------------|
| Paused | — | 0 |
| 1x | 1000ms | 60 |
| 2x | 500ms | 120 |
| 4x | 250ms | 240 |

### Session length estimates

| Difficulty | In-game weeks | At 2x avg (accounting for pauses) | Rough real-time |
|------------|--------------|-----------------------------------|-----------------|
| Tutorial | 260 (5yr) | ~4 min of ticking + pause time | ~6-8 min |
| Normal | 1040 (20yr) | ~9 min of ticking + pause time | ~12-18 min |
| Realistic | 1040 (20yr) | ~9 min of ticking + pause time | ~12-18 min |

**Process note:** These are first estimates. The "~10 min session" target from owner feedback applies to the *felt* session, not in-game time. Players who pause frequently (thinking, reading events) will stretch this. Players on 4x who pop most bubbles will compress it. The 20-year in-game timeline is part of the communication thesis ("this is a generational challenge") and must not be shortened — session length is controlled by tick speed and UI friction instead.

**Current concern:** Normal/Realistic may feel too long. If so, the fix is faster default speed, not shorter timelines. Could also consider: starting at 2x instead of paused, auto-advancing to 2x after first event is resolved.

---

## Resources

### Political Capital (PC)

The universal currency. Range 0-100.

| Difficulty | Starting | Regen/week | Net after lvl-1 funding |
|------------|----------|------------|------------------------|
| Tutorial | 80 | 3.0 | +2.5/week |
| Normal | 60 | 2.0 | +1.5/week |
| Realistic | 40 | 1.5 | +1.0/week |

**Drains:** Event responses (5-30 PC each), safety funding (0.5 × fundingLevel per week), event catastrophe effects.

**Why these numbers:** PC regen must be high enough that the player can respond to events AND fund safety research, but low enough that they can't do everything. At Normal regen of 2/week, the player earns ~104 PC per year. A typical event costs 8-15 PC. At ~0.8 events/week, that's ~42 events/year costing ~500 PC/year if all are handled. But the player only earns ~104/year. This means the player *must* let some events go, pop cheap ones, and choose carefully. This is the core tension.

**Process note:** These numbers are first guesses. The PC economy is the single most important balance lever in the game and will need extensive playtesting.

### Inspector Teams

| Difficulty | Count |
|------------|-------|
| Tutorial | 4 |
| Normal | 3 |
| Realistic | 2 |

**Deploy to a region:** +15 intelligence coverage, +10% success probability on all event responses in that region. Ties up the team until recalled.

**Use in event responses:** Some responses "require inspector" — this is a *separate* check from deployment. It temporarily uses 1 available team, then immediately returns it after the response. So deploying all inspectors doesn't prevent using them for responses — but it does prevent inspector-requiring responses since available count = 0.

**Why 2-4:** With 5 regions, even the Tutorial player can't cover everything. Realistic with 2 forces hard choices about which regions to monitor. The +15 intel is meaningful — it can push a region from "medium" to "high" quality (threshold at 65), which reveals hidden descriptions and gives better decision information.

### Intelligence Coverage (per region)

Range 0-100. Starting values:

| Difficulty | Starting | Signal bonus |
|------------|----------|-------------|
| Tutorial | 70 | +20 |
| Normal | 50 | 0 |
| Realistic | 35 | -15 |

**What it does:**
- Determines event info quality: `intel + signalBonus ≥ 65` → high, `≥ 35` → medium, else low
- High quality reveals `hiddenDescription` (intel report) in event modal
- Above 50: `+0.2%` success probability per point (max +10% at coverage 100)
- Generates more whistleblower tips when average coverage > 60 (weight modifier 1.5x vs 0.7x)

**How it changes:** Only through inspector deploy (+15) and recall (-15). No passive change. This means regions without inspectors stay at starting values forever.

**Process note:** Intelligence coverage is currently static without inspectors, which makes inspector placement a set-and-forget decision. Could consider: slow passive intel decay, intel gain from successful investigations, intel loss from failed ones.

### Safety Research Progress

Range 0-100. Win at 100.

**Formula per week:**
```
if (PC ≥ fundingLevel × 0.5):
    PC -= fundingLevel × 0.5
    progress += safetyResearchBaseRate × (fundingLevel / 3)
```

Funding levels: 0 (none), 1 (low), 2 (medium), 3 (max).

**Effective rates at max funding (level 3):**

| Difficulty | Rate/week | PC cost/week | Weeks to 100% | Available weeks |
|------------|-----------|-------------|---------------|-----------------|
| Tutorial | 0.15 | 1.5 | 667 | 260 |
| Normal | 0.08 | 1.5 | 1250 | 1040 |
| Realistic | 0.06 | 1.5 | 1667 | 1040 |

**CRITICAL OBSERVATION:** At max funding, *no difficulty can reach 100% from passive research alone.* Tutorial reaches ~39%, Normal reaches ~83%, Realistic reaches ~62%. This means the game **requires** safety milestone events (the `safety-research-progress` template) to be winnable. Those events give +3 to +5 progress each, and appear after week 30 with increasing weight as safety exceeds 30%.

**Why this is the design intent (probably):** The game wants to say "safety research needs active support, not just funding." The player must handle events successfully to create conditions for safety breakthroughs. But the current implementation makes winnability depend on RNG — how many safety events spawn, and whether they succeed.

**Process note:** This is the most fragile part of the balance. If safety events are too rare or the base rate too slow, Normal becomes literally unwinnable. If too generous, the player can ignore events and just fund. The right feel is: "I can see the finish line but I need everything to go right in the final stretch."

### Global Support

Range 0-100. Starts at 70. Lose at 0.

**Passive decay per week:**

| Difficulty | Decay/week | Weeks to reach 0 (from 70, passive only) |
|------------|-----------|------------------------------------------|
| Tutorial | 0.05 | 1400 (never — game ends at 260) |
| Normal | 0.12 | 583 (within the 1040-week game) |
| Realistic | 0.18 | 389 (well within the 1040-week game) |

**How it recovers:** Only through event response success effects. Many successful responses give +3 to +8 support. The safety milestone event gives +5 to +8.

**Key insight:** On Normal, support reaches 0 at week ~583 without any positive input. On Realistic, ~week 389. So the player *must* successfully handle support-affecting events to survive the full 20 years. But event responses also cost PC, which competes with safety funding.

**Process note:** Support decay is the "slow bleed" loss condition. It should feel like background pressure, not the primary challenge. If players are losing primarily to support collapse, the decay rate is too high. If they never worry about it, it's too low.

### Algorithmic Progress

Range 0-100. Lose at 100.

**Passive rate per week:**

| Difficulty | Rate/week | Weeks to reach 100 (passive only) |
|------------|-----------|-----------------------------------|
| Tutorial | 0.02 | 5000 (never — game ends at 260) |
| Normal | 0.08 | 1250 (slightly beyond the 1040-week game) |
| Realistic | 0.12 | 833 (well within the 1040-week game) |

**Spikes from event catastrophes** (unhandled/failed events):
- Rogue datacenter: +12
- Algorithmic breakthrough: +15
- Non-signatory threat: +10
- Prohibited research: +8
- Chip smuggling (network): +8
- Consumer hardware: +20

**Key insight:** On Normal, passive alone doesn't quite reach 100 by game end (would hit ~83%). But event catastrophes easily push it over. On Realistic, passive alone reaches 100 by week 833 — the player must actively slow it down through successful event responses that give negative algorithmic progress.

**Process note:** The algorithmic progress rate creates the fundamental time pressure. If the game feels too relaxed, increase this. If it feels hopeless, decrease it. This is the "difficulty knob" that most directly controls game tension.

---

## Events

### Generation

Each week, events are generated via Poisson distribution:
```
adjustedFrequency = eventFrequency × (1 + algorithmicProgress × 0.005)
count = Poisson(adjustedFrequency)
```

The `algorithmicProgress × 0.005` multiplier means events get more frequent as ASI risk rises. At 50% progress, frequency is 1.25× base. At 80%, it's 1.4×. This creates a positive feedback loop — more events → more catastrophes → higher progress → even more events.

**Why Poisson:** Natural variance. Some weeks have 0 events, some have 2-3. This creates rhythm — quiet periods for recovery, busy periods for triage. A flat rate would feel mechanical.

### Template Selection

Each template has:
- `baseWeight` (higher = more common, range 3-12)
- `minWeek` / `maxWeek` (availability window)
- Optional `weightModifier(state)` — multiplies weight based on game state

**Weight modifiers create feedback loops:**
- Chip smuggling network: 1.5× when algorithmic progress > 30% (more evasion when progress is high)
- Political pressure: 1.5× when support < 50 (vultures circle when you're weak)
- Whistleblower tips: 1.5× when average intel > 60 (reward for intelligence investment)
- Treaty withdrawal: 2.0× when any region < 40 cooperation (diplomatic crises compound)
- Algorithmic breakthrough: 2.0× when progress > 40% (acceleration begets acceleration)
- Distributed training: 2.0× when progress > 50% (late-game escalation)
- Consumer hardware: 2.5× when progress > 60% (endgame crisis)
- Safety milestone: 1.5× when safety > 30% (virtuous cycle)
- Public backlash: 1.8× when support < 50 (erosion accelerates)

### Region Selection

Events target regions weighted by *inverse cooperation* — lower cooperation means more problems. `weight = max(1, 100 - cooperation)`. This creates a death spiral: events in a region reduce cooperation, making more events target that region.

### Urgency Escalation

Events start at yellow. Each week, the engine checks:
```
weeksLeft = deadlineWeek - currentWeek
totalWeeks = deadlineWeek - weekCreated
if weeksLeft < totalWeeks × 0.33: urgency = red
if weeksLeft < totalWeeks × 0.66: urgency = orange
if weeksLeft ≤ 0: catastrophe (auto-resolve with bad effects)
```

Urgency weeks by event type range from 3 (algorithmic breakthrough — very urgent) to 10 (non-signatory chipfab — slow burn).

### Catastrophe Effects

When an event expires unhandled, it applies default catastrophe effects. These are generally worse than any response failure effect:

| Type | Algorithmic | Cooperation | Support | PC |
|------|------------|------------|---------|-----|
| Rogue datacenter | +12 | -15 | | |
| Algorithmic breakthrough | +15 | | | |
| Consumer hardware | +20 | | | |
| Non-signatory threat | +10 | | -5 | |
| Prohibited research | +8 | -5 | | |
| Chip smuggling network | +8 | -12 | | |
| Treaty withdrawal | | -30 | -10 | |
| Public backlash | | | -15 | -10 |
| Political pressure | | -10 | | -15 |
| Whistleblower (missed) | | -5 | | |

**Why catastrophes are harsh:** The game communicates "ignoring problems has consequences." A single rogue datacenter catastrophe (+12 algorithmic) is equivalent to 150 weeks of normal progress on Normal. This makes event triage the core gameplay — not a side activity.

---

## Responses

Each event offers 2-3 response options with:
- **PC cost** (5-30)
- **Inspector requirement** (some)
- **Base success probability** (0.35-0.90)
- **Success effects** (positive state changes)
- **Failure effects** (negative state changes, usually milder than catastrophe)

### Success Probability Modifiers

```
final_prob = base_prob
  + 0.10 (if inspector deployed in event's region)
  + (intel_coverage - 50) × 0.002 (if intel > 50)
clamped to [0, 0.95]
```

At Tutorial intel (70 + 20 bonus = 90, but coverage itself is 70):
- Inspector bonus: +10%
- Intel bonus: (70-50) × 0.002 = +4%
- Total modifier: +14%

At Realistic intel (35 - 15 bonus = 20 effective for quality, but coverage is 35):
- No inspector, no intel bonus. Base probability only.
- With inspector: +10%, and intel becomes 50, so no intel bonus yet.

### Response Type Patterns

- **Investigate** (5-12 PC): cheap, moderate success, small effects. The "safe" choice.
- **Inspect** (10-22 PC, requires inspector): expensive, high success, strong effects. The "thorough" choice.
- **Negotiate** (5-25 PC): variable success, affects cooperation/support. The "diplomatic" choice.
- **Sanction** (12-20 PC): moderate success, mixed effects — can backfire on cooperation. The "aggressive" choice.
- **Protective action** (25-30 PC): expensive, risky, powerful. The "nuclear option."
- **Fund safety** (15 PC): only on safety milestone events. High success, boosts safety progress.

### Pop vs Modal (UI layer, but affects game feel)

Pop-able events (small bubbles, tap to auto-resolve with cheapest response):
- Yellow urgency only
- Types: whistleblower_tip, chip_smuggling, corporate_evasion, political_pressure, public_backlash
- Cheapest response ≤ 5 PC

This means the player auto-investigates minor events cheaply while focusing decision energy on serious ones. It's the game's version of "routine enforcement vs. crisis management."

**Process note:** The pop threshold (5 PC) determines how many events feel "routine" vs "require thought." Too low = everything is a crisis. Too high = game plays itself. Current value is a guess.

---

## Feedback Loops

### Destabilizing (positive feedback — things get worse)

1. **Regional death spiral:** Low cooperation → more events there → more catastrophes → lower cooperation. Because region selection weights by inverse cooperation. Stabilized only by successful event responses that boost cooperation.

2. **Algorithmic acceleration:** High progress → more frequent events → more catastrophes (if overwhelmed) → higher progress. The `1 + progress × 0.005` frequency multiplier.

3. **Support erosion:** Low support → more political pressure / public backlash events → lower support. Via weight modifiers (1.5-1.8× when support < 50).

4. **PC starvation:** Many events → PC spent on responses → can't fund safety → no safety progress → game lasts longer → more events. The resource competition between triage and research.

### Stabilizing (negative feedback — things self-correct)

1. **Intel → tips:** High intel coverage → more whistleblower tips (weight 1.5× when avg intel > 60) → opportunities to gain cooperation and catch violations.

2. **Safety momentum:** Safety > 30% → more safety milestone events (weight 1.5×) → faster safety progress. This is the game's only virtuous cycle.

3. **Event thinning by cooperation:** High cooperation → fewer events in that region → less drain on resources. But this only works if the player can *get* cooperation high, which requires spending PC.

### Net assessment

The destabilizing loops outnumber and outpower the stabilizing ones. This is intentional — the game should feel like "barely holding it together." But it means the game has a tipping point: once things start going wrong, they compound. The player either stabilizes early and cruises to a tense win, or enters a death spiral where every week brings new crises.

**Process note:** If playtesting shows the game is too "binary" (easy win or hopeless loss), we need to add more stabilizing feedback or dampen the destabilizing ones. Possibilities: cooperation passive recovery, diminishing catastrophe effects, support floor above 0 that slowly recovers.

---

## What We Know We Don't Know

1. **Is Normal winnable?** At max funding, passive safety reaches ~83%. The game needs ~17% from safety milestone events. Those events give +3 to +5 each, so you need 4-6 successful ones over 1040 weeks. The event spawns after week 30 with base weight 4, increasing to 6 when safety > 30%. Is that enough? We don't know without simulation or playtesting.

2. **Is Realistic survivable?** Passive algorithmic progress reaches 100 by week 833. Support decay reaches 0 by week 389. The player must actively manage both. With only 2 inspectors and 40 starting PC, can they? Probably very hard. May need to be the intentional "you can't win, but you learn why" difficulty.

3. **PC economy balance:** Event costs vs regen rate is the core tension. We've set rates based on intuition. The interaction between funding drain and event response drain needs playtesting.

4. **Event template pool:** 15 templates (including variants) may be too few for 1040-week games. Players will see repeats. The halved minWeek values from the mobile redesign mean late-game events appear earlier — this may make the early game too chaotic or may be fine.

5. **Pop-able threshold:** 5 PC makes ~40% of events pop-able. Is that the right ratio? Lower = more decisions, higher = more routine.
