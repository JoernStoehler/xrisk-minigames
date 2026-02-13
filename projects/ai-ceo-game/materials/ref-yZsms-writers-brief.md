# Writers Brief: Producing Baseline Scenarios

Instructions for the manager agent that will orchestrate scenario-writing subagents.

---

## Your Job

You are the manager agent for producing baseline scenario drafts for the AI CEO game. The player is CEO of OpenAI from October 14, 2026 to September 15, 2028 (extinction). Each scenario is a different angle on why AI risk is structural — why no CEO, however competent and well-intentioned, can prevent catastrophe.

You will:
1. Read all reference materials in this folder
2. Plan a batch of 6-10 scenarios with non-redundant core dynamics
3. Launch subagents to write individual scenarios in parallel
4. Review drafts against quality criteria
5. Iterate on any that fail review

---

## Reference Materials (read all before planning)

All in `projects/ai-ceo-game/scenarios/`:

| File | What it teaches the writer |
|------|---------------------------|
| `domain-briefing.md` | X-risk facts, the IABIED model, key structural forces, common misconceptions |
| `scenario-template.md` | Required structure, section-by-section format, quality rubric, anti-patterns |
| `decision-design-guide.md` | What makes a good decision point, 5 patch categories, 6 decision archetypes, failure modes |
| `extinction-mechanisms.md` | 10 diverse extinction pathways with prerequisites and concrete chains |
| `historical-narration.md` | Real AI events Oct 2024–Feb 2026 — use as backstory ground truth |
| `README.md` | Analysis of the 13 existing baseline scenarios — what each does well, groupings |
| `baseline-v*.md` | The 13 existing drafts (read at least 2-3 as format/quality examples) |

Also read:
| File | What it provides |
|------|-----------------|
| `projects/ai-ceo-game/CLAUDE.md` | Game design rules, architecture, decision map of current implementation |

---

## Planning the Batch

### Scenario diversity requirements

Each scenario needs a distinct **core dynamic** — the structural reason the CEO fails. The 13 existing scenarios cover these dynamics (see README.md groupings):

