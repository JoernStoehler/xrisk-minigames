# Tasks

## Current
- [ ] Content expansion (baseline scenario + decision branches — needs Jörn's domain input)
- [ ] Reply expiry UX (show expired state, auto-resolve defaults)
- [ ] Mobile polish pass
- [ ] Code cleanup pass (document for future agents)

## Done
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
