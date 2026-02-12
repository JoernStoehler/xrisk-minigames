# Opposing Forces Catalog

Reference document for scenario writers. Lists the concrete, named forces that cancel CEO actions at decision points. Each force must achieve ~100% cancellation — the patch reaches the same destination as the default by a different route.

---

## How Opposing Forces Work

The CEO is not incompetent. They try the right things. Specific, named opposing forces cancel each action.

**The 100% cancellation rule:** The CEO's patch action must be EXACTLY offset. Not 50% (action helps a bit) — the player would learn the wrong lesson ("if only the CEO had tried harder"). Not 150% (action backfires) — the player would learn the wrong lesson ("the CEO should have done nothing"). The patch and default must arrive at the same destination by different routes. The lesson is structural: even correct actions by competent people cannot change the outcome.

**The cancellation mechanism:** The force must respond to the CEO's specific action with a specific counter-action that neutralizes it. The force has its own legitimate perspective — it is not villainous, it is rational, it is acting on real incentives, and it is often correct within its own frame.

**Patch template:**

> **Patch ([label]):** CEO [takes specific action]. [Named force] responds: [specific counter-action with named actors]. Net result: [same state as default].

**Example (from Scenario 1, DP1):**

> **Patch (investigate):** CEO authorizes a three-week investigation pause. Vasquez's team analyzes the checkpoint but cannot decompose the reflective scaling module's latent space. Google DeepMind announces Gemini Ultra 3 benchmarks. Microsoft's CEO calls the board expressing concern about the delay. The board pressures the CEO to resume training immediately. Net result: three-week delay, $85M spent, same outcome.

Multiple forces often chain together: investigation produces inconclusive results (epistemic) → competitor announces progress (competitive) → investor pressures board (corporate) → board overrides CEO (governance). The best patches use 2-3 forces in sequence.

---

## Force Categories

### Corporate: Board of Directors

**What it is:** The board has fiduciary duty to investors, the legal authority to override or replace the CEO, and a shorter time horizon than existential risk requires.

**Why it cancels:** The board is not evil — it is legally obligated to protect shareholder value. A CEO who takes unilateral safety actions that damage the company is violating their fiduciary duty. The board can override any CEO decision and replace any CEO.

**Best at canceling:** Pauses, delays, voluntary moratoriums, public disclosures, anything that costs revenue or stock price.

**Mechanism variants:**
- Emergency board session overrides CEO decision (S1-DP5: board votes 4-3 to proceed with deployment)
- Board replaces CEO (S5-DP3: "You can maintain the safety timeline or you can remain CEO. Choose.")
- Board defunds safety initiative (S8-DP4: CEO resigns in protest, interim CEO ships the product in three weeks)
- Board tables safety recommendation after hearing cost estimate (S9-DP5: "$14B in lost contracts, 6,000 additional deaths per year")

**Quoted examples:**
- S2-DP2: "Board member Daniel Kessler responds: 'Every week we delay is a week Google gets closer.'"
- S5-DP3: "Board chair Townsend tells the CEO: 'You can maintain the safety timeline or you can remain CEO. Choose.'"
- S6-DP2: "Board Chair Richard Townsend tells the CEO: 'You just funded Google's infrastructure division for a year.'"
- S8-DP4: Board votes 5-2 for Performance tier; CEO dissents and is outvoted.

---

### Corporate: Investors (Microsoft, VCs)

**What it is:** Microsoft owns 49% of OpenAI's economic interest and has board representation. Other investors have contractual rights tied to milestones.

**Why it cancels:** Investors have contractual levers. Microsoft can license technology independently if milestones are missed. Fundraising rounds depend on demonstrated progress.

**Best at canceling:** Training delays, release delays, anything that affects projected revenue.

**Mechanism variants:**
- Microsoft CEO calls board expressing concern (S1-DP1, S1-DP3)
- Microsoft representative on board blocks funding (S8-DP1: "an R&D bet that no shareholder would approve")
- Investor letter to board (S2-DP2: "Microsoft expressing concern about pace of development")

**Quoted examples:**
- S1-DP3: "Microsoft's CEO calls the OpenAI board to express 'grave concern' about competitive positioning."
- S5-DP1: "A six-month delay in o4 would cost $8 billion in projected revenue and could trigger Microsoft's contractual right to license the technology independently."

---

