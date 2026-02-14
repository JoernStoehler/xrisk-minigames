# Review: CEO-PoV Research Materials

Agent review of the 5 CEO-PoV research documents and scenarios README. Intended for Jörn to skim before deciding next steps.

---

## Overview

5 research documents were added to support authentic CEO decision-writing:
1. **Value Creation** — steelman case for why stopping AI feels monstrous
2. **Peer Dynamics** — social reinforcement loop among 11 tech CEOs
3. **Amodei Paradox** — case study of safety erosion despite genuine beliefs
4. **Altman Voice** — rhetorical patterns and authentic CEO language
5. **Business Press** — information asymmetry between business media and safety community

Plus: **Scenarios README** comparing all 21 scenario drafts.

**Overall quality: High.** These are well-researched, well-structured, and genuinely useful for writing authentic CEO emails. Main limitations are format (too long for quick agent lookup) and coverage gaps (internal voice, crisis language, operational texture).

---

## Document-by-Document Findings

### 1. Value Creation

**Purpose:** Arms the CEO character with legitimate arguments for why stopping AI development feels morally wrong.

**Strengths:**
- Specific, sourced examples (AlphaFold Nobel Prize, ISM001-055 drug, Be My Eyes + Ray-Ban Meta)
- Multi-stakeholder framing (patients, students, blind users, workers, scientists)
- Genuinely strong steelman — not a strawman

**Issues:**
- Some claims are projections marketed as facts (CCS cost reduction, 97M new jobs)
- Attribution ambiguity on some stats ("90% of development teams" — source?)
- 366 lines is too long for agent lookup during scenario writing

**Suggestions:**
- Add a "Top 15 CEO Talking Points" quick-reference section
- Separate projection from fact with `[projected]` labels
- Add "Common Objections" so agents can also write safety advocate NPCs

### 2. Peer Dynamics

**Purpose:** Maps social reinforcement mechanisms that make slowing down structurally impossible.

