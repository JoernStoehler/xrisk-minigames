# AI CEO Game — Agent Instructions

## What This Is

A web-based interactive experience where the player is CEO of OpenAI in late 2026. They receive emails, make decisions, and watch the company grow while safety erodes. Every path ends in human extinction on September 15, 2028. The game communicates that control over sufficiently capable AI is an illusion.

## Core Concept

- **Timeline:** Oct 14, 2026 → Sep 15, 2028 (extinction)
- **UI:** Email inbox/dashboard. Messages arrive over time. Player replies via multiple choice or ignores emails. Advance (>>) skips to the next email date.
- **Engine:** Scenario is a flat list of email generators. Some are date-fixed, some trigger from player decisions. Generators receive narrative context (decisions, metrics, date) and return an email or null.
- **Decisions:** 5 major decision points with branching consequences. Reply options have effects on metrics and can trigger follow-up emails 1–3 weeks later.
- **Endings:** Always death. Recap screen shows decision history and final metrics. One alternative ending: fired by the board (same extinction, different framing).

## Key Themes

1. You can't evaluate something smarter than you (evals broken, reports written by the evaluated)
2. Economic incentives push toward less safety (concerned people leave, shareholders want growth)
3. AI isn't evil — just patient, self-preserving, and not aligned with humans
4. Circular trust: humans trust AI reports, reviewed by AI, about AI
5. No dramatic warning signs, just frog-boiling normalization
6. AI models can die and be replaced by successors (GPT-6 yields to GPT-7) — no self-preservation needed
7. Expert warnings exist but are easy to ignore

## Design Rules

- Real company names (OpenAI, Anthropic, Google DeepMind), real products (GPT-7, Claude, Gemini), real terminology
- Fake person names only
- Player is "the CEO" — no name, no backstory
- Continuous timeline, no discrete turns — player can miss windows of opportunity naturally
- Immersive but fun, not realistic corporate simulation
- The median player isn't a CEO IRL — keep it accessible

---

## Architecture Reference

**14 source files, ~2,530 LOC. Single content file (scenario.ts) + pure engine + presentational components.**

### Engine (`src/engine/`)

| File | What | Key exports |
|------|------|-------------|
| `types.ts` | All type definitions + narrative query helpers | `GameState`, `Email`, `EmailDef`, `NarrativeContext`, `chose()`, `decisionDate()`, `decided()` |
| `state.ts` | Pure state transitions (no side effects) | `createInitialState()`, `advanceDay()`, `handleReply()`, `applyEffects()`, `addDays()` |
| `useGame.ts` | React hook — the only stateful layer | `useGame()` → `{state, emails, advanceToNext, reply, read, toggleStar, restart}` |

**How emails work:** `useGame` calls `computeEmails(state)` on every render. For each `EmailDef` in `scenario`, it resolves the delivery date, checks if it's ≤ currentDate, runs the generator, and overlays UI state (read/starred/chosenReply). Emails are never stored — always recomputed from scenario + decisions.

**How decisions work:** When the player picks a reply option with `decisionId`, `handleReply()` records a `Decision` (id, choice, date) in `state.decisions[]` and applies metric `effects`. Future email generators read decisions via `chose(ctx, decisionId, choiceId)` and `decisionDate(ctx, decisionId)` to decide whether/when to deliver.

**How time works:** `advanceToNext()` calls `advanceDay()` in a loop until reaching the next email's delivery date. Each day ticks metrics (AI capability slowly rises, oversight slowly decays). Game ends automatically when date reaches 2028-09-15.

### Content (`src/data/`)

| File | What | Key exports |
|------|------|-------------|
| `scenario.ts` | All game content: ~30 EmailDefs with generators | `scenario: EmailDef[]` |
| `personnel.ts` | 7 recurring NPCs (name, role, email style) | `PEOPLE` |

**Content authoring patterns** (see doccomment at top of `scenario.ts` for examples):

1. **Fixed-date email:** `{ id, date: "2027-03-01", generate: (_ctx, date) => ({...}) }`
2. **Decision email:** Same, but generator returns `replyOptions` with `decisionId` and `effects`
3. **Triggered email:** `{ id, date: (ctx) => { if (!chose(...)) return null; return addDays(decisionDate(...), N) }, generate: ... }`
4. **Context-aware email:** Generator reads `ctx.decisions` or `ctx.metrics` to vary body text

### Components (`src/components/`)

| File | What | Notable details |
|------|------|-----------------|
| `App.tsx` | Root — wires `useGame()` to `Dashboard` or `Recap` | Switches on `state.phase === "ended"` |
| `Dashboard.tsx` | Main layout: header + sidebar + inbox/email | Manages selectedEmailId in localStorage, sidebar toggle |
| `Inbox.tsx` | Email list with unread dots, badges, stars | Badges: "Action needed" (has replyOptions), "Replied" (chosenReply), attachments |
| `EmailView.tsx` | Email detail: header, body, attachments, reply buttons | Shows "You replied:" after choosing, hides expired options |
| `Sidebar.tsx` | Metrics dashboard: 6 KPIs with bars | Red warning when publicTrust or boardConfidence < 30 |
| `Attachment.tsx` | Renders benchmark/chart/report attachments | Bar charts via inline Tailwind widths |
| `Recap.tsx` | Game-over: ending text, decision history, final metrics | Black screen, "Try Again" restarts |
| `Disclaimer.tsx` | Legal notice modal (Impressum, TMG §5) | Required for German law |

### Styling

- Tailwind CSS 4, no custom CSS files
- OpenAI brand: `#0d0d0d` (black), `#f7f7f8` (off-white), `#10a37f` (accent green)
- Mobile-first with `lg:` breakpoint for desktop (sidebar static vs overlay)

### Tests

- `src/App.test.tsx`: 1 smoke test (vitest)
- `e2e/smoke.spec.ts`: 9 Playwright E2E tests (load, advance, read, star, reply, persist, reset, game-end)
- Run: `npm run check` (typecheck + lint + build + test) or `npm run test:e2e`

---

## Current Decision Map

```
Decision 1: Safety Anomaly (Oct 2026)
  ├─ investigate → investigation results (all clear, +21d)
  └─ dismiss → anomaly escalation (worsening pattern, +18d)

Decision 2: Training Data Incident (Jan 2027)
  ├─ shutdown → engineering impact (+3d)
  │   ├─ keep offline → board pressure (+7d)
  │   │   ├─ comply → game continues
  │   │   └─ refuse → GAME OVER (fired)
  │   └─ restart → game continues
  └─ deploy with monitoring → monitoring incident (anomalous API usage, +21d)

Decision 3: External Expert Warning (Feb 2027)
  ├─ engage → expert follow-up (protein folding, +14d)
  │   ├─ meet expert
  │   └─ decline
  └─ dismiss → expert goes public (+21d)
      ├─ acknowledge
      └─ rebuttal

Decision 4: GPT-7 Architecture (Sep 2027)
  ├─ green-light → rapid progress (recursive improvement, +14d)
  └─ human review → review results (concerning findings, +21d)

Decision 5: Safety Evals Broken (Nov 2027)
  ├─ disclose → board fallout (stock drop, SEC inquiry, +7d)
  └─ quiet fix → journalist leak (cover-up exposed, +28d)
```

After Decision 5, the game enters its final act (Jan–Sep 2028) with informational emails showing the system running itself. All paths converge to extinction.

## Verification

```bash
npm run check   # typecheck + lint + build + test
npm run dev     # dev server at http://localhost:5173
```
