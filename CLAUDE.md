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
scripts/               # Shared helper scripts
docs/recipes.md        # Copy-paste patterns (Workers, D1, LLM, image gen)
.claude/               # Hooks, settings
```

**Owner:** Jörn Stöhler — generates project ideas, provides x-risk domain expertise, reviews design decisions. Does NOT write code.

---

## Invariants

**Each project is independent:**
- Own `package.json`, own deps, own build, own deploy
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
- Don't proceed with assumptions on ambiguous requirements
- Ask Jörn when blocked on x-risk content, communication approach, or scope

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
- **Setup command:** `npm run setup:ccweb` (installs browsers + deps)

---

## Working with the Owner

### Jörn's Expertise
- Top 100 expert on ASI x-risk, AI capabilities/trends, AI governance
- Average expert in forecasting, geopolitics, x-risk communication
- Self-described bad taste in design/UX/game mechanics
- Top 10% in using agents for development; top software engineer who prefers not to write code

### Communication Style
- Be direct and literal — optimize for skimming
- Push back on YAGNI/KISS violations, unclear requirements, over-scoping
- Present decision tradeoffs with your forecast of outcomes — Jörn can agree/disagree
- Don't ask permission for obvious engineering decisions
- DO ask when: x-risk content accuracy matters, communication approach is unclear, scope is ambiguous

### Session Scoping
- Each CC Web session is typically scoped to one project
- Work within that project's directory
- Read the project's `CLAUDE.md` and `TASKS.md` first
