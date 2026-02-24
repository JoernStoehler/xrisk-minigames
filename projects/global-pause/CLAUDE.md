# The Pause — Reigns-Style Card Swipe Game

**Live:** https://global-pause.pages.dev

## What This Is

A Reigns-clone where the player is the Director-General of the ISIA (International Superintelligence Agency), enforcing an international treaty banning ASI development. One card at a time, binary swipe choices, four resource bars, die-and-restart loop.

**Target audience:** People who don't yet appreciate how a global pause on AI development might work — or fail.

**Core thesis:** Enforcement of a global AI pause is structurally hard. The player learns this by dying repeatedly from different failure modes — underfunding, over-surveillance, political backlash, public revolt — each caused by the tension between competing priorities.

**Inspiration:** Reigns (Nerial, 2016). Faithful clone of its core mechanics: dynamic card pool, weighted draw, binary swipe, four resource bars that kill at both extremes.

## Game Mechanics

### Resource Bars (die at 0 or 100)

| Bar | Icon | At 0 | At 100 |
|---|---|---|---|
| **Trust** | Shield | Public revolt, agency defunded | Overpromised; visible failure shatters credibility |
| **Funding** | Coin | Can't operate, agency shuttered | Waste scandal, agency dismantled |
| **Intel** | Eye | Blind to threats, ASI slips through | Surveillance state, nations flee treaty |
| **Leverage** | Gavel | No political power, ignored | Authoritarian backlash, coalition revolts |

All bars start at 50. Every card choice nudges 1-3 bars. The player's job is to keep all four bars away from both extremes. This is intentionally difficult — the bars pull against each other.

### Card Pool

Cards are drawn from a weighted pool. Each card template has a `weight(state)` function that computes its current weight (0 = not in pool). This is the only mechanism for card eligibility — cards own their own logic.

**Pool dynamics:**
- **State-driven:** Cards check resource levels, turn count, or history to decide their weight
- **History-driven:** Cards can check what prior cards were played and which choices were made
- **Degraded variants:** Same event concept as separate templates with mutually exclusive weights. Low-intel variant offers worse options than high-intel variant.
- **Anti-repeat:** Cards drawn in the last 3 turns are excluded

### Turn Flow

1. Draw card from weighted pool
2. Player sees card (speaker, text) and swipes or taps
3. On tilt: option labels fade in, affected resource bars show directional preview (↑/↓ small, ↑↑/↓↓ large — no numbers)
4. On commit: effects applied, turn incremented, new card drawn
5. If any bar hits 0 or 100: death screen with explanation

### Death Loop

Runs last ~15-40 turns. Death is frequent and expected. Each death teaches something about a different failure mode. The restart is instant — tap to play again.

## Architecture

```
src/
  engine/
    types.ts        # GameState, CardTemplate, Resources, Effect
    rng.ts          # Seeded PRNG (mulberry32) — kept from v1
    state.ts        # newGame, applyChoice, checkDeath (pure functions)
    cards.ts        # drawNextCard (weight, filter, weighted pick)
    useGame.ts      # React hook: state + actions + localStorage
  data/
    cards.ts        # Card templates (content — will be iterated heavily)
    deaths.ts       # Death messages per resource × extreme
  hooks/
    useSwipe.ts     # Pointer event drag/swipe/tilt logic
  components/
    TitleScreen.tsx
    GameScreen.tsx
    SwipeCard.tsx
    ResourceDisplay.tsx
    ResourceBar.tsx
    DeathScreen.tsx
  cli.ts            # CLI playtest tool (no React, headless)
  App.tsx
  main.tsx
  index.css
```

### Key Patterns

- **Engine has zero React dependency.** `types.ts`, `state.ts`, `cards.ts`, `rng.ts` are pure TypeScript. The CLI tool uses them directly.
- **Cards own their weight.** No external card injection or pool mutation. Each card's `weight(state)` function determines if and how likely it is to appear.
- **Swipe via Pointer Events.** Works for touch and mouse. CSS transforms via ref during drag (no re-renders). Spring-back on non-commit, fly-off on commit.
- **Directional previews (Reigns-style).** On tilt, affected bars show ↑/↓ (small) or ↑↑/↓↓ (large). No numbers — player develops intuition.

## Design Rules

**Reference:** Reigns (Nerial, 2016). The gold standard for card-swipe games.

