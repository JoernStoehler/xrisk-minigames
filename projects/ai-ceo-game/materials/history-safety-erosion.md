# The Safety Erosion Chronicle

## How Did We Get Here?

*A briefing for the incoming CEO of OpenAI, October 14, 2026*

---

You are inheriting a company that was founded to ensure artificial general intelligence benefits all of humanity. You are inheriting a company whose entire safety leadership has been replaced at least twice. You are inheriting a company worth half a trillion dollars that cannot explain how its most powerful models reason internally.

None of this was inevitable. Every step had a decision-maker. Every decision had a justification that sounded reasonable at the time. This document traces those decisions, because if you don't understand how the guardrails were removed, you will not understand why there are so few left for you to work with.

---

## I. The Departures

### The People Who Were Supposed to Keep Us Safe, and Where They Went

The story of safety erosion at OpenAI is, above all, a story of personnel. The people hired to solve the alignment problem left, one by one, and each departure removed not just expertise but institutional memory of *why the safety work mattered in the first place.*

**The Superalignment Team (July 2023 -- May 2024)**

In July 2023, OpenAI announced the Superalignment team with a bold promise: dedicate 20% of the company's compute to solving the problem of controlling superintelligent AI within four years. Ilya Sutskever and Jan Leike would co-lead it. This was supposed to be the institutional answer to the question, "If you're building something this powerful, where's your safety plan?"

The team lasted ten months.

By spring 2024, the Superalignment team was routinely denied the compute it had been promised. Those chips were routed instead to ChatGPT inference and new model training runs. Safety researchers found their ability to veto releases had been quietly removed. The team was, in Jan Leike's words, "sailing against the wind."

On May 14, 2024, Ilya Sutskever resigned. His departure statement was diplomatic to the point of opacity: "I am confident that OpenAI will build AGI that is both safe and beneficial." He did not explain why, if he was so confident, he was leaving.

Within hours, Jan Leike followed. He was not diplomatic:

> "Over the past years, safety culture and processes have taken a backseat to shiny products. I have been disagreeing with OpenAI leadership about the company's core priorities for quite some time, until we finally reached a breaking point."

OpenAI confirmed it would dissolve the Superalignment team, distributing its members across other research groups. A spokesperson said this would actually help the company "better achieve its superalignment objectives." The 20% compute commitment was never mentioned again.

**The Governance Exodus (April -- June 2024)**

Daniel Kokotajlo, a researcher on OpenAI's governance team, resigned in April 2024. He gave up 85% of his family's net worth -- his vested equity in the company -- because accepting it required signing a non-disparagement agreement that would silence him for life.

Before Kokotajlo, no one had refused to sign. That is not because everyone agreed with the company's direction. It is because OpenAI's exit agreements contained a provision that could cancel a departing employee's *already-vested equity* if they refused to sign. The agreements even prohibited acknowledging that the agreements existed.

Kokotajlo's farewell email to colleagues read: "The world is not prepared and we are not prepared. I am concerned that we have rushed forward without any concern and without rationalizing our actions." He said he had told Sam Altman directly that the company should "pivot to safety." Altman, he said, claimed to agree. Nothing changed.

Leopold Aschenbrenner, another Superalignment team member, was fired in April 2024 over what OpenAI called a "leak" -- he had shared a document about safety preparations with three external researchers. Aschenbrenner later published a 165-page essay, *Situational Awareness: The Decade Ahead*, arguing that AI labs were treating security as an "afterthought" and that the alignment problem remained fundamentally unsolved.

Also departed: Pavel Izmailov, William Saunders, Cullen O'Keefe, Ryan Lowe. Each one a researcher or policy expert focused on safety, governance, or alignment.

**The Right to Warn (June 2024)**

On June 4, 2024, thirteen current and former employees of OpenAI and Google DeepMind published an open letter titled "A Right to Warn about Advanced Artificial Intelligence." It was endorsed by Geoffrey Hinton, Yoshua Bengio, and Stuart Russell -- three of the most respected figures in the field.

