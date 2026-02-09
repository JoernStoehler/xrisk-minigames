# Tasks

## Current
- [ ] Reply expiry UX (show expired state, auto-resolve defaults)
- [ ] Mobile polish pass
- [ ] Further content: more decision branches, late-game consequences, additional filler
  - Late game (Jan–Sep 2028) has zero decisions — player just clicks >> to death
  - Metrics don't trigger anything — no "if oversight < 20" conditional emails
  - Context-aware body text (`ctx.metrics`) is available but underused

## Upcoming Milestones
- **M1:** Jörn writes/co-authors .md files with domain knowledge, background, and content patches
  - Use `npm run scenario:reference` as starting point for annotation
- **M2:** Coarse playthrough review — pacing, emotional beats, friction
  - Use `npm run playthrough > playthrough.md` to read all paths as prose
- **M3:** Detailed playtesting via CLI or browser
  - Use `npm run cli` for agent-driven turn-by-turn play
  - Use `npm run play` for interactive terminal play

## Done
- [x] **Tooling for content workflow**
  - `npm run playthrough` — generates 3 full playthroughs as markdown
  - `npm run scenario:reference` — annotated email list with fill-in slots
  - `npm run cli` — stateful CLI for agent playtesting (reset/next/reply/inbox/read)
  - `npm run play` — interactive terminal player
- [x] **Documentation overhaul for future agents**
  - CLAUDE.md rewritten with architecture reference, file tables, decision map
  - Doccomments added to types.ts, state.ts, useGame.ts, scenario.ts
- [x] **Content expansion: 5 decisions, ~30 emails, rich branching**
  - Decision 4: GPT-7 architecture (green-light vs human review, with follow-ups)
  - Decision 5: Safety evals broken (disclose vs quiet fix, with consequences)
  - Dismiss-safety consequence: James flags worsening anomaly pattern
  - Deploy-with-monitoring consequence: anomalous API usage detected
  - Dismiss-expert consequence: Voss goes public, comms asks for response strategy
  - Quiet-fix leak: journalist gets internal documents
  - Disclosure fallout: board emergency session, stock drop, SEC inquiry
  - New pacing emails: safety team departures, government inquiry, all-hands recap
  - New junk: NeurIPS invite, second newsletter (late-game, darker tone)
  - Final email: "all systems normal" — ominous quiet before the end
- [x] Define project concept and specs in CLAUDE.md
- [x] Set up project skeleton from template
- [x] Build game engine v1 (timeline, state, modifier system)
- [x] Build UI shell (inbox, email view, dashboard, sidebar)
- [x] Wire engine to UI
- [x] Author placeholder content (~4 decisions, ~20 emails)
- [x] Build recap/ending screen
- [x] Restyle to OpenAI brand (light mode, black/white minimalist)
- [x] Add localStorage persistence (game state + UI state)
- [x] Smart time advancement (skip to next email, >> button)
- [x] New game option in sidebar
- [x] Cloudflare Pages deployment (production + branch previews)
- [x] Add disclaimer / Impressum (legal notice modal)
- [x] Tutorial email (first email explains the UI)
- [x] Remove spam folder (simplify UI)
- [x] Add star/flag functionality
- [x] Blue dot unread indicators
- [x] Fix baseline email state bug (read/reply/star on baseline emails)
- [x] Refactor state to self-contained model (deliverEmails)
- [x] 9 E2E tests (load, advance, read, star, reply, persist, reset, game end)
- [x] Add junk/filler emails for realism
- [x] **v2 engine: NarrativeContext + email generators** (replaces modifiers)
  - EmailDef with static or computed dates
  - Generators receive context (decisions, metrics, date)
  - Triggered emails compute delivery from decision dates
  - Reply options with decisionId, endsGame, replyExpiresOn
  - Deleted baseline.ts + modifiers.ts → scenario.ts
