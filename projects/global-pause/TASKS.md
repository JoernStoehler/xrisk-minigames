# Tasks

## Current

- [ ] Swipe UX polish (test on real mobile device, tune thresholds/velocity)
- [ ] Card content: replace throwaway cards with real x-risk scenario cards (needs Jörn's domain input + expert)
- [ ] More history-triggered chains (blocked on card content — no point chaining throwaway cards)
- [ ] More degraded variant pairs (blocked on card content — variants of throwaway cards will be replaced)
- [ ] Re-balance after content pass (follow BALANCE.md process)

## Done

- [x] Visual overhaul: warm cream palette, Inter font, speaker emoji portraits, colored card headers, per-resource bar colors, fixed bar labels (Funding/Leverage), eliminated dead space
- [x] V1 prototype (RTS/map style) — scrapped, UX failed on mobile
- [x] V2 engine design discussion — concepts preserved, UX pivoted to Reigns-style
- [x] Delete old code, rewrite CLAUDE.md for new direction
- [x] Engine: types, state transitions, card pool draw (pure functions, no React dep)
- [x] Throwaway card content (19 templates) + death messages (8)
- [x] CLI playtest tool (npm run cli — headless, agent-friendly)
- [x] Swipe UX (useSwipe hook, pointer events, CSS transforms, tap fallback)
- [x] UI components (TitleScreen, GameScreen, SwipeCard, ResourceDisplay, ResourceBar, DeathScreen)
- [x] App wiring + npm run check passes (typecheck + lint + build + 7 unit tests)
- [x] E2E smoke tests (4 tests: title, game, choice, death+restart)
- [x] Visual QA — mobile screenshots confirm all screens render correctly
- [x] Balance tuning: rebalanced deltas, added 10 cards (29 total), 6/8 death types reachable
- [x] Multiple death messages (3 per cause, 24 total) with turn-based selection
- [x] BALANCE.md — documented tuning process and current balance state