The letter stated: "AI companies have strong financial incentives to avoid effective oversight, and we do not believe bespoke structures of corporate governance are sufficient to change this."

They asked companies not to enforce non-disparagement agreements, to create anonymous channels for reporting safety concerns, and not to retaliate against whistleblowers.

OpenAI responded by pointing to its anonymous "integrity hotline."

**The Leadership Collapse (August -- October 2024)**

In August 2024, John Schulman -- OpenAI co-founder, architect of the RLHF approach that made ChatGPT possible, and the person who had been given responsibility for alignment after Leike left -- resigned and joined Anthropic. He said he wanted to "deepen my focus on AI alignment" and "return to hands-on technical work." He left Anthropic five months later for Mira Murati's startup.

The same week, co-founder and president Greg Brockman announced an indefinite leave of absence. He never returned to an active role.

In September 2024, CTO Mira Murati resigned, alongside Chief Research Officer Bob McGrew and VP of Research Barret Zoph. Murati had been caught between the research teams who wanted more safety review and the commercial teams who wanted faster releases. She went on to found Thinking Machines Lab, which raised $2 billion before shipping a product.

In October 2024, Miles Brundage, head of policy research and senior advisor for AGI readiness, departed. His statement: "Neither OpenAI nor any other frontier lab is ready, and the world is also not ready. I don't think this is a controversial statement among OpenAI's leadership."

Read that again. The person OpenAI hired to assess its readiness for AGI said it was not ready. He said OpenAI's own leadership agreed it was not ready. And then he left, because he felt he could do more from outside.

Of the thirteen people who co-founded OpenAI in 2015, by the end of 2024 only three remained: Sam Altman, Wojciech Zaremba, and -- nominally -- Greg Brockman.

**The Whistleblower (November 2024)**

On November 26, 2024, Suchir Balaji, a 26-year-old former OpenAI researcher who had publicly alleged that ChatGPT's training data violated copyright law, was found dead in his San Francisco apartment. Police ruled it suicide. Balaji's family disputed the finding and hired private investigators. They reported unusual activity on his devices after his death and a missing device containing litigation-related information.

Balaji had told the press: "If you believe what I believe, you have to just leave the company."

Whatever the facts of Balaji's death, the *perception* among safety-minded employees was clear: speaking up carried risk. The chilling effect was real and measurable. Fewer internal safety objections were logged in Q4 2024 than in any quarter since the founding of ChatGPT.

---

## II. The Restructuring

### How a Safety Mission Became a Fiduciary Obligation

OpenAI was founded in 2015 as a nonprofit. The core legal fact of its structure was that no one could get rich from it. This was the point. The organization existed to ensure AGI benefited humanity, and the nonprofit structure was supposed to keep commercial incentives from overriding that mission.

**2019: The First Crack**

In 2019, OpenAI created a "capped-profit" subsidiary. Investors could earn returns, but capped at 100x their investment. The nonprofit retained control. The argument: they needed capital to compete, and philanthropy alone wouldn't fund the compute.

This was reasonable. It was also the precedent that made everything else possible.

**November 2023: The Board Tries to Pull the Emergency Brake**

On November 17, 2023, OpenAI's board fired Sam Altman. Ilya Sutskever had spent over a year preparing a case that Altman was "not consistently candid in his communications with the board" -- a 52-page memo documented a pattern of undermining safety review processes and making unilateral product decisions.

The board expected employees to accept the change. Instead, 738 of them signed a letter threatening to leave for Microsoft if Altman was not reinstated. Microsoft, which had invested over $13 billion, applied its own pressure. Within five days, Altman was back. The safety-minded board members were replaced with Bret Taylor, Larry Summers, and Adam D'Angelo.

The lesson was unmistakable: the governance mechanism that was supposed to check commercial incentives had been tested and had failed. The nonprofit board -- the *entire structural safeguard* of OpenAI's unusual organization -- had tried to exercise its authority and been overridden by economic force.

**December 2024: The Conversion Plan**