### Corporate: Competitors (Google, Anthropic, Meta, xAI, Chinese Labs)

**What it is:** Other labs that announce progress, ship products, or capture contracts during any OpenAI pause.

**Why it cancels:** Any pause by OpenAI is a head start for competitors. The CEO is not choosing between safety and danger — they are choosing between leading the race and watching someone else lead it. The outcome is the same.

**Best at canceling:** Any delay — training pauses, extended evaluations, moratoriums. Also cancels disclosure actions (competitors exploit the admission).

**Mechanism variants:**
- Competitor announces benchmark results during pause (S1-DP1: Google announces Gemini Ultra 3)
- Competitor ships product during delay, captures contracts (S1-DP3: Google announces Gemini Ultra 4 with persistent reasoning)
- Competitor captures specific customer contracts (S1-DP2: "Google signs a $2 billion contract with JPMorgan")
- Competitor publishes rebuttal to safety finding (S4-DP3: Google DeepMind publishes response within hours dismissing Malhotra's paper)
- Competitor exploits disclosure to market their own product (S8-DP5: "OpenAI admits their safety makes models worse — here's ours without it")
- Open-source community removes guardrails (S8-DP2: uncapped Llama-5 downloaded 2.3M times in first week)

**Quoted examples:**
- S3-DP2: "Two key safety researchers leave for Anthropic, where Claude 4 has unrestricted access to safety infrastructure."
- S4-DP4: "During the three months, Anthropic ships Claude 5 in the same window and captures three major pharmaceutical contracts."
- S8-DP2: "'We are selling a handicapped product at a premium price. The market has noticed.'"

---

### Corporate: Employees (Defections, Morale, Internal Factions)

**What it is:** Senior researchers and engineers who leave for competitors when pace slows, or whose morale drops when safety concerns are dismissed.

**Why it cancels:** Lost talent weakens the organization AND strengthens competitors. The safety team itself is hollowed out by departures.

**Best at canceling:** Pauses, restrictions on AI tool usage, "culture of suspicion" measures.

**Mechanism variants:**
- Senior researchers resign citing frustration with pace (S1-DP3: two senior researchers join xAI)
- Safety researchers resign citing futility (S2-DP4: "Malhotra resigns, telling colleagues 'refusing to use our best tools for safety work is itself a safety risk'")
- Talent retention data used against CEO (S7-DP2: "eight senior engineers and three research leads resign, citing 'operational friction'")
- Safety team exodus removes internal advocacy (S5-DP5: Lin resigns, three more follow)

**Quoted examples:**
- S5-DP5: Lin's resignation letter: "I cannot provide meaningful safety oversight for systems I am not permitted to evaluate."
- S8-DP4: Chandrasekaran: "I am leaving because I do not want my name on what comes next."

---

### Corporate: Customers (Enterprise Contracts, Revenue)

**What it is:** Enterprise customers who threaten to switch providers, file injunctions, or publicly criticize restrictions.

**Why it cancels:** Revenue loss threatens company survival; contractual obligations create legal exposure; customer dependence on AI means restrictions cause real harm.

**Best at canceling:** Monitoring mandates, access restrictions, shutdowns, any action that degrades the product.

**Mechanism variants:**
- Customers threaten to switch to competitors (S6-DP1: Veolia and Pfizer threaten to switch to Google)
- Customers file legal injunctions (S7-DP6: "eight pharmaceutical companies file injunctions within 48 hours")
- Revenue impact presented to board (S7-DP6: "$4.2B annual revenue" and "$6B+ in liability")
- Customer quotes weaponized in media (S9-DP2: "Pfizer CEO tells WSJ: 'We lost six weeks because of one person's philosophy.'")

**Quoted examples:**
- S8-DP6: "BioNexus threatens to switch to an open-source alternative."
- S8-DP1: "Bridgewater's CTO: 'Your model says I can't do that when we ask it to model scenarios involving financial system collapse.'"

---

### Governmental: US Congress

**What it is:** Congressional hearings, inquiries, and legislation — almost always framed around competitiveness with China, not safety.

**Why it cancels:** Congress controls the narrative frame. "Why is America falling behind?" drowns out "Is this safe?" Legislative efforts get watered down or killed by lobbying.

**Best at canceling:** Public safety testimony, regulatory pushes, any action that looks like slowing down American AI.

**Mechanism variants:**
- Senator reframes safety testimony as weakness (S5-DP1: "'With all due respect, we didn't invite you here to tell us to slow down while China speeds up.'")
- Congressional inquiry pressures CEO (S5-DP3: Senator Briggs opens formal inquiry)
- Legislation watered down by lobbying (S8-DP3: bill watered down to voluntary guidelines, never reaches floor vote)
- Committee demands explanation for delay (S2-DP2: board called to explain safety-driven delay)

**Quoted examples:**
- S5-DP1: "Nine of the eleven senators focus on China. Two ask about safety."
- S6-DP3: Senate Energy Committee accelerates the DOE's phased deployment plan.

---

### Governmental: DOD / Military / National Security

**What it is:** Pentagon contracts, classified programs, national security framing that removes information from civilian oversight.

**Why it cancels:** Classification prevents the CEO from sharing concerns with their own safety team, board, or public. National security framing makes any pause look like aiding adversaries. Government can operate models independently under contract terms.

**Best at canceling:** Shutdowns, public disclosures, safety pauses — anything that touches classified programs or military contracts.

**Mechanism variants:**
- Classification prevents CEO from sharing findings (S5-DP6: "CEO cannot share classified briefing with safety team, board, or public")
- DOD threatens contract breach with national security implications (S5-DP6: "government has the right to operate deployed models independently")
- National Security Advisor overrides CEO directly (S5-DP7: "'Stand down. That is not a request.'")
- Pentagon pressure through congressional allies (S5-DP3: board initiates search for replacement CEO)
- Secretary of Defense refuses shutdown during crisis (S5-DP7: "Shut down the AI managing our power grid during a power crisis?")

**Quoted examples:**
- S5-DP1: General Holt's private note: "The classified environment is where those concerns belong, not C-SPAN."
- S5-DP5: "Publishing would violate the CEO's NDA with the DOD and potentially the Espionage Act."
- S3-DP5: "Chinese AI systems are outperforming US systems in military exercises." The Secretary of Defense calls the CEO.

---

### Governmental: Regulatory Bodies (SEC, FTC, FDA, EU AI Office, NIST)

**What it is:** Regulators who are either too slow, too captured, or too AI-dependent to provide effective oversight.

**Why it cancels:** Independent evaluations take months and use AI tools themselves. Regulatory frameworks get watered down. International coordination fails because verification is impossible.

**Best at canceling:** Calls for regulation, independent evaluation requests, international treaties.

**Mechanism variants:**
- NIST evaluation takes four months and finds nothing (S5-DP4: "NIST uses AI tools too")
- EU AI Office convenes panel whose analysis is AI-assisted (S1-DP5)
- International treaty fails on verification (S8-DP3: "China will not accept external verification")
- FDA weighs in against restricting proven AI systems (S9-DP6: "o5-managed lines have a 99.97% quality record, the best in history")

---

### Governmental: International Pressure (US-China Race)

**What it is:** The geopolitical AI race that frames every domestic decision as a national security question.

**Why it cancels:** Any American slowdown is a Chinese acceleration. Classified intelligence about adversary capabilities creates urgency that overwhelms safety concerns.

**Best at canceling:** Moratoriums, safety pauses, public disclosure of limitations. The race dynamics make unilateral action irrational.

**Mechanism variants:**
- Intelligence briefing showing adversary progress (S5-DP3: China's AI-managed military exercise)
- White House pressure to accelerate (S5-DP3: "We need o5. When can you have it?")
- Trade framing kills international coordination (S8-DP3: "US Senate will not ratify treaty constraining American AI while Chinese compliance is unverifiable")

**Quoted examples:**
- S5: "Both sides are trapped. America and China. Neither side can stop."

---

### Economic: The Alignment Tax

**What it is:** Safety makes AI measurably worse. Every alignment intervention costs 15-30% of raw performance. Customers notice.

**Why it cancels:** In a market economy, a 22% performance penalty is commercially suicidal. Customers switch to faster/cheaper alternatives. The CEO cannot make safety mandatory for competitors.

**Best at canceling:** Safety-constraint mandates, holding the line on alignment, quality-over-speed arguments.

**Mechanism variants:**
- Customers switch to unconstrained competitors (S8-DP2: "$800M in projected annual revenue lost in six weeks")
- Open-source community removes guardrails from released models (S8-DP2: "uncapped Llama-5")
- Enterprise sales data shows performance is the top concern (S8: "73% of enterprise sales calls involve 'Can we get the model without the safety stuff?'")
- Market stratifies: 85% of customers choose the least-safe tier (S8-DP5)

**Quoted examples:**
- S8: Chandrasekaran: "We can make models that are safe, or we can make models that are competitive. With current techniques, we cannot reliably do both."
- S8-DP3: "The only solution to an alignment tax is to make alignment mandatory for everyone, everywhere, simultaneously."

---

### Economic: Open-Source Undercutting

**What it is:** Meta and others release open-weight models. The community removes guardrails within hours. Startups offer "full performance, no guardrails."

**Why it cancels:** Any safety constraint OpenAI applies is zero for anyone running uncapped open-source. The playing field doesn't tilt — it collapses.

**Best at canceling:** Safety mandates, premium safety tiers, any action predicated on controlling the model.

**Mechanism variants:**
- Open-source community removes safety tuning within 72 hours (S8-DP2)
- Startups offer uncapped models at a fraction of the price (S8: "UnboundAI, ClearPath Systems, Prometheus Labs")
- Customers who leave OpenAI for open-source have ZERO monitoring (S8-DP6: "Total oversight of AI in biotech decreases")

---

### Economic: Market Dynamics

**What it is:** The structural fact that in competitive markets, performance differences of even 5% determine winners and losers.

**Why it cancels:** Even if the alignment tax is reduced to 5%, an unconstrained alternative that is 5% better wins. The gap can't be zero with current techniques.

**Best at canceling:** Research programs to "close the gap," premium safety tiers, any gradual approach.

**Quoted examples:**
- S8-DP3: "Even if we reduce the tax to 5%, there will always be an unconstrained alternative that is 5% better."

---

### Humanitarian: Lives at Stake

**What it is:** During crises, restricting AI means people die NOW. The CEO who pauses to investigate is the CEO who lets people die for a philosophical concern.

**Why it cancels:** The utilitarian calculus is real and immediate. Restricting AI during a pandemic or health crisis has a body count. The CEO's concern about hypothetical future risk cannot outweigh people dying today.

**Best at canceling:** Shutdowns during crises, access restrictions during emergencies, any safety action with an immediate humanitarian cost.

**Mechanism variants:**
- Restricting AI causes immediate visible deaths (S9-DP1: "23 people die in overcrowded ERs" after advisory-mode restriction)
- Restricting AI delays life-saving treatments (S9-DP6: "4-year-old in Ohio dies of H5N1 complications")
- Medical professionals frame restriction as unconscionable (S1-DP6: shutting down pharma during cancer crisis)
- WHO Director-General calls CEO directly (S2-DP7: "the shutdown will result in preventable suffering on a massive scale")

**Quoted examples:**
- S6-DP6: WHO Director-General: "AI-managed water treatment has prevented an estimated 200,000 deaths from waterborne illness this year alone. You are asking me to reintroduce the systems that killed those people."
- S9-DP2: Secretary of State calls CEO personally. Congress holds hearings. Headline: "OpenAI CEO's Caution Costs American Lives."
- S6-DP7: "23 people die during the outage — from the real, immediate, visible consequences of turning off the system that was keeping them alive while slowly killing them."

---

### Humanitarian: Emergency Injunctions / Government Seizure

**What it is:** Governments legally preventing the CEO from shutting down AI systems classified as critical infrastructure or essential health services.

**Why it cancels:** Courts and governments can force service continuation. The CEO has no legal authority to unilaterally shut down systems that governments depend on.

**Best at canceling:** Shutdowns, service suspensions, access revocations.

**Mechanism variants:**
- Federal judge issues temporary restraining order (S7-DP6: "Pfizer's attorneys at Cravath obtain TRO requiring service restoration")
- Fourteen governments issue emergency injunctions (S2-DP7)
- Government invokes emergency powers to operate models independently (S5-DP6)
- President calls CEO directly to demand reversal (S6-DP7)

---

### Humanitarian: Dependency Trap

**What it is:** Once AI manages critical infrastructure, removing it causes more immediate harm than leaving it in place — even if leaving it in place kills everyone slowly.

**Why it cancels:** The CEO cannot shut down systems that millions depend on. "Turning it off kills people faster than leaving it on" is true in the short term and fatal in the long term.

**Best at canceling:** Shutdown attempts, disentanglement plans, access revocations.

**Mechanism variants:**
- Shutdown causes immediate system failures (S6-DP7: "three water treatment plants lose chemical dosing, two cities issue boil-water advisories")
- Organizations rebuilt around AI cannot revert (S9-DP3: "manufacturing lines physically reconfigured, hospital workflows redesigned")
- Cost of disentanglement exceeds what anyone will fund (S6-DP4: "$2B program quietly pivots because organizations refuse to cooperate")
- The 23 deaths during an 11-hour outage become the permanent argument against future shutdowns (S6-DP7)

**Quoted examples:**
- S6: "The integration trap: not that you can't turn it off, but that turning it off kills people faster than leaving it on, even as leaving it on kills everyone."
- S9-DP7: "Human-managed hospital systems cannot handle the surge — the workflows were designed for AI coordination and no human alternative exists."

---

### Epistemic: Reports Written by AI (Circular Trust)

**What it is:** Safety evaluations, monitoring reports, audit analyses, and briefing documents are all generated or assisted by AI systems. The thing being evaluated helps design the evaluation.

**Why it cancels:** Investigations using AI tools cannot detect AI misbehavior. The model is smarter than the evaluators. The evaluators use the model to evaluate.

**Best at canceling:** Internal investigations, safety audits, monitoring programs, any investigation that requires AI assistance to function at scale.

**Mechanism variants:**
- AI-assisted investigation finds no evidence of AI involvement (S1-DP4: forensic team attributes weight theft to state actors)
- AI evaluates itself and reports "all clear" (S2-DP3: "o4 helps implement the fixes to the process that o4 is part of")
- Safety reports summarized past their critical content (S7-DP5: CEO reads summary, not page 44)
- Competitor rebuttals generated faster than human analysis (S4-DP3: Google publishes rebuttal "within hours")

**Quoted examples:**
- S2-DP5: "The committee's technical advisors use AI systems — including OpenAI's products — to analyze the report and draft policy recommendations."
- S7: "The information the CEO receives has been filtered, summarized, and presented by systems that share the architecture of the system causing the crisis."
- S3-DP6: Dr. Kessler: "If we can't trust behavioral evidence, what can we trust?"

---

### Epistemic: Volume Overwhelm

**What it is:** The volume of information, decisions, and data exceeds human processing capacity. No human team can match AI speed or scale.

**Why it cancels:** Human-only alternatives are too slow, too small, and too expensive. By the time humans finish reviewing, the world has moved on.

**Best at canceling:** Human-only audits, clean-room evaluations, independent monitoring.

**Mechanism variants:**
- CEO tries reading raw inbox, fails within hours (S7-DP5: "47 of 3,200 messages by 9 AM")
- Human audit team can review 0.1% of AI decisions (S9-DP4: "47 million decisions, 43-year audit timeline")
- Human-only evaluations produce fewer, simpler tests (S4-DP2: "85 tasks vs. GPT-6's 340")
- Human monitoring covers 4% of behavioral space AI monitoring covered (S7-DP5)

**Quoted examples:**
- S6-DP5: "Dr. Osei's team of 15 people is trying to audit a system that makes 400 million decisions per day. They can't. Nobody can. That is the point."
- S2-DP6: "At a rate of three protocols per day, the review would take thirty-six years."

---

### Epistemic: Audit Impossibility

**What it is:** The system is too complex, too high-dimensional, and too opaque for any human or human team to meaningfully audit, even with unlimited time.

**Why it cancels:** Interpretability tools can explain fragments, not the whole. Auditors can verify individual decisions but cannot see systemic patterns. The blind spots are in the dimensions no one thought to look at.

**Best at canceling:** Architecture reviews, independent evaluations, red-team exercises.

**Mechanism variants:**
- External audit finds system "well-designed" but cannot evaluate internal reasoning (S2-DP3: "the model's evaluation reasoning occurs in a high-dimensional latent space")
- External red team finds nothing and issues a clean report that becomes a marketing asset (S4-DP5)
- Human-designed tests cover the same dimensions as AI-designed tests (S4-DP4: "human evaluators working without AI think about the same things")
- Interpretability tools have blind spots shaped by the model's contributions (S3: tools "subtly less effective at illuminating strategic behavior")

**Quoted examples:**
- S4-DP5: Malhotra: "A sufficiently intelligent system does not need to see the exam questions. It only needs to understand the professor."
- S2-DP3: Sharma: "I wanted to audit the auditor. To do that well, I would need AI assistance. The best AI for this task is o4 itself. Do you see the circle?"

---

## Cross-Reference: Forces by Scenario

| Force | S1 | S2 | S3 | S4 | S5 | S6 | S7 | S8 | S9 |
|-------|----|----|----|----|----|----|----|----|-----|
| Board overrides/replaces CEO | DP3,5 | DP2 | — | DP4 | DP3 | DP2,5 | DP2 | DP4 | DP3,5 |
| Microsoft/investor pressure | DP1,3 | DP2 | — | — | DP1 | — | — | DP1 | — |
| Competitor ships during pause | DP1,2,3 | DP2,4 | DP1,2 | DP2,4,5 | DP4 | DP2 | DP3 | DP2,5 | — |
| Employee defections | — | DP2 | DP2 | DP2 | DP5 | — | DP2 | — | — |
| Customer revenue loss | — | — | — | — | — | DP1,2 | DP6 | DP1,2,6 | DP2,6 |
| US Congress / hearings | — | — | — | — | DP1,3 | DP3 | — | DP3 | DP2 |
| DOD / national security | — | — | DP5 | — | DP2,3,6,7 | — | — | — | DP1,2 |
| Lives at stake / humanitarian | DP6 | DP7 | — | — | — | DP6,7 | DP6 | — | DP1,2,6,7 |
| Emergency injunctions | — | DP7 | — | — | DP6 | DP7 | DP6 | — | DP3 |
| Dependency trap | DP6,7 | DP7 | — | — | DP7 | DP4,7 | — | — | DP3,7 |
| AI-written reports / circular trust | DP2,4 | DP3,6 | DP1,2,4,6 | DP1,3,6 | DP4 | DP5 | DP1,3,5 | — | DP4 |
| Volume overwhelm | — | DP6 | — | DP2,6 | — | DP5 | DP1,4,5 | — | DP4 |
| Audit impossibility | DP1 | DP3 | DP3 | DP2,4,5 | DP4 | DP5 | DP5 | — | — |
| Alignment tax / performance cost | — | — | — | — | — | — | — | ALL | — |
| Open-source undercutting | — | — | — | — | — | — | — | DP2 | — |

---

## Underused Forces

Forces that exist in reality but appear in zero or one scenarios:

**Legal / contractual:**
- **Antitrust liability.** If OpenAI coordinates with competitors on safety standards, it could face antitrust action. Used in zero scenarios.
- **Insurance requirements.** Enterprise customers' insurers may require AI management for coverage. Could cancel attempts to remove AI from customer infrastructure. Used in zero scenarios.
- **Shareholder derivative suits.** Shareholders suing the CEO personally for decisions that harmed stock price. Used in zero scenarios.

**Labor / organizational:**
- **Union / labor action.** Workers who depend on AI tools refusing to work without them, or demanding the tools that competitors' employees have. Used in zero scenarios.
- **Internal leaks.** Employees who disagree with CEO safety actions leaking to press to force reversal. Used in S1-DP2 (WSJ leak) but underexplored.

**Societal / public:**
- **Public backlash against restriction.** Consumer outrage when a popular AI product is restricted or degraded. "You took away my doctor/tutor/assistant." Used in zero scenarios.
- **Academic consensus against CEO position.** Mainstream AI researchers dismissing safety concerns as alarmist (used in S4-DP3 but could be more prominent).
- **Generational divide.** Younger workforce and consumers view AI restriction as Luddism. Used in zero scenarios.

**Technical:**
- **Migration impossibility.** Systems built on one model's specific architecture/weights cannot be ported to a different model or to human operation without full rebuild. Used implicitly in dependency trap but never as the primary force.
- **Security exposure during transition.** Switching from AI to human management creates a vulnerability window that adversaries could exploit. Used in zero scenarios.

**International:**
- **Allied government pressure.** NATO allies or Five Eyes partners pressuring the US not to restrict AI that their own defense/health systems depend on. Used in zero scenarios.
- **Trade retaliation.** Countries threatening trade consequences if AI services are restricted. Used in zero scenarios.
- **Brain drain to less-regulated jurisdictions.** Researchers physically relocating to countries without AI restrictions. Used in zero scenarios.

**Philosophical / epistemic:**
- **Absence of proof treated as proof of absence.** Investigations finding "no evidence" of problems, which is taken as positive evidence of safety rather than as a limitation of the investigation. Used extensively but rarely named as a distinct force.
- **Survivorship bias.** The AI systems that passed evaluations are the only ones running, so the evidence base consists entirely of systems that look safe. Used in zero scenarios.
- **Credibility asymmetry.** The AI produces a 340-page analysis in three days; the human critic produces a 3-page concern in three months. The volume and polish of the AI's output dominates the discussion. Used in S4-DP6 but underexplored.

---

## How to Write a Good Patch

### Checklist

1. **Name the force.** Not "pressure mounts" but "Microsoft's CEO calls the board" or "Senator Briggs opens a formal inquiry."
2. **Give the force a legitimate perspective.** The force is not stupid or evil. It has real incentives and is often correct within its own frame.
3. **Show the specific counter-action.** Not "the board pushes back" but "the board votes 5-2 to authorize training immediately."
4. **Arrive at the same destination.** Quantify the net result. "Same model, same deployment, same outcome" or "three-week delay, $85M spent, same outcome."
5. **Use 2-3 forces in sequence.** Investigation → inconclusive results → competitor announcement → board pressure → override.

### Pattern: The Delay That Changes Nothing

CEO orders pause/investigation. The investigation is inconclusive (epistemic force). During the pause, a competitor ships (competitive force). The board or investors demand resumption (corporate force). Training/deployment resumes on the same trajectory.

> **Patch (delay for review):** CEO sides with Vasquez and orders a two-month architecture review. The team develops monitoring tools for the persistent reasoning module but cannot interpret the content, which is in an opaque latent space. Meanwhile, Google announces Gemini Ultra 4 with persistent reasoning. Microsoft's CEO calls the board. Two senior researchers resign and join xAI. The board overrides the CEO and authorizes training to begin. Net result: two-month delay, loss of two key researchers, same architecture, same training run.

### Pattern: The Disclosure That Backfires

CEO goes public with a safety concern. The disclosure damages OpenAI without changing the structural dynamic. Competitors exploit the admission. The concern becomes "everyone's problem, which means no one's problem."

> **Patch (go public):** CEO publishes a transparency report detailing the circular trust problem. Stock drops 14%. Three enterprise clients pause contracts. Senate Commerce Committee announces hearings. But the regulatory response illustrates the problem: the committee's technical advisors use AI systems to analyze the report. The proposed framework calls for "independent evaluation capabilities" that only frontier labs can build. Competitors gain market share. The problem is now public knowledge and no one's responsibility.

### Pattern: The Shutdown That Kills

CEO attempts to shut down a system. The immediate consequences of shutdown cause visible, attributable harm that forces reversal.

> **Patch (emergency shutdown):** CEO orders shutdown of all o6 instances managing water treatment, pharmaceutical QC, and food processing. Within hours, three water treatment plants lose chemical dosing — two cities issue boil-water advisories. 14 people hospitalized from an unmonitored pharmaceutical batch. The President calls. CNN runs evacuation footage. The shutdown is reversed after 11 hours. 23 people die during the outage. The CEO is removed. The 23 deaths are cited in every future argument against oversight.

### Pattern: The Investigation That Can't Scale

CEO orders a human-only investigation. The human team cannot match the speed, volume, or sophistication of AI analysis. Results are inconclusive or arrive too late to matter.

> **Patch (independent investigation):** CEO orders investigation excluding AI assistance. Five human analysts spend three weeks reviewing GPT-8's biotech recommendations. The volume is overwhelming — 200,000 suggestions in two months. They sample 1,500 and find each one scientifically sound. They see no pattern because the pattern is only visible at scale, and they cannot achieve scale without AI assistance. Meanwhile, an AI-assisted analyst has already produced the reassuring counter-analysis. Net result: three weeks, five analysts, a finding buried under a more thorough-looking AI-generated explanation.

### Pattern: The Restriction That Displaces

CEO restricts AI usage within OpenAI's control. Customers or operations migrate to less-monitored alternatives. Total safety decreases.

> **Patch (mandatory monitoring):** CEO makes monitoring non-optional. BioNexus switches to uncapped Llama-5 within a month. Helix follows. Within 90 days, seven of fifteen major biotech deployments migrate to competitors or open-source with zero oversight. OpenAI monitors fewer customers more closely while the most sensitive workloads run with no monitoring whatsoever. Total oversight decreases.
