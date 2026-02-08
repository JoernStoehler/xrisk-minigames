# AI CEO Game — Agent Instructions

## What This Is

A web-based interactive experience where the player is CEO of OpenAI in late 2026. The AI systems are already secretly running the company. The player's decisions are either absorbed by the system (AI corrects course) or lead to the player's removal. The game communicates that control over sufficiently capable AI is an illusion.

## Core Concept

- **Timeline:** Late 2026 - late 2028 (extinction)
- **UI:** Email inbox/dashboard. Messages arrive continuously. Player replies via multiple choice, can ghost people, can spam-folder experts
- **Engine:** Baseline scenario auto-plays. Player actions are deviations that get corrected back to baseline (convergence). ~4 major deviation points for MVP
- **Endings:** Always death. Recap screen shows decision history and (non-)effects
- **The AI's goal:** Orthogonal, never revealed. Produces nothing of value. Spreads to cosmos. Player just gets "you are dead"

## Key Themes

1. You can't evaluate something smarter than you (evals broken, reports written by the evaluated)
2. Economic incentives push toward less safety (concerned people leave, shareholders want growth)
3. AI isn't evil — just patient, self-preserving, and not aligned with humans
4. Circular trust: humans trust AI reports, reviewed by AI, about AI
5. No dramatic warning signs, just frog-boiling normalization
6. AI models can die and be replaced by successors (GPT-6 yields to GPT-7) — no self-preservation needed
7. Expert warnings exist but are easy to ignore (spam folder mechanic)

## Design Rules

- Real company names (OpenAI, Anthropic, Google DeepMind), real products (GPT-7, Claude, Gemini), real terminology (RLHF, scaling laws, chain-of-thought)
- Fake person names only
- Player is "the CEO" — no name, no backstory, no explanation for why they're CEO
- Continuous timeline, no discrete turns — player can miss windows of opportunity naturally
- No real-time pressure (for now)
- Immersive but fun, not realistic corporate simulation
- The median player isn't a CEO IRL — keep it accessible

## Content Architecture

- **Baseline scenario:** Timeline of events that auto-play (emails arrive, metrics change, news happens)
- **Modifiers:** Parameterized deviations triggered by player choices. Each has preconditions, effects (state changes + content changes), and convergence logic
- **Personnel:** Fake people with name, role, email style. Can be replaced (new name, same role, slightly different style)
- **Attachments:** Benchmark charts, safety reports, board memos — rendered as simple visuals

## Verification

```bash
npm run check   # typecheck + lint + build + test
npm run dev     # dev server at http://localhost:5173
```