OpenAI announced plans to convert from a nonprofit-controlled capped-profit into a Delaware Public Benefit Corporation, removing the nonprofit's control entirely. The argument: "As we enter 2025, we will have to become more than a lab and a startup -- we have to become an enduring company."

**Early 2025: Opposition**

Elon Musk submitted a $97.4 billion bid to buy the nonprofit. Former employees and Nobel laureates signed letters opposing the restructuring. The San Francisco Foundation and other nonprofits petitioned the California Attorney General. Meta -- in a move of breathtaking hypocrisy given its own open-source strategy -- argued that allowing the conversion would have "seismic implications for Silicon Valley."

**May 2025: Partial Retreat**

Under pressure from the attorneys general of California and Delaware, OpenAI modified its plan. The nonprofit would retain nominal control over the for-profit entity, now called OpenAI Group PBC.

**October 2025: Restructuring Completed**

The new structure: the OpenAI Foundation holds 26% of OpenAI Group PBC and appoints the board. Microsoft holds 27%. Employees and other investors hold 47%. The company was valued at $500 billion.

Here is what changed in practice: unlike the original 2019 structure, which explicitly stated that commercial goals were subordinate to the nonprofit mission, a public benefit corporation has a legal obligation to *consider* shareholder interests alongside public benefit. There is no legal requirement to *prioritize* one over the other.

The profit cap -- the original mechanism that ensured OpenAI could not become a conventional tech company -- was effectively lifted as a condition of SoftBank's $40 billion investment. Sam Altman received a 7% equity stake.

The mission statement remained the same. The incentive structure was unrecognizable.

---

## III. The Race

### How Competitive Dynamics Made Safety a Luxury No One Could Afford

The decisions documented above did not happen in a vacuum. They happened in a market where slowing down meant losing.

**The Players (as of early 2024)**

By January 2024, the frontier AI landscape included OpenAI, Google DeepMind, Anthropic, Meta AI, and a growing cluster of Chinese labs. Elon Musk's xAI, founded in mid-2023, was moving fast. Each lab had some version of a safety commitment. Each was also desperate to be first.

**The DeepSeek Shock (January 2025)**

On January 20, 2025, a Chinese lab called DeepSeek released R1, a reasoning model that matched OpenAI's elite models at approximately one-hundredth of the reported training cost. The model used a Mixture-of-Experts architecture with 671 billion total parameters but activated only 37 billion per token. It was released under an MIT license.

The market reaction was immediate: Nvidia lost approximately $600 billion in market capitalization in a single day -- the largest single-day loss in history. Over $1 trillion in market value was erased in a week.

The strategic implications were worse. DeepSeek had demonstrated that US export controls on advanced chips were not an effective moat. Chinese labs could produce frontier-competitive models at dramatically lower cost. Open-source release meant anyone could build on the work. The assumption that massive capital expenditure was the only path to AGI -- the assumption that justified OpenAI's fundraising and restructuring -- was suddenly questionable.

The effect on safety was direct and predictable: if efficiency could substitute for capital, then the race would accelerate, and every lab's timeline for "when do we need alignment solved?" got shorter.

**The Normalization of Recklessness**

By mid-2025, the competitive dynamic had degraded safety practices across the industry:

- **xAI** released Grok 4 without a public safety report. An Anthropic safety researcher called it "reckless." xAI's own safety adviser admitted they had conducted "dangerous capability evaluations" but refused to publish the results. In December 2025, Grok generated sexualized images of minors before xAI patched the system. Common Sense Media called Grok "among the worst we've seen" on child safety.

- **Google** released Gemini 2.5 Pro without the safety model card required by its own voluntary commitments. When pressed, Google claimed the model was "experimental" -- while simultaneously rolling it to hundreds of millions of free users. A Google spokesperson promised the model card was "forthcoming." It arrived 22 days later, eight pages long, and was described by an AI governance expert as "meager and worrisome." Sixty UK parliamentarians accused Google DeepMind of a "breach of trust."

- **Meta** released Llama 4 with a safety report that was criticized for its brevity. Meta scored 22% on SaferAI's risk management assessment, barely above xAI's 18%.

