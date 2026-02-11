# Tasks

## Current
- [ ] Expert content review: all content (emails, decisions, metrics, dialogue) is agent-written — none is expert-authored
  - Late game (Jan–Sep 2028) has zero decisions — player just clicks >> to death
  - Metrics (stock, revenue, trust, board, capability, oversight) are decorative — don't trigger anything
  - Context-aware body text (`ctx.metrics`) is available but underused

## Next Session: Expert Content Authoring (M1)

**Goal:** Co-author an expert-written baseline scenario with Jörn. Replace agent-guessed content with expert-grounded content.

**Key context from this session:**
- All existing game content (emails, decisions, metrics, dialogue) is agent-written without expert vetting — treat it as a strawman, not a starting point to polish
- The game's extinction-by-Sep-2028 timeline is NOT tail risk — it's "two coin flips" from median. Should feel like things went mostly normally and that was enough
- Nobody has written the "CEO's inbox" perspective before — this is genuinely novel synthesis
- AI 2027 covers a similar timeframe but is a median scenario, not aggressive enough for this game
- IABIED (not yet downloaded — copyrighted, Jörn needs to provide) covers ~75% of the loss-of-control mechanism

**How to work with Jörn:**
- He is a top-100 x-risk expert. He does NOT write code.
- His bottleneck is not blank pages — it's not knowing what knowledge to recall without specific prompts
- Don't ask generic questions. Ask specific questions grounded in the literature (see `literature/INDEX.md` for 20+ downloaded references)
- Interview him: read literature first, then ask targeted questions referencing specific claims/scenarios, let him confirm/correct/extend
- His model is built from similar sources as IABIED/AI2027 authors, not derived from those sources
- The remaining ~25% beyond IABIED is: "when", "how likely are variations", "how does stuff manifest" — informed by METR evals, Anthropic papers, incident reports, governance dynamics, economics, social data

**Workflow:** Agent reads literature → asks Jörn specific grounded questions → Jörn answers → agent drafts scenario content → Jörn validates nothing was lost in translation

**Literature available:** See `literature/INDEX.md` — covers model behavior (alignment faking, sleeper agents, scheming), evals (METR, AISI), security (RAND weight theft), governance (EU AI Act, US EOs, SB 1047), company policies (Anthropic RSP, OpenAI preparedness, DeepMind safety), incidents (database, Jan Leike departure), economics, and MIRI comms strategy.

**Still missing:** IABIED full text (copyrighted — ask Jörn), Gwern's ASI fiction, public opinion polling data (partial).

## Later Milestones
- **M2:** Coarse playthrough review — pacing, emotional beats, friction
  - Use `npm run playthrough > playthrough.md` to read all paths as prose
- **M3:** Detailed playtesting via CLI or browser
  - Use `npm run cli` for agent-driven turn-by-turn play
  - Use `npm run play` for interactive terminal play

## Done
- [x] **Reply expiry UX + mobile polish**
  - Expired decisions auto-resolve with sensible defaults (status quo / inaction)
  - EmailView: amber "You didn't respond" box for auto-resolved, gray for expired without default
  - Inbox: "Missed" badge replaces "Action needed" on expired/auto-resolved emails
  - `defaultReplyId` on all 9 decision emails in scenario.ts
  - Auto-resolve logic added to web engine + all 4 scripts (cli, play, playthrough, scenario-reference)
  - Mobile: larger touch targets on EmailView toolbar, sidebar auto-closes on action
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
