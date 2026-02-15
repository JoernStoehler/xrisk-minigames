# Tasks

## Current
- [ ] Expand event templates to ~25 (currently ~15)
- [ ] Tune difficulty balance through playtesting (Normal/Realistic may be too hard after timeline compression)
- [ ] Improve world map visuals (more recognizable continent shapes)
- [ ] Add event outcome notifications (success/failure toast on bubble pop)
- [ ] Add event log view (history of resolved events)
- [ ] Sound effects / ambient audio (optional)
- [ ] Visual sentiment micro-bubbles on map (green = pro-ISIA, red = anti) — deferred, evaluate after playtesting

## Done
- [x] Define project concept and specs in CLAUDE.md
- [x] Build initial prototype — engine (types, rng, state, events, useGame)
- [x] Build initial prototype — data (15 event templates, 5 regions, 3 difficulties)
- [x] Build initial prototype — UI (MainMenu, GameScreen, WorldMap, TopBar, EventPanel, EventCard, EventDetail, RegionPanel, TimeBar, GameOverScreen)
- [x] npm run check passes (typecheck + lint + build + test)
- [x] Fix Playwright config for gVisor (--no-zygote, --disable-setuid-sandbox)
- [x] E2E tests pass
- [x] Add Cloudflare Pages deployment (wrangler.toml + wrangler dep)
- [x] Visual QA — screenshots confirm menu, game, and events all render correctly
- [x] Mobile UI redesign — Plague Inc-inspired map-centric layout
  - Replaced desktop sidebars with floating overlays + bottom-sheet
  - Map bubbles: pop-able (minor events) and decision (serious events, opens modal)
  - Auto-pause on modal open, restore speed on close
  - News ticker, safety progress racing bar, status HUD
  - Deleted old desktop components (TopBar, RegionPanel, EventPanel, EventCard, EventDetail, TimeBar)
- [x] Difficulty rebalancing — Normal/Realistic compressed from 20yr to 10yr with doubled rates
- [x] Event timeline compression — halved minWeek values for compressed timelines