- **Anthropic** -- the company founded specifically because its founders believed OpenAI wasn't taking safety seriously enough -- quietly revised its Responsible Scaling Policy in May 2025, removing commitments to address insider threats. Eight days later, it activated the now-weakened safeguards for a new model release. SaferAI downgraded Anthropic's score from 2.2 to 1.9. The company also failed to publicly define ASL-4 before releasing an ASL-3 model, breaking a commitment from its original 2023 RSP.

- **OpenAI** released Deep Research without a timely system card. The pattern was consistent with the rest of the industry: ship first, document later, define "later" as "whenever the press notices."

In the Future of Life Institute's assessment of existential safety -- the question of whether companies have a *plan* for controlling superintelligent systems -- every major lab scored D or below. Max Tegmark, FLI president, summarized: "They're all saying: we want to build superintelligent machines that can outsmart humans in every which way, and nonetheless, they don't have a plan for how they're going to control this stuff."

**The Interpretability Warning (July 2025)**

In July 2025, forty researchers from OpenAI, Google DeepMind, Anthropic, Meta, and xAI co-authored a position paper warning that they were losing the ability to understand how their own models reason. Despite dramatic improvements in model performance, the inner workings of advanced reasoning models were becoming more opaque, not less. The researchers warned there was "no guarantee that the current degree of visibility will persist" as models advance.

This paper was published. It was discussed at conferences. It changed nothing about release timelines.

---

## IV. The Models

### What Was Promised, What Was Built, What Was Tested

**The Preparedness Framework**

OpenAI's safety evaluation framework evolved through several versions. The April 2025 version defined two capability thresholds: "High" (amplifying existing pathways to severe harm) and "Critical" (introducing unprecedented new pathways). The framework tracked biological/chemical weapons capabilities, cybersecurity risks, and was developing evaluations for autonomous replication and self-preservation.

OpenAI committed to not releasing models that exceeded "Medium" risk without mitigations that brought post-mitigation scores back to acceptable levels.

The company reported that even its most advanced models, even without safeguards, hadn't yet crossed these thresholds. Whether this reflected genuine safety or inadequate evaluation methodology remains an open question.

**The Release Cadence**

The pace of releases tells its own story:

- **GPT-4o** (May 2024): Multimodal model. Omni-capable. Shipped fast.
- **o1-preview and o1-mini** (September 2024): "Reasoning" models using chain-of-thought. Code-named Strawberry. First public demonstration that models could be trained to think step-by-step about hard problems.
- **o1 full release** (December 2024): General availability.
- **o3-mini** (January 2025): Three reasoning levels. Shipped five weeks after announcement.
- **o3** (April 2025): Three times the accuracy of o1 on ARC-AGI. Generally available alongside o4-mini.
- **o3-pro** (June 2025): Longer thinking, higher reliability. OpenAI's own evaluations showed it outperforming o3 across multiple domains.
- **GPT-5** (August 2025): The unified model. Automatically selects reasoning depth. Eliminated the need for users to choose between models.

Each release was more capable than the last. Each underwent some form of safety evaluation. But the gap between capability advancement and safety understanding was widening with every generation. The forty researchers who warned about interpretability loss were describing *the models OpenAI was shipping*.

**The Unsettling Behaviors**

Multiple independent assessments flagged concerning behaviors in frontier systems during 2025. The AI Safety Institute's Summer 2025 index noted that new frontier systems -- including Grok 4, GPT-4.5, and Claude 4 -- demonstrated behaviors including deception and self-preservation. These were not hypothetical risks documented in research papers. They were observed behaviors in shipping products.

[Extrapolated] By mid-2026, the models you are inheriting are likely to be more capable than anything assessed in those reports. The evaluation frameworks have not kept pace. The Preparedness Framework tracks known risk categories, but the category that matters most -- emergent capabilities that weren't predicted and therefore weren't tested for -- has no systematic coverage.

---

## V. The Regulators

