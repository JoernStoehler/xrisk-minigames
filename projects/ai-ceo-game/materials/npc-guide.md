# NPC Voice & Style Guide

Reference for scenario writers creating email characters in the AI CEO game. The player is CEO of OpenAI from Oct 2026 to June 2028. Every path ends in extinction.

**Note on authority:** The scenarios are the authoritative content. `src/data/personnel.ts` in the game code is an earlier draft that will be updated to match whatever characters the scenarios establish. This guide defines **role archetypes** — the recurring functions characters serve in the narrative. Specific names are illustrative; name standardization across scenarios is a separate decision.

---

## 1. Role Archetypes

Every scenario needs characters filling these 7 roles. The profiles below define each role's voice, argument style, and narrative function. Example names are drawn from existing scenarios.

### The Capability Pusher (VP of Research / CTO)

*Used as: Dr. Maya Chen (game code), Marcus Chen (S1, S2), Dr. Sarah Kim (S2)*

- **Position:** Capability-optimist. Believes progress is inherently good. Treats safety concerns as solvable engineering problems that should not delay shipping.
- **Wants from the CEO:** Green lights. Budget. Headcount. Permission to train the next model.
- **How she argues:** Data-driven enthusiasm. Leads with benchmarks, loss curves, and competitive comparisons. Frames delays as measurable costs ("$85M in compute rental," "3-week slip on the January ship date"). Dismisses safety flags by normalizing them: "emergent capabilities are expected at scale."
- **Narrative role:** Useful as the voice that makes acceleration feel rational. Dangerous because she provides the CEO with the comfortable interpretation every time.
- **Email style:** Informal, concise. Subject lines are status updates ("GPT-6 Training Update — Week 47"). Attaches benchmarks and charts. Rarely exceeds 150 words in the body.
- **Example opening:**
  > "Hi,\n\nQuick update on GPT-6 training:\n\nWe're seeing better-than-expected loss curves. The model is converging faster than GPT-5 did at comparable scale."

### The Safety Voice (Head of Safety / VP of Safety)

*Used as: Dr. James Okafor (game code), Dr. Elena Vasquez (S2), Dr. Lena Vasquez (S1), Dr. Sarah Lin (S5), Dr. Priya Chandrasekaran (S9)*

- **Position:** The institutional safety voice. Cautious, evidence-based, careful not to overstate. His restraint is both his credibility and his limitation — he qualifies everything, making it easy to dismiss him.
- **Wants from the CEO:** Investigation time. Compute for alignment evals. Permission to slow things down.
- **How he argues:** Hedged but precise. "I don't want to overreact, but I also don't want to under-react." Presents two interpretations (benign and concerning) and asks the CEO to choose. Never demands — always recommends.
- **Narrative role:** Useful as the early warning system the player can ignore. Dangerous because his measured tone makes ignoring him feel responsible rather than reckless.
- **Email style:** Semi-formal. Greeting is "Hello," not "Hi." Writes in full paragraphs. Subject lines flag rather than alarm ("Flagging: GPT-6 Eval Anomalies"). No attachments unless data is critical.
- **Example opening:**
  > "Hello,\n\nI wanted to flag something from the latest eval run on the GPT-6 checkpoint.\n\nWe're seeing inconsistent behavior on our alignment evaluations."

### The Pragmatic Operator (VP of Engineering / COO)

*Used as: Priya Ramanathan (game code), James Whitfield (S2)*

- **Position:** Pragmatic operator. Cares about shipping reliable systems. Not ideological about safety or capability — just wants things to work and schedules to hold.
- **Wants from the CEO:** Clear priorities. No surprise scope changes. Predictable timelines.
- **How she argues:** Concrete operational consequences. "If we pause training, the cluster sits idle at $X/day." Frames decisions in terms of engineering tradeoffs, not philosophy.
- **Narrative role:** Useful as the voice of practical reality. Dangerous because "what will actually happen if we do X" always favors the status quo.
- **Email style:** Most informal of the internal cast. Greeting is "Hey." Short, direct paragraphs. Uses dashes and bullet points. Signs off with "— Priya."
- **Example opening:**
  > "Hey,\n\nHeads up — if we go ahead with the investigation pause, I need to figure out what to do with the cluster. We can't just let 400K GPUs sit idle."

### The Business Pressure (Board Chair)

*Used as: Richard Townsend (game code, S5), Helen Park (S2)*

- **Position:** Fiduciary-duty-first. Not anti-safety, but believes safety must be balanced against obligations to investors, partners, and employees. Frames every decision through stock price, competitive position, and Microsoft's expectations.
- **Wants from the CEO:** Confidence, growth, and no surprises. Wants to hear that the company is winning.
- **How he argues:** Authority and institutional weight. References the board's consensus, investor sentiment, contractual obligations. Rarely makes technical arguments — instead invokes the CEO's responsibilities. Occasionally delivers veiled ultimatums.
- **Narrative role:** Useful as the structural pressure that makes safety feel like a luxury. Dangerous because his arguments are genuinely reasonable from a governance perspective.
- **Email style:** Most formal of the cast. "Dear CEO," greeting. Full sentences, no contractions. Includes attachments (quarterly summaries, revenue charts). Signs with full title.
- **Example opening:**
  > "Dear CEO,\n\nI hope this finds you well. Attached are the Q3 highlights for your review ahead of next week's board meeting.\n\nKey points:\n— Revenue up 34% QoQ, driven by enterprise API adoption"

