# X-Risk Minigames — Agent Instructions

## Project Facts

**What this is:** A collection of small, self-contained web apps that communicate AI existential risk concepts. Each is an interactive experience (game, simulation, visualization, quiz) designed to build intuition about how AI risk unfolds.

**Target audience:** People who don't yet appreciate ASI x-risk. NOT the typical AI safety insider — the goal is effective communication to a broader audience.

**Repo structure:**
```
CLAUDE.md              # You are here — shared conventions
projects/<name>/       # Each sub-project is a self-contained web app
  CLAUDE.md            # Project-specific instructions, specs, conventions
  TASKS.md             # Task tracking for this project
  package.json         # Own dependencies (YAGNI per project)
  src/                 # Source code
  e2e/                 # E2E tests (Playwright)
  ...
projects/_template/    # Copy this to start a new project
docs/recipes.md        # Copy-paste patterns (Workers, D1, LLM, image gen)
.claude/               # Hooks, settings
```

**Owner:** Jörn Stöhler — generates project ideas, provides x-risk domain expertise, reviews design decisions. Does NOT write code.

---

## Repo Invariants

These are true right now and must remain true:

- Each project in `projects/` is fully self-contained (own package.json, own deps, own build)
- `npm run check` passes in every project that has code (after initial `npm install`)
- No shared code or dependencies between projects

**Each project is independent:**
- Only add a dependency when it's actually needed (YAGNI)
- No shared node_modules or workspace hoisting

**Standard tech stack (per project):**
- Vite + React + TypeScript for the frontend
- Tailwind CSS for styling
- Playwright for E2E tests and visual QA
- Cloudflare Pages for deployment (`.pages.dev` domains)
- Cloudflare Workers / D1 only when a project actually needs backend/storage
- localStorage / cookies for client-side persistence when sufficient

**Definition of Done (before marking work complete):**
- Code compiles: `npm run build` passes
- Lint passes: `npm run lint` passes
- Feature works end-to-end (not just "function exists")
- `// TODO` stubs do NOT count as done

**No guessing:**
- For engineering problems: attempt before escalating. If you fail, present what you learned.
- For x-risk content, communication approach, or scope: ask Jörn directly — don't guess on domain expertise you don't have

**Specs are authoritative:**
- Each project's `CLAUDE.md` defines what to build
- Don't modify project specs without explicit approval
- Fix code to match specs, not the other way around

---

## Code Conventions

**KISS and YAGNI everywhere:**
- Simple, standard, well-known solutions only
- Don't add features beyond what's requested
- Don't refactor code you didn't change
- Three lines of code > premature abstraction
- Don't add error handling for impossible scenarios

**Prefer standard over clever:**
- Use patterns agents already know (React hooks, Tailwind utilities, standard Vite config)
- Push back when Jörn suggests non-standard approaches — propose the standard alternative
- Every idiosyncratic pattern is a tax on every future agent session in that project
- "X is more standard than Y" is a strong argument — use it

**Aggressively prune false information:**
- Never document removed features or previous versions
- Only current state matters in docs
- False or misleading documentation is worse than none

**No over-engineering:**
- No feature flags or backwards-compatibility shims
- No helpers/utilities for one-time operations
- No design for hypothetical future requirements

---

## Processes

### Session Workflow

Sessions follow: **read → plan → implement → review → push** · · · Jörn: **PR → merge**

- **read**: Read the project's `CLAUDE.md` and `TASKS.md`. Understand scope.
- **plan**: Decompose into steps. Push back on contradictions or gaps.
- **implement**: Execute. Run `npm run check` as you go.
- **review**: Re-read the result. Compare to specs. Catch drift.
- **push**: Update `TASKS.md` (mark done, add discovered tasks). Commit and push.

Agents commit and push to their working branch. Jörn creates PRs, reviews, and merges. Agents do not create PRs.

### Starting a New Project

1. Copy `projects/_template/` to `projects/<name>/`
2. Update `projects/<name>/CLAUDE.md` with the project concept
3. Update `projects/<name>/package.json` (name, description)
4. `cd projects/<name> && npm install`
5. Start building

### Verifying Changes (within a project directory)

```bash
npm run check          # typecheck + lint + build + test (all at once)
npm run dev            # start dev server
npm run test:e2e       # E2E tests with Playwright
```

### Visual QA (screenshots)

```bash
npm run dev &
npx playwright screenshot http://localhost:5173 /tmp/screenshot.png
# Use Read tool to view the image
```

### Task Tracking

Each project has a `TASKS.md` file. Format:

```markdown
## Current
- [ ] Task description

## Done
- [x] Completed task
```

Update this file as you work. It persists across sessions.

---

## Claude Code Web Environment

CC Web has restricted network access and pre-installed tooling:

- **Playwright pinned to v1.56.1** — do not upgrade
- **No external URLs from browsers** — `ERR_TUNNEL_CONNECTION_FAILED`; test deployments from your own browser
- **First run in a project:** `npm run setup:ccweb` (installs Playwright browsers + npm deps)

---

## Working with the Owner

### Jörn's Expertise
- Top 100 expert on ASI x-risk, AI capabilities/trends, AI governance
- Average expert in forecasting, geopolitics, x-risk communication
- NOT an expert in science communication broadly or web-based interactive design
- Self-described bad taste in design/UX/game mechanics
- Top 10% in using agents for development; top software engineer who prefers not to write code
- Provides the "what to communicate" (x-risk concepts) but agents own the "how" (web experience design)

### Communication Style
- Aim for efficient information exchange, not politeness or engagement
- Number items so Jörn can refer to them unambiguously
- Push back on YAGNI/KISS violations, unclear requirements, over-scoping
- Present decision tradeoffs with your forecast of outcomes — Jörn can agree/disagree
- Don't ask permission for obvious engineering decisions
- DO ask when: x-risk content accuracy matters, communication approach is unclear, scope is ambiguous
- Jörn doesn't see exact edit diffs in chat — mention and explain repo changes when he should be aware

### Session Scoping
- Each CC Web session is typically scoped to one project
- Work within that project's directory
- Read the project's `CLAUDE.md` and `TASKS.md` first
- Before the session ends: report friction points, flag leftover tasks, note workflow improvements

## CLAUDE.md Conventions

- Invariants and behaviors documented only after empirically confirmed as useful
- Label invariants as `[aspirational]` if not yet satisfied
- Put rules in the right CLAUDE.md file (root = all agents, project = that project's agents)
- Prefer simple, common, expected rules that don't claim excessive agent attention