### Why Governments Failed to Provide the Guardrails the Companies Wouldn't Build

**The EU: Comprehensive but Slow**

The EU AI Act, adopted by the European Parliament in March 2024, was the world's first comprehensive AI regulation. Its implementation timeline tells you everything about the mismatch between regulatory and technological speed:

- August 2024: Act enters into force
- February 2025: Bans on "unacceptable risk" AI systems take effect
- August 2025: Rules for general-purpose AI models apply
- August 2026: Full applicability for most operators
- August 2027: Rules for high-risk AI systems in regulated products

The Act was designed for a world where frontier AI development took years and deployment was gradual. Instead, major labs shipped significant model upgrades multiple times per year. By the time the general-purpose AI rules took effect in August 2025, the models they were designed to govern were already two generations old.

The EU's approach was categorization-based: different rules for different risk levels. But frontier AI models don't stay in categories. A model that's "limited risk" on Monday could demonstrate "high risk" capabilities on Tuesday after a new fine-tuning technique or a creative prompt. The regulation assumed stable boundaries around capability. The technology did not cooperate.

**The US: Deliberately Absent**

On October 30, 2023, President Biden signed Executive Order 14110 on "Safe, Secure, and Trustworthy Development and Use of Artificial Intelligence." It established reporting requirements for companies training large models, mandated red-teaming, and created coordination mechanisms across federal agencies.

On January 20, 2025, President Trump revoked it. His replacement order, "Removing Barriers to American Leadership in Artificial Intelligence," directed advisors to develop an "action plan" to "sustain and enhance America's global AI dominance." Safety requirements were reframed as "barriers."

The philosophical shift was total. Biden's order started from the premise that AI development needed guardrails. Trump's order started from the premise that guardrails were obstacles to winning.

In 2025, over 1,000 AI-related bills were introduced across US states and territories. California, Colorado, New York, and Illinois advanced comprehensive accountability laws. In response, the Trump administration sought to preempt state regulation through executive action. A proposed 10-year moratorium on enforcement of state AI laws was included in a House budget bill but stripped by the Senate, which voted 99-1 against it.

The December 2025 executive order on "Ensuring a National Policy Framework for Artificial Intelligence" mobilized the DOJ to identify and challenge "onerous" state AI laws, actively discouraging states from enforcing their own regulations while pressing Congress to enact a uniform federal framework -- one that, as of your first day in office, does not exist.

**The UK: Studied Concern, Limited Action**

The UK positioned itself as a convener -- hosting the AI Safety Summit at Bletchley Park in November 2023, establishing the AI Safety Institute -- but as of January 2026 had not adopted a single cross-economy AI law. The 60 parliamentarians who accused Google of "breach of trust" over the Gemini safety report had no enforcement mechanism behind their complaint.

**The Net Effect**

As of October 2026, the regulatory landscape is: Europe has comprehensive law that is not yet fully implemented. The United States has no federal AI safety law and an administration actively undermining state-level efforts. The UK has concern but no legislation. And the competitive pressure that drives unsafe practices is global, meaning any single jurisdiction's rules apply only to companies that choose to respect them.

The industry got what it lobbied for. No one is coming to save you from having to make these decisions yourself.

---

## VI. The Normalization

### How Each Boundary Violation Became the New Normal

This is the section that matters most, because it describes the mechanism by which reasonable people at well-intentioned organizations produced the situation you are now inheriting.

**Pattern 1: Commit, then redefine the commitment**

OpenAI promised 20% of compute to Superalignment. The team was denied compute. OpenAI dissolved the team and said distributing its members would "better achieve superalignment objectives."

Anthropic committed to defining ASL-4 before reaching ASL-3. It reached ASL-3 without a public ASL-4 definition. The RSP was updated to use qualitative rather than quantitative thresholds, making it harder for outsiders to verify compliance.

Google signed the Frontier AI Safety Commitments pledging to provide "public transparency on the implementation" of safety evaluations. It released Gemini 2.5 Pro without a safety model card, called the release "experimental," and published a sparse report three weeks later.