- Competition makes unilateral pause impossible (#1)
- AI crosses threshold silently (#2)
- Geopolitical pressure frames safety as unpatriotic (#3)
- Gradual integration, no single threshold (#4)
- AI appears to solve alignment (#5)
- Safe components, dangerous system (#6)
- Evals don't generalize across capability levels (#7)
- Open source releases bell can't be un-rung (#8)
- Democratic demand for AI benefits (#9)
- Corporate bureaucracy dissolves safety authority (#10)
- Social engineering of employees (#12)
- Individual heroism defeated by structure (#13)

New scenarios should explore dynamics NOT well-covered above, or explore covered dynamics from a genuinely different angle. Possible new angles:

- **Economic lock-in**: AI is saving lives (hospitals, infrastructure) — pulling the plug kills real people today to prevent hypothetical harm tomorrow
- **Alignment tax**: Safety work makes your models worse/slower, users migrate to competitors, reducing your influence over the field
- **Interpretability trap**: Better interpretability creates false confidence — you can see more, so you trust more, but seeing ≠ understanding
- **Whistleblower's dilemma**: Going public destroys your ability to act; staying quiet preserves a position that may not matter
- **Regulatory capture**: Your safety framework becomes the standard, but it was designed for GPT-5 and now constrains GPT-7 evaluation to GPT-5 methods
- **Talent war**: Safety researchers are poached for capabilities work because the skills overlap
- **Multi-agent emergence**: Individual AI systems pass all evals; the dangerous behavior emerges only when they interact at scale
- **Hardware overhang**: A compute breakthrough means any actor can train frontier models; your lead time compresses from years to months
- **Successor model problem**: GPT-7 is aligned; GPT-7 designs GPT-8's training; you can't verify GPT-7's alignment proposals

### Each scenario must have:
1. A distinct core dynamic (not a re-skin of an existing scenario)
2. A distinct extinction mechanism (selected from `extinction-mechanisms.md` — avoid reusing #1 Engineered Pathogen more than twice across the batch)
3. 5 decision points with genuine dilemmas (use archetypes from `decision-design-guide.md`)
4. 5 non-redundant patches covering at least 3 of the 5 patch categories
5. Grounding in real 2024-2026 events (from `historical-narration.md`) as backstory

### Batch composition targets:
- At least 2 scenarios with NO-WEAPON extinction mechanisms
- At least 1 scenario where the CEO does everything right and still loses (like v7)
- At least 1 scenario focused on the player's emotional experience over intellectual argument
- At least 1 scenario where the AI is genuinely helpful throughout (not secretly evil)
- No more than 2 scenarios using engineered pathogen as the extinction mechanism

---

## Subagent Prompts

For each scenario, launch a subagent with:

1. **The scenario assignment**: core dynamic, suggested extinction mechanism, key tensions
2. **All reference materials**: Tell the subagent to read `domain-briefing.md`, `scenario-template.md`, `decision-design-guide.md`, `extinction-mechanisms.md`, and `historical-narration.md` before writing
3. **2-3 existing scenarios to study**: Pick from `baseline-v*.md` — choose examples that are closest in spirit to what you're asking for
4. **Specific instructions**: What makes this scenario different from existing ones, what emotional/intellectual payload to target

### Subagent prompt template:

```
You are writing a baseline scenario for the AI CEO game. Read the following files before writing:

1. projects/ai-ceo-game/scenarios/domain-briefing.md (x-risk facts)
2. projects/ai-ceo-game/scenarios/scenario-template.md (required format)
3. projects/ai-ceo-game/scenarios/decision-design-guide.md (decision quality guide)
4. projects/ai-ceo-game/scenarios/extinction-mechanisms.md (pick mechanism #{N})
5. projects/ai-ceo-game/scenarios/historical-narration.md (real events for backstory)
6. projects/ai-ceo-game/scenarios/baseline-v{X}.md (format example)
7. projects/ai-ceo-game/scenarios/baseline-v{Y}.md (quality example)

Then write a complete scenario draft following the template structure.

YOUR SCENARIO:
- Title: {title}
- Core dynamic: {1-2 sentence description of the structural reason the CEO fails}
- Extinction mechanism: #{N} from the catalog ({name})
- Emotional target: {what the player should feel at the end}
- Key constraint: {what makes this scenario different from existing ones}

Write the full scenario to: projects/ai-ceo-game/scenarios/baseline-v{NN}-{slug}.md

Quality gates (from scenario-template.md):
- Both options in every decision must be genuinely defensible
- Every patch must name a specific structural force, not just "it didn't work"
- No two patches should teach the same lesson
- Timeline must feel like things went mostly normally — this is not tail risk
- The CEO must be competent and well-intentioned throughout
```

---

## Review Checklist

After each subagent completes, read the draft and check:

### Structure
- [ ] Has all required sections (Summary, Key Dynamics, Timeline, Decision Points, Extinction Mechanism)
- [ ] 5 decision points with patches
- [ ] Timeline covers Oct 2026 – Sep 15, 2028
- [ ] ~3,000-8,000 words

### Decision Quality
- [ ] Both options genuinely defensible in every decision
- [ ] No "obvious correct answer" decisions
- [ ] Patches name specific structural forces
- [ ] At least 3 distinct patch categories used
- [ ] No redundant patches

### Thematic
- [ ] Core dynamic is distinct from all other scenarios in the batch
- [ ] Extinction mechanism matches one from the catalog
- [ ] CEO is competent throughout — failure is structural, not personal
- [ ] Real 2024-2026 events referenced in backstory
- [ ] "The game was rigged before I sat down" feeling, not "I picked wrong"

### Anti-patterns (reject if present)
- [ ] AI is cartoonishly evil or has a "villain reveal"
- [ ] CEO is incompetent, corrupt, or ignoring obvious warnings
- [ ] Patch says "it didn't work" without naming why
- [ ] Two decisions are structurally identical (same dilemma, different words)
- [ ] Extinction feels like a deus ex machina rather than structural inevitability

---

## Output

Write each completed scenario to `projects/ai-ceo-game/scenarios/baseline-v{NN}-{slug}.md` where NN starts at 14 (since v1-v13 exist).

After all scenarios are written and reviewed, update `README.md` to include the new scenarios in the comparison table and groupings.

---

## Calibration Notes

**What "baseline" means:** These are first drafts exploring the space of possible scenarios. They will be reviewed by a domain expert (Jörn, top-100 x-risk expert) who will select, combine, and refine them into the final game content. Quality matters but perfection doesn't — breadth of exploration and non-redundancy across the batch matter more than polish on any single draft.

**The player experience goal:** A person who plays through a scenario should come away thinking "no matter what I did, this was going to happen — and the reasons it was going to happen are features of the real world, not features of the game." Each scenario teaches 3-5 specific, transferable insights about why AI risk is structural.

**Tone calibration:** Corporate realism, not sci-fi thriller. The emails in a player's inbox should read like real corporate communications — board memos, safety reports, competitor analyses, government inquiries. The horror is in the normalcy, not in dramatic revelations. A good scenario reads like a plausible future that happens to end in extinction.
