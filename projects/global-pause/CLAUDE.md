# The Pause — Global ASI Enforcement Game

## What This Is

A management RTS where the player is the Director-General of the ISIA (International Superintelligence Agency), enforcing an international treaty banning ASI development. Time flows in game-weeks at adjustable speed. Events pop up on a world map with urgency timers. The player triages threats using limited resources.

**Target audience:** People who don't yet appreciate how a global pause on AI development might work — or fail.

**Core thesis (layered by difficulty):**
- Tutorial: "A global pause is technically feasible"
- Normal: "Enforcement is the hard part"
- Realistic: "The clock is ticking even with a pause — barely survivable"

**Source material:** IABIED treaty (Articles I-XV), MIRI Technical Governance open questions.

## Game Systems

### Resources
- **Inspector teams** (2-4): Deploy to regions, boost success probability + intel quality
- **Political capital** (0-100): Universal currency for actions; regenerates slowly
- **Intelligence coverage** (per-region 0-100): Determines event info quality
- **Safety research progress** (0-100): Win condition; accelerated by funding allocation

### Events (10 types)
chip_smuggling, rogue_datacenter, prohibited_research, political_pressure, whistleblower_tip, non_signatory_threat, algorithmic_breakthrough, corporate_evasion, treaty_withdrawal_threat, public_backlash

Generated via weighted random from template pool. Urgency timers: yellow -> orange -> red -> catastrophe.

### Win/Lose
- **Win:** Safety research reaches 100% (human intelligence augmentation off-ramp)
- **Lose (ASI):** Algorithmic progress reaches 100%
- **Lose (treaty collapse):** 3+ regions below 15 cooperation
- **Lose (public revolt):** Global support reaches 0

### Difficulty
| | Tutorial | Normal | Realistic |
|---|---------|--------|-----------|
| Span | 5 years | 20 years | 20 years |
| Inspectors | 4 | 3 | 2 |
| Events | Low freq | Medium | High freq |
| Signals | Clear | Mixed | Noisy |

## Architecture

Three layers following the CEO game pattern:

```
src/
  engine/           # Pure game logic (no React)
    types.ts        # All type definitions
    rng.ts          # Seeded PRNG (mulberry32)
    state.ts        # State transitions: tick, respond, deploy, win/lose
    events.ts       # Event generation, weighting, escalation
    useGame.ts      # React hook: tick loop, localStorage persistence
  data/             # Content (static data)
    events.ts       # Event templates (~15 templates)
    regions.ts      # 5 regions: US, China, EU, Russia, Rest of World
    difficulties.ts # Tutorial/Normal/Realistic configs
  components/              # UI (mobile-first, Plague Inc-inspired)
    MainMenu.tsx           # Title + difficulty selection
    GameScreen.tsx         # Single-column layout (ticker, map, progress)
    WorldMap.tsx           # SVG map with region coloring + event bubbles
    MapBubble.tsx          # Pop-able and decision bubbles
    EventModal.tsx         # Fullscreen decision modal (auto-pauses)
    RegionOverlay.tsx      # Bottom-sheet region info + inspector controls
    NewsTicker.tsx         # Scrolling news/flavor text
    SafetyProgressBar.tsx  # Bottom bar: safety vs ASI racing progress
    SpeedControls.tsx      # Floating speed buttons (||, >, >>, >>>)
    StatusOverlay.tsx      # Floating HUD (PC, inspectors, support, funding)
    GameOverScreen.tsx     # Win/loss with stats
```

### Key patterns
- **Seeded PRNG** in GameState for deterministic event generation
- **Static event templates** with optional `weightModifier` functions
- **setInterval tick loop** in useGame hook, paused at speed=0
- **structuredClone** for immutable state transitions
- **localStorage** persistence with `global-pause-state` key

## Design Rules
- Real countries (US, China, EU, Russia, Rest of World)
- Dark command-center aesthetic (distinct from CEO game)
- Monospace font for data-heavy display
- ISIA blue accent (#3b82f6), urgency colors (yellow/orange/red)
- ~10 minute sessions, highly replayable
- Mobile-first (portrait, touch targets ≥44px, no hover-dependent UI)

## Verification

```bash
npm run check   # typecheck + lint + build + test
npm run dev     # dev server at http://localhost:5173
```