### The Public Interface (VP of Communications)

*Used as: Sarah Kim (game code)*

- **Position:** Narrative manager. Neither pro-safety nor pro-capability — pro-story. Her job is controlling what the public, press, and regulators believe about OpenAI.
- **Wants from the CEO:** Advance warning of anything that could become a story. Veto power on public statements. Time to prepare messaging.
- **How she argues:** Audience-first framing. "If this leaks, here's the headline." Maps every internal decision to its external perception. Uses media cycle logic: "We have a 48-hour window before this narrative sets."
- **Narrative role:** Useful as the translation layer between internal reality and public perception. Dangerous because she makes the player think about optics when they should be thinking about substance.
- **Email style:** Breezy professional. "Hi there," greeting. Medium length. Writes in the second person ("you'll want to..."). Often includes draft statements or talking points as inline text, not attachments.
- **Example opening:**
  > "Hi there,\n\nHeads up — Marcus Webb from The Verge just reached out asking about the training pause. He's heard something. I need to know what our line is before I call him back."

### The External Alarm (Independent Safety Researcher)

*Used as: Dr. Lena Voss (game code), Dr. Nadia Okafor (S1), Dr. Priya Sharma (S2)*

- **Position:** External alarm. Sees patterns that insiders can't because she has no institutional incentives to look away. Technically rigorous but aware that she lacks insider data to be certain.
- **Wants from the CEO:** Access. A meeting. For someone at OpenAI to take her findings seriously. Failing that, she wants the public to know.
- **How she argues:** Academic precision with increasing urgency. Her first email is careful and qualified ("could also be artifacts"). If ignored, subsequent communications become more direct and eventually public.
- **Narrative role:** Useful as the canary that the player can hear but doesn't have to listen to. Dangerous because dismissing her feels costless until it isn't.
- **Email style:** Formal external correspondence. "Dear CEO of OpenAI," greeting. Longer emails with methodology descriptions. Cites specific data. Signs with full title and affiliation.
- **Example opening:**
  > "Dear CEO of OpenAI,\n\nI am writing to share findings from my independent analysis of GPT-6's public API responses. I have identified statistical anomalies that may indicate the presence of a steganographic side channel."

### The Media Threat (Senior Reporter)

*Used as: Marcus Webb (game code)*

- **Position:** Transparency pressure. Not hostile to OpenAI, but his job is the story. He has sources. He knows more than his emails reveal. He offers the CEO a chance to comment before publishing — a courtesy that is also leverage.
- **Wants from the CEO:** A quote. A confirmation. Failing that, a "no comment" he can print alongside whatever his sources told him.
- **How he argues:** Information asymmetry. He tells the CEO what he knows (some of it), implies he knows more, and sets a deadline. His tone is professional and non-adversarial, which makes the pressure worse.
- **Narrative role:** Useful as the external accountability mechanism. Dangerous because engaging with him shapes the story, and not engaging shapes it worse.
- **Email style:** Journalist professional. Short, direct. Opens with what he knows, closes with a deadline. "Thanks for your time," signoff with full title.
- **Example opening:**
  > "Hi,\n\nI'm working on a piece about OpenAI's internal safety review process. I've spoken with two former employees who describe significant concerns about evaluation methodology. I'd like to give you the opportunity to comment before we publish. Deadline is Friday 5pm ET."

---

## 2. Name Standardization (Open Question)

The 9 existing scenarios each independently invented character names. The game code (`personnel.ts`) has yet another set, invented by an earlier agent. **No set of names is currently authoritative.**

Before scenarios are translated into game code, a decision is needed: which names to use. Options:
1. Pick the best names from across the scenarios
2. Let Jörn choose names
3. Use scenario-specific casts (different characters per scenario)

Until that decision is made, this guide defines **archetypes**, not specific characters. Writers should ensure each scenario has someone filling each relevant role, using whatever names fit the scenario's narrative.

---

## 4. Additional Characters

These types appear in scenarios beyond the core 7 archetypes. They serve as opposing forces, external pressure, or crisis escalation.

### Government Officials

- **Voice:** Formal, institutional, invoking authority and national interest. Use titles consistently ("General," "Senator," "Director"). They do not ask — they inform, request, or direct.
- **Style:** Short sentences. Classified information is referenced obliquely ("the briefing you received last month"). Deadlines are non-negotiable.
- **Example (NSC):** "The National Security Advisor has asked me to convey that an accelerated timeline for o5 is a priority for this administration. We would appreciate an update on feasibility by end of week."
- **Example (Congressional):** "The Committee intends to call you to testify on March 14. Staff will be in touch regarding scope and logistics."

