# The Pause — Reigns-Style Card Swipe Game

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

- Dark command-center aesthetic (ISIA blue #3b82f6 accent)
- Monospace font
- Mobile-first (portrait, touch targets ≥44px)
- Full-screen cards — no HUD clutter beyond the 4 resource bars
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
npm run check   # typecheck + lint + build + test
npm run dev     # dev server at http://localhost:5173
```
