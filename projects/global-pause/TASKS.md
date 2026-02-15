# Tasks

## Current — V2 Engine Rearchitecture

See DESIGN.md for full spec. Migration is incremental — v1 UI stays working throughout.

- [ ] New state shape + reducer skeleton (types.ts rewrite, tick() as reducer list, wire into useGame)
- [ ] Port existing 15 event templates to producer/decision functions
- [ ] Opinion system (Float64Array N=200, opinionDrift reducer, mediaDynamics reducer)
- [ ] Political actors (usGov/chinaGov/media structs, politicalUpdate reducer, event variant selection)
- [ ] Budget rework (free pool + project pools, budgetAccrual from political actors, projectExpiry)
- [ ] Safety milestones (replace linear progress bar with discrete milestone tracker)
- [ ] Event history (history[week] indexed array, replace flat eventLog)
- [ ] New event templates exploiting richer state (~25 total)
- [ ] UI updates (opinion polls display, milestone tracker, budget breakdown)
- [ ] Difficulty rebalancing for new mechanics

## Open Design Questions (need Jörn's input)
- [ ] China gov: how much does US-China bilateral tension drive gameplay?
- [ ] Safety milestones: what are they, how many to win?
- [ ] Opinion drift parameters: convergence speed, media influence strength
- [ ] Budget income model: flat rate × political state, or annual review events, or both?
- [ ] Treaty collapse condition in new model
- [ ] Difficulty config differences for Tutorial/Normal/Realistic

## Parked (from v1, revisit after v2)
- [ ] Improve world map visuals (more recognizable continent shapes)
- [ ] Sound effects / ambient audio (optional)

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
- [x] Difficulty rebalancing — Normal/Realistic compressed from 20yr to 10yr with doubled rates
- [x] Event timeline compression — halved minWeek values for compressed timelines
- [x] DESIGN.md and PLAYTEST.md for v1 engine
- [x] V2 engine design discussion — state shape, reducer architecture, political actors, opinion model