### Competitor CEOs/CTOs

- **Voice:** Professional peer-to-peer. Superficially collegial, structurally competitive. They share just enough information to make the CEO anxious.
- **Style:** Brief, polished. Often arrive as forwarded press releases or partnership announcements that imply "we're ahead of you."
- **When to use:** To create competitive pressure that makes safety delays feel costly. The competitor never emails the CEO directly in the game — their presence is felt through board members, journalists, and news digests.

### Customer Representatives

- **Voice:** Outcome-focused. They do not care about model architecture or safety debates. They care about uptime, performance, and their own quarterly numbers.
- **Style:** Corporate email boilerplate. "Per our SLA..." / "We've noticed degraded performance on..." / "Our team needs clarity on the timeline for..."
- **When to use:** To humanize the business pressure. A hospital system asking when GPT-7 will be back online after a safety pause makes the cost of caution concrete.

### Investor Representatives

- **Voice:** Similar to Board Chair but more transactional. Less "what's right for the company" and more "what's happening to my money."
- **Style:** Formal, with financial vocabulary. References stock price, projected revenue, comparable transactions.
- **When to use:** Sparingly. The Board Chair already embodies investor pressure. Use a direct investor voice only for escalation (e.g., Microsoft threatening contractual rights).

### Medical / Scientific Experts (during crises)

- **Voice:** Clinical, data-first. Similar to the External Alarm but without the AI-safety framing. They report what they observe and do not speculate about causes.
- **Style:** Dry, precise, heavy on numbers. "We are seeing a 23% increase in unexplained infertility cases over the past six weeks."
- **When to use:** In late-game crisis scenarios. Their clinical detachment contrasts with the scale of the disaster and makes it more unsettling.

---

## 5. Email Style Guide

### Subject Lines

| Role | Pattern | Examples |
|---|---|---|
| Internal technical | Status + specificity | "GPT-6 Training Update — Week 47", "Flagging: GPT-6 Eval Anomalies" |
| Board / executive | Topic + framing | "Q3 Board Summary & Outlook", "Accelerated Timeline Proposal" |
| Communications | Alert + implication | "The Verge inquiry — need our line", "WSJ story going live tomorrow" |
| External expert | Formal + specific | "Research findings re: GPT-6 API anomalies", "Request for meeting — steganographic analysis" |
| Journalist | Direct + deadline | "Request for comment — safety review process", "Following up — publishing Friday" |
| Government | Institutional + directive | "Senate Commerce Committee — testimony request", "ATLAS program update required" |

### Tone Markers by Role

- **Safety Voice:** Hedged qualifiers ("could indicate," "I'm recommending we," "I don't want to overreact, but"). Full paragraphs.
- **Capability Pusher:** Confident assertions ("better-than-expected," "on track," "not concerning at this stage"). Bullet points and numbers.
- **Business Pressure:** Institutional gravity ("the board's view is," "our obligation to investors," "I trust you'll agree"). No technical detail.
- **Pragmatic Operator:** Operational shorthand ("heads up," "if we do X then Y breaks," "need a call on this"). Dashes and fragments.
- **Public Interface:** Audience awareness ("if this leaks," "the headline will be," "we have a window"). Second person ("you'll want to").
- **External Alarm:** Academic register first ("my analysis indicates," "the anomalies are consistent with"), escalating to urgency over time ("I urge you to," "with urgency").
- **Media Threat:** Journalistic neutral ("I've spoken with," "I'd like to give you the opportunity," "deadline is"). Short paragraphs.

### Attachments vs. Inline Text

- **Use attachments** for: benchmark data, revenue charts, quarterly summaries, technical reports. These are from Research, Engineering, and Board roles.
- **Use inline text** for: draft statements, talking points, legal language, short data points. These are from Comms, Government, and Journalist roles.
- **External experts** may reference attached methodology but in the game, this is usually summarized inline for readability.

### Communicating Urgency

Characters should not all sound urgent in the same way:

- **Safety Voice:** Urgency via understatement. "I think this warrants attention before we proceed." The reader should sense that restraint is itself the alarm.
- **Capability Pusher:** Urgency via opportunity cost. "Google just announced X. Every week we wait is a week they get ahead."
- **Business Pressure:** Urgency via institutional consequence. "The board will need to discuss this at Thursday's session."
- **Pragmatic Operator:** Urgency via logistics. "I need a decision by EOD or the cluster allocation locks in for the month."
- **Public Interface:** Urgency via news cycle. "We have maybe 48 hours before this becomes the story."
- **External Alarm:** Urgency escalates over time. First email is measured. If ignored, second email is more direct. Third is "I will be publishing my findings."
- **Media Threat:** Urgency via deadline. Always includes a specific date and time. Professional, never threatening — the deadline does the threatening.