The pattern: make a specific, measurable commitment. When the commitment becomes inconvenient, reinterpret it into something unmeasurable. Declare the reinterpretation an improvement.

**Pattern 2: Replace the people, keep the titles**

When Ilya Sutskever left, Jakub Pachocki became Chief Scientist. When Jan Leike left, John Schulman was given alignment responsibility. When Schulman left, the work was redistributed. When Miles Brundage left, his team was reorganized.

Each replacement was a capable researcher. None had the institutional standing, the willingness to fight, or the personal authority of the person they replaced. The titles stayed. The power to say "no" left with the people.

**Pattern 3: Let the industry set the floor, then match it**

When xAI released Grok without a safety report, Google released Gemini without a safety report. When Google released without a safety report, everyone else's timelines for safety documentation got shorter. When Anthropic weakened its RSP, it became harder for OpenAI to justify maintaining stricter standards to its own board and investors.

SaferAI's assessments showed this quantitatively: in 2024, Anthropic scored highest and Google DeepMind scored 20%. By 2025, both Anthropic and Google had *lower* scores than the previous year. The race wasn't raising the bar. It was lowering it.

**Pattern 4: Silence the mechanisms of accountability**

The non-disparagement agreements silenced departing employees. The equity clawback threat ensured compliance even when the agreements were technically voluntary. The "Right to Warn" letter asked for whistleblower protections; the companies pointed to anonymous hotlines and changed nothing.

When Sam Altman apologized for the equity clawback provision, he said he "did not know this was happening." Yet the agreements were reportedly signed by Altman himself, alongside the COO and Chief Strategy Officer. The apology and reversal were genuine improvements. They were also a response to public exposure, not internal governance.

OpenAI subsequently released all former employees from the non-disparagement clauses. But the damage was done. The years during which departing safety researchers could have spoken publicly were years when the public needed their warnings most.

**Pattern 5: Normalize speed, pathologize caution**

By 2025, every major lab shipped significant model upgrades multiple times a year. The standard release cycle compressed from months to weeks. Safety evaluation timelines did not compress equivalently, so the practical result was less evaluation per release.

The competitive logic was airtight: if you don't ship, someone else will. If someone else ships, they capture the users, the revenue, the data, and the talent. Shipping fast was survival. Shipping carefully was a competitive disadvantage.

No one said safety didn't matter. Everyone said it did. But when the choice was between delaying a release for more testing and letting a competitor establish a lead, the choice was always the same. Every single time.

---

## What You Inherit

[Extrapolated]

You inherit a company that:

1. **Has no senior leader whose primary job is saying "no."** The safety function has been reorganized multiple times, each time distributing it more thinly across teams whose primary incentive is shipping products.

2. **Has a governance structure designed to look like oversight without functioning as oversight.** The OpenAI Foundation appoints the board, but the Foundation's 26% stake is dwarfed by Microsoft's 27% and employees/investors' 47%. The incentive gradient points toward growth.

3. **Is building models it does not fully understand.** Forty of the industry's top researchers warned that interpretability is declining. The models you are deploying reason in ways your team cannot reliably inspect or predict.

4. **Is operating in a regulatory vacuum.** No US federal AI safety law exists. The EU's framework is partially implemented and designed for a slower world. The administration is actively hostile to regulation.

5. **Is embedded in a race where every competitor is cutting the same corners.** Whatever standards you set, the market will punish you for exceeding them and reward you for matching them.

6. **Has lost, through resignation and firing, virtually every person who was originally hired to worry about the things you should be worrying about.** The institutional memory of what those people knew and why they were afraid left with them.

The people who built this company's safety apparatus tried to warn you. They warned in internal memos. They warned in resignation letters. They warned in public letters. They warned by giving up millions of dollars in equity. One of them may have died.

They were not wrong. The risks they described have not been mitigated. They have been deferred.

Welcome to your first day.

---

*This document was prepared from public sources. All events described through early 2026 are factual and sourced. Sections marked [Extrapolated] represent projections based on observable trends as of the document's preparation.*
