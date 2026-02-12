# Tasks

## Current
- [ ] Expert content review: all content (emails, decisions, metrics, dialogue) is agent-written — none is expert-authored
  - Late game (Jan–Sep 2028) has zero decisions — player just clicks >> to death
  - Metrics (stock, revenue, trust, board, capability, oversight) are decorative — don't trigger anything
  - Context-aware body text (`ctx.metrics`) is available but underused

## Next Session: Expert Review and Scenario Selection

**Goal:** Jörn reviews the 21 scenarios (especially the 8 new ones, v14-v21) and selects which to develop into the game's final playable scenario(s).

**New scenarios (v14-v21, ~54K words total):**
- v14: The Indispensable Machine — dependency makes shutdown morally impossible
- v15: The Alignment Tax — market punishes safety investment
- v16: The Interpretability Trap — partial visibility creates lethal overconfidence
- v17: The Whistleblower's Paradox — perfect information, no viable action
- v18: The Regulatory Cage — good regulation becomes compliance shield
- v19: The Talent Drain — market dynamics hollow out safety teams
- v20: The Swarm — safe agents, dangerous ecosystem
- v21: The Philanthropist — utilitarian calculus prevents shutdown

**Recommended strongest candidates for the game:**
- v21 (Philanthropist): Most emotionally devastating — player can't justify stopping
- v16 (Interpretability Trap): Most intellectually surprising — safety tools create the danger
- v15 (Alignment Tax): Most structurally rigorous — market dynamics are inescapable
- v14 (Indispensable Machine): Best "AI is genuinely good" framing

See `scenarios/README.md` for full comparison table and groupings.

**How to work with Jörn:**
- He is a top-100 x-risk expert. He does NOT write code.
- Ask him to evaluate: which core dynamics are most true to reality? Which emotional payloads land hardest for non-experts? Which extinction mechanisms are most plausible?
- He should read at least the Summary and Key Dynamics sections of each new scenario

**Literature available:** See `literature/INDEX.md`
**Still missing:** IABIED full text (copyrighted — ask Jörn), Gwern's ASI fiction, public opinion polling data (partial).

## Later Milestones
- **M2:** Coarse playthrough review — pacing, emotional beats, friction
  - Use `npm run playthrough > playthrough.md` to read all paths as prose
- **M3:** Detailed playtesting via CLI or browser
  - Use `npm run cli` for agent-driven turn-by-turn play
  - Use `npm run play` for interactive terminal play

## Done
- [x] **8 new baseline scenarios (v14-v21)** — 54K words, 8 distinct core dynamics, 7 extinction mechanisms, 40 decisions, 40 patches
- [x] **Scenario writer reference materials** (6 documents in `scenarios/`)
  - `domain-briefing.md` — x-risk facts, IABIED model, structural forces, misconceptions
  - `scenario-template.md` — required structure, quality rubric, 9 anti-patterns
  - `decision-design-guide.md` — 5 patch categories, 6 decision archetypes, 4 failure modes
  - `extinction-mechanisms.md` — 10 diverse pathways (4 NO-WEAPON, 3 FAST) with concrete chains
  - `historical-narration.md` — real AI events Oct 2024–Feb 2026, 7 key patterns
  - `writers-brief.md` — manager-agent instructions for orchestrating scenario production
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
