# Tasks

## Current

- [ ] Swipe UX polish (test on real mobile device, tune thresholds/velocity)
- [ ] Card content: replace throwaway cards with real x-risk scenario cards (needs Jörn's domain input)
- [ ] Tune resource deltas for balanced ~20-30 turn runs
- [ ] Card pool dynamics: add more history-triggered chains and degraded variants
- [ ] Death messages: write more specific/varied messages per failure mode

## Done

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