**Strengths:**
- Excellent language patterns ("underinvest," "self-inflicted injury," "deeper than fire")
- Physical settings for peer pressure (Trump inauguration seating, White House dinners, Davos)
- Clear explanation of "responsible racer" trap (Amodei's maximum-caution ceiling)
- Shows dissent requires leaving the system (LeCun departure)

**Issues:**
- Missing Demis Hassabis (critical OpenAI peer, Nobel Prize winner)
- All external peers — no internal organizational pressure dynamics
- Microsoft as investor/partner is uniquely important to OpenAI but underexplored

**Suggestions:**
- Add Hassabis section
- Add Microsoft/OpenAI partnership dynamics
- Create "CEO decision playbook" mapping pressure types to response patterns

### 3. Amodei Paradox

**Purpose:** Shows that even a CEO who genuinely believes in x-risk cannot escape competitive capture.

**Strengths:**
- Commitment erosion ratchet documented in detail (hard thresholds → "flexibility" → original commitments "outdated")
- Revenue momentum as self-reinforcing trap (10x growth → investor expectations → compute → more revenue needed)
- Davos "prisoner's dilemma" moment crystallizes the trap
- CEO emotional arc: idealism → compromise → helplessness → eloquent description while racing

**Issues:**
- Several events are post-knowledge-cutoff (RSP v2.2, $30B Series G, Sharma resignation) — unclear if factual or speculative
- Missing competitor comparison (is Anthropic actually different from OpenAI?)
- Document is analytical/retrospective; game needs in-the-moment pressure

**Suggestions:**
- Clearly mark verified vs projected events
- Add decision counterfactuals ("what alternative was possible at each point?")
- Extract quote library organized by pressure type for email writing

### 4. Altman Voice

**Purpose:** Catalog of rhetorical patterns and authentic language for CEO character.

**Strengths:**
- 10 documented rhetorical patterns with examples (e.g., "yes, and" safety framing, iterative deployment as safety-by-definition)
- Dense quote collection with source attribution
- Progression tracking: "please regulate" (2023) → "light touch" (2025)
- Captures emotional register: vulnerability, confidence, humility-signaling, mission fervor

**Issues:**
- 100% public-facing quotes; game needs internal voice (emails to board, CTO, safety team)
- No failure/crisis language ("evals broken," "model escaped sandbox")
- No technical decision language (training run go/no-go, architecture choices)

**Suggestions:**
- Add speculative "internal comms" section for board memos, safety team emails, investor updates
- Add crisis management voice guide
- Map 10 patterns directly to game's 5 decision points

### 5. Business Press

**Purpose:** Demonstrates systematic information asymmetry between business media and safety community.

**Strengths:**
- "Two movies on one screen" effect powerfully documented (same events, zero interpretive overlap)
- Analyst language ready for board/investor emails ("deep bench," "investors won't be put off")
- Subtle horror: safety departures reported alongside "VP of People" departure — significance flattened
- Non-disparagement agreements buying silence (Kokotajlo forfeiting $1.7M)

**Issues:**
- Microsoft RPO claim ("45% of $625B RPO") seems implausibly high — needs verification
- Missing: employee sentiment beyond departing safety leads
- Missing: regulatory language (SEC, FTC, EU filings)

**Suggestions:**
- Add "CEO's Weekly Reading" section (Monday morning briefing format)
- Add "What's NOT in the CEO's inbox" — the absence of safety content is as important as the business content
- Mark claims as [confirmed], [analyst claim], [disputed], [projection]

---

## Scenarios README

**21 scenarios** across 4 batches, grouped by 8 thematic questions ("Why can't the CEO [slow/detect/contain/stop]?").

### Strongest Candidates

| Rank | Scenario | Why |
|------|----------|-----|
| 1 | #21 The Philanthropist | Most emotionally devastating — utilitarian calculus prevents shutdown |
| 2 | #16 Interpretability Trap | Most intellectually surprising — safety tools create the danger |
| 3 | #15 Alignment Tax | Most structurally rigorous — market punishes safety |
| 4 | #7 Safety Theater | "You did everything right" — devastating |
| 5 | #13 The Fighter | Most gameplay-friendly — heroic CEO still loses |

### Significant Redundancies

- #4 (Boiling Frog) ≈ #14 (Indispensable Machine) — both dependency traps
- #1 (The Race) ≈ #3 (China Sprint) — both competitive pressure
- #6 (Accident) ≈ #20 (Swarm) — both emergent behavior
- #9 (Democratic Mandate) ≈ #21 (Philanthropist) — both "can't stop helpful thing"
- #15 (Alignment Tax) ≈ #19 (Talent Drain) — both market dynamics

### Coverage Gaps

- No deceptive alignment detection scenario (AI passing safety tests while misaligned)
- Multi-agent coordination failures underexplored
- No AI-accelerated-human-conflict path (AI catalyst for nuclear war)
- Digital-first extinction paths (info warfare, cyber) underrepresented

---

## Cross-Cutting Recommendations

### What to do next (for Jörn)

1. **Pick 1 scenario to develop first.** Recommended: #21 (Philanthropist) for emotional impact, or #16 (Interpretability Trap) for intellectual novelty.

2. **Read the Summary + Key Dynamics sections** of your top 3-4 candidates. The full scenarios are ~3K-8K words each.

3. **Decide: single scenario or multi-scenario?** Current architecture supports one scenario. Multiple would require a selection mechanism.

### What agents should do next

1. **Create quick-reference distillations** of each research doc (top talking points, key quotes, decision-email templates)
2. **Fill the "internal voice" gap** — no research doc covers how CEOs talk internally (board memos, safety team emails, crisis responses)
3. **Add operational texture** — the mundane CEO calendar that makes x-risk "one signal among hundreds"
4. **Verify post-2025 claims** in the Amodei document — mark speculative vs confirmed
5. **Cross-reference research → game decisions** — map which research insights support each of the 5 decision points