**Color model — dark background, light card:**
- Background: dark warm brown/charcoal (#2A2118 range) — the card pops as a physical object
- Card face: warm off-white/cream (#FFFDF7) — NOT pure white
- This contrast model is fundamental to Reigns' feel. Light-on-light kills card presence.

**Card proportions:**
- Card fills ~70-75% of screen width, ~55-60% of screen height
- Generous horizontal margins (~12-15% each side)
- Card is the dominant visual element — everything else is secondary

**Character portraits:**
- CSS geometric portraits per speaker: colored circle/shape backgrounds with simple geometric features
- Flat-shaded, bold, distinctive silhouettes (inspired by Reigns' Tom Whalen-esque style)
- Portrait occupies upper ~40% of card body — the visual anchor
- Each speaker instantly recognizable by color + shape

**Typography:**
- Inter font (Google Fonts), not monospace
- Speaker name: small, uppercase, bold, wide tracking (header label)
- Dialogue text: medium weight, standard case, generous line-height, centered
- Choice labels: smaller, bold, fade in proportionally to swipe offset

**Resource bars:**
- Per-resource colors: Trust=blue, Funding=amber, Intel=violet, Leverage=red
- Slim vertical bars, compact row at top of screen
- Preview arrows on tilt (small ↑/↓, large ↑↑/↓↓)

**Layout:**
- Mobile-first (portrait, touch targets ≥44px)
- Card centered between resource bars (top) and turn counter (bottom)
- Minimal dead space — card dominates
- ~2 minute runs, highly replayable

## Playtesting

```bash
npm run cli show         # Print current card + resources
npm run cli left         # Swipe left, see result
npm run cli right        # Swipe right, see result
npm run cli auto 20      # Random-play 20 turns
npm run cli state        # Full state dump (pool, history)
npm run cli reset        # New game
```

## Verification

```bash
npm run check        # typecheck + lint + build + unit tests
npm run test:e2e     # E2E tests including drag/swipe interaction
npm run cli auto 50  # headless engine playtest
npm run dev          # dev server at http://localhost:5173
```

### Review checklist (after implementing UI changes)

The core mechanic is the drag/swipe interaction. Automated checks (typecheck, lint, build) do NOT verify interactive behavior. After any change to SwipeCard, useSwipe, ResourceBar, or GameScreen:

1. **Drag E2E test passes** (`e2e/drag.spec.ts`) — simulates pointer drag, verifies tilt direction propagates to resource bar previews, verifies swipe commit advances the game
2. **Card re-mount on new card** — the SwipeCard key must change when activeCard changes, otherwise drag state leaks between cards and enter animation doesn't fire
3. **Visual QA at mobile viewport** — follow the Visual QA Process below

### Visual QA Process (reusable)

**Purpose:** Evaluate visual quality against the Reigns reference. Run this after ANY visual change. Use a BACKGROUND subagent — never block the main conversation.

**Step 1 — Take screenshots** (Bash subagent, background):
```bash
cd /workspaces/xrisk-minigames/projects/global-pause
npm run dev &
sleep 3
# Title screen
npx playwright screenshot --viewport-size="390,844" http://localhost:5173 /tmp/vqa-title.png
# Game screen (need a script for click interaction)
node -e "
const pw = require('playwright');
(async () => {
  const b = await pw.chromium.launch();
  const p = await b.newPage();
  await p.setViewportSize({width:390,height:844});
  await p.goto('http://localhost:5173');
  await p.click('text=Take Office');
  await p.waitForTimeout(800);
  await p.screenshot({path:'/tmp/vqa-game.png'});
  // Tilt right
  const card = p.locator('[class*=card-enter]').first();
  const box = await card.boundingBox();
  if (box) {
    const cx = box.x+box.width/2, cy = box.y+box.height/2;
    await p.mouse.move(cx,cy); await p.mouse.down();
    await p.mouse.move(cx+60,cy,{steps:10});
    await p.waitForTimeout(200);
    await p.screenshot({path:'/tmp/vqa-tilt.png'});
    await p.mouse.move(cx,cy,{steps:5}); await p.mouse.up();
  }
  await b.close();
})();
"
```

**Step 2 — QA evaluation** (general-purpose subagent, background). Use this prompt template:
```
You are evaluating a Reigns-style card game's visual quality. Reference: Reigns (2016) by Nerial.

Look at these screenshots: /tmp/vqa-title.png, /tmp/vqa-game.png, /tmp/vqa-tilt.png

Score each dimension 1-10 against Reigns quality:
1. Card presence: Does the card dominate the viewport? (~70-75% width, ~55-60% height)
2. Card-as-object: Does the card feel like a physical object? (contrast with bg, shadow, materiality)
3. Character portraits: Distinctive, recognizable, emotional connection?
4. Color harmony: Do all colors feel like the same world?
5. Dead space: Is space used intentionally? No wasted gaps?
6. Typography: Clean hierarchy, readable, not competing for attention?
7. Resource bars: Readable at a glance, not distracting?
8. Overall polish: Would this feel at home on the App Store?

For each score <7, describe the specific fix needed.
Give an overall score and list the top 3 highest-impact improvements.
```

**Step 3 — Iterate** until all dimensions score ≥7 and overall ≥8.

**Process rules:**
- ALWAYS use background subagents for screenshots and QA evaluation
- NEVER ask the user to be your QA tester — they are not a $1k/h visual tester
- Design changes need a written spec BEFORE implementation (update Design Rules above)
- After implementing, QA subagent evaluates. Iterate until quality bar is met.
- The quality bar is EXCELLENT, not adequate
