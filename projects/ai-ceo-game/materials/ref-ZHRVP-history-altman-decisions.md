# The Reasonable Man: Sam Altman's Decision Points, January 2024 -- October 2026

*A backstory document for the AI x-risk inbox simulator. The player becomes CEO of OpenAI on October 14, 2026. This document traces how Sam Altman's individually rational decisions collectively created the situation the player inherits.*

---

## Prologue: The Logic of Each Step

Every decision Sam Altman made between January 2024 and October 2026 was defensible. Most were arguably correct, given his information and incentives at the time. A different CEO in the same chair would likely have made the same calls.

That is exactly the problem.

The trap is not that bad people make bad decisions. The trap is that the structure of the situation -- competitive pressure, investor expectations, geopolitical framing, the sheer momentum of a $700 billion enterprise -- makes each individual step feel reasonable while the cumulative trajectory becomes terrifying. By the time you realize where all the reasonable steps have taken you, the decisions that could have changed the path are years behind you.

Sam Altman did not set out to build something dangerous. He set out to build something extraordinary, and he believed -- perhaps still believes -- that building it fast and building it first was the safest option available. History will judge whether he was right. But the player of this game does not have the luxury of waiting for history. They are sitting in his chair, inheriting his momentum, and facing their own set of reasonable decisions.

---

## Moment 1: The Consolidation

**January -- March 2024**
*Context: Altman has just survived the most dramatic CEO firing and reinstatement in Silicon Valley history. The board that tried to remove him in November 2023 has been almost entirely replaced.*

### What Happened

The old board -- Helen Toner, Tasha McCauley, and the others who voted to fire Altman -- is gone. In their place: Bret Taylor (former Salesforce co-CEO) as chairman, Larry Summers (former Treasury Secretary), and Adam D'Angelo as the sole holdover. Microsoft gets a non-voting observer seat.

In January 2024, an independent review by WilmerHale examines over 30,000 documents and conducts dozens of interviews. By March, the review concludes with full confidence in Altman's leadership. His board seat is restored. The governance "crisis" is officially over.

The new board is prestigious, connected, business-savvy. What it is not, compared to its predecessor, is safety-focused. The old board included AI researchers and people whose explicit mandate was to check whether OpenAI was moving too fast. The new board includes people whose expertise is in scaling companies and navigating Washington.

### What Sam Decided

He accepted a board composed of allies and business operators. He did not push for independent safety voices or for reinstating the structural tension the old board was designed to provide.

### What the Alternative Was

He could have insisted on at least one board member whose primary expertise and loyalty was to AI safety -- someone with the independence and mandate to say "slow down." He could have treated the board crisis as evidence that the governance structure needed strengthening, not weakening.

### Why His Choice Was Rational

The old board had just tried to fire him in what most observers viewed as a botched, poorly communicated coup. Nearly all 770 employees had signed a letter demanding his return. Microsoft, OpenAI's largest investor, had been blindsided. The lesson the market drew was clear: the nonprofit governance structure was a liability, not an asset. Building a board that would provide stability, attract investors, and never repeat the November crisis was the obvious move.

### What It Cost

The one institutional mechanism that had ever actually tried to slow OpenAI down -- a board with the power and inclination to prioritize safety over speed -- was dismantled and replaced with one optimized for growth. The people who had taken the most dramatic safety-motivated action in AI history were not vindicated; they were exiled. The message to everyone inside and outside OpenAI was unmistakable: challenging the CEO on safety grounds is career suicide.

---

## Moment 2: The Quiet Departure

**May 2024**
*Context: OpenAI's Superalignment team, founded in July 2023 with a promise of 20% of the company's computing resources, has been struggling for months.*

### What Happened

On May 14, Ilya Sutskever -- OpenAI's co-founder and chief scientist, the person most responsible for the technical insights behind GPT -- announced he was leaving. He had been one of the board members who voted to fire Altman in November. After the reinstatement, he signed the employee letter calling for Altman's return. But something had broken. He left to found Safe Superintelligence Inc., a company whose name is its mission statement.

The next day, Jan Leike, co-lead of the Superalignment team, resigned. His public statement was blunt: "Over the past years, safety culture and processes have taken a backseat to shiny products." He said his team had been "struggling for compute" -- the 20% allocation that Altman had promised had never materialized. Leike went to Anthropic.

Rather than appoint new leaders for the Superalignment team, OpenAI dissolved it entirely. The team's work was "integrated more deeply across research efforts." Jakub Pachocki replaced Sutskever as chief scientist.

### What Sam Decided

He let them go. He did not fight to keep Sutskever or Leike. He did not honor the 20% compute commitment. When the team's leaders left, he disbanded the team rather than rebuilding it.

His public response to Leike's criticism: "He's right we have a lot more to do. We are committed to doing it."

### What the Alternative Was

He could have delivered on the 20% compute promise. He could have made a serious effort to retain Sutskever and Leike -- or at minimum, maintained the Superalignment team as a standalone entity with real resources and real authority. He could have treated the departures as a crisis rather than a personnel transition.

### Why His Choice Was Rational

Sutskever had participated in trying to fire him. The relationship was irreparable. Leike's public criticism was embarrassing but manageable -- a social media cycle, not a structural threat. The Superalignment team's work was genuinely speculative: alignment research for systems that do not yet exist, consuming resources that could be used to ship products that generate revenue. With competitors like Google, Anthropic, and Meta racing forward, every GPU allocated to theoretical alignment work was a GPU not training the next model. And "integrating safety across all teams" sounds responsible -- perhaps even more responsible than siloing it in one group.

### What It Cost

OpenAI lost the two people most qualified and most motivated to solve the alignment problem from inside the company. The 20% compute promise -- perhaps the most concrete safety commitment OpenAI had ever made -- was revealed as empty. The message, again, was legible to everyone watching: safety work that slows down product development will not be resourced. The people who care most about safety will leave, and the company will move on without them.

Over the following months, the departures continued: co-founder John Schulman left for Anthropic. In September, CTO Mira Murati, research chief Bob McGrew, and research VP Barret Zoph all departed on the same day. In October, Miles Brundage, senior advisor for "AGI Readiness," resigned, and his team was disbanded too.

By the end of 2024, OpenAI had lost roughly half of its senior safety-focused researchers. Each departure was individual. None was a scandal. Collectively, they represented an institutional lobotomy of OpenAI's safety capacity.

---

## Moment 3: The Silencing (and the Apology)

**May -- June 2024**
*Context: In the wake of the safety team departures, reporting reveals that OpenAI's exit agreements contained provisions that could claw back departing employees' vested equity if they spoke critically about the company.*

### What Happened

Vox reported that hundreds of leaked documents showed a pattern of high-pressure tactics: departing employees were given as little as a week to sign ultra-restrictive non-disparagement and non-disclosure agreements or risk losing equity worth millions of dollars. Some of these provisions bore Altman's own signature, along with those of other senior executives.

William Saunders, a safety researcher who left in February 2024, described the stakes: "By speaking to you I might never be able to access vested equity worth millions of dollars." He spoke publicly anyway.

In June, thirteen current and former employees signed an open letter -- "A Right to Warn About Advanced Artificial Intelligence" -- calling for whistleblower protections. Geoffrey Hinton, Yoshua Bengio, and Stuart Russell endorsed it. Whistleblowers filed a complaint with the SEC alleging OpenAI had illegally barred employees from warning regulators.

### What Sam Decided

When the equity clawback provisions became public, Altman apologized. He posted on X that he was "genuinely embarrassed" and said he "did not know this was happening." OpenAI released former employees from the non-disparagement clauses, committed to not enforcing them, and removed the language from future exit agreements. The company also equalized tender offer terms for current and former employees.

### What the Alternative Was

He could have caught this earlier -- or never allowed it to happen in the first place. The provisions bore his signature. The alternative was an organizational culture where safety researchers could leave and speak freely without financial coercion, from the start.

### Why His Choice Was Rational

The apology and reversal were textbook crisis management. Altman appeared contrite, acted quickly, and turned a negative story into a narrative of accountability and reform. The structural incentive for the clawback provisions was also clear: OpenAI was sitting on technology with national-security implications, and aggressive NDAs are standard in such contexts. Whether Altman personally knew every clause is plausible either way -- CEOs often do not read every HR document. His response, once informed, was swift.

### What It Cost

For the years the provisions were in effect, they worked as intended: safety researchers who left OpenAI were financially pressured into silence during the exact period when their concerns would have been most relevant to the public and to regulators. The apology came after the damage was done. And the episode demonstrated a pattern: OpenAI would make commitments (20% compute, open culture, safety-first), quietly fail to honor them, and then apologize when caught -- while the underlying incentive structure remained unchanged.

---

## Moment 4: The Military Pivot

**January -- December 2024**
*Context: OpenAI's usage policy has always prohibited military applications. Then, quietly, that changes.*

### What Happened

On January 10, 2024, OpenAI edited its usage policies. The previous language explicitly banned use for "weapons development" and "military and warfare." The new language prohibited use to "harm yourself or others" -- a much vaguer standard that no longer specifically excluded military use.

OpenAI said it would work with the Pentagon on cybersecurity software, "but not on weapons."

By December, OpenAI partnered with Anduril, a defense-tech company that manufactures AI-powered drones, radar systems, and missiles, to build counter-drone systems. OpenAI would help build AI models that "rapidly synthesize time-sensitive data, reduce the burden on human operators, and improve situational awareness."

By June 2025, OpenAI won a $200 million Pentagon contract to "develop prototype frontier AI" for "both warfighting and enterprise domains." OpenAI's chief product officer and former chief research officer were sworn in as military reservists.

### What Sam Decided

He approved the removal of the explicit military ban. He greenlit the Anduril partnership and the Pentagon contract. He positioned OpenAI as a defense partner.

### What the Alternative Was

He could have maintained the explicit ban on military use. He could have drawn a bright line: OpenAI technology does not go into weapons systems or their supporting infrastructure, period.

### Why His Choice Was Rational

The national security argument is powerful and sincere. If advanced AI is going to be used by militaries -- and it obviously is -- then it is arguably better for it to be American AI, built with safety considerations, than Chinese AI or Russian AI with none. The counter-drone mission is genuinely defensive. The Pentagon contract focuses on administrative efficiency and cybersecurity. OpenAI's policy still prohibits autonomous weapons and lethal operations. And the $200 million in revenue does not hurt.

The geopolitical framing became even more compelling after DeepSeek's emergence: if America does not lead in AI, China will, and China's AI will not have safety committees.

### What It Cost

A bright line was erased and replaced with a gradient. "No military use" is clear. "No use that harms people" is subject to interpretation -- and the interpreter is the company receiving $200 million from the Defense Department. The Anduril partnership explicitly supports systems designed to destroy physical objects (drones). The contract covers "warfighting domains." Each step was modest; the trajectory was from "we never work with militaries" to "we are a defense contractor" in eighteen months.

Mission creep in military applications is not a theoretical risk. It is the historical norm.

---

## Moment 5: The Restructuring

**September 2024 -- October 2025**
*Context: OpenAI is burning cash -- losses projected at $5 billion in 2024, rising toward $14 billion by 2026. It needs massive capital to compete. The nonprofit structure constrains fundraising.*

### What Happened

In September 2024, Bloomberg reported that OpenAI was discussing giving Altman a 7% equity stake -- worth roughly $10.5 billion -- as part of a conversion to a for-profit entity. Altman told employees there were "no plans" for a "giant equity stake." In December, OpenAI formally announced it would restructure: the nonprofit would lose control of the for-profit subsidiary, which would convert to a Delaware Public Benefit Corporation.

The backlash was fierce. The nonprofit Encode argued that "the public interest would be harmed by a safety-focused, mission-constrained nonprofit relinquishing control over something so transformative at any price." Former employees, academics, and activists published an open letter titled "Not For Private Gain." California and Delaware attorneys general pushed back.

In May 2025, OpenAI reversed course -- partially. The nonprofit would retain control. But the for-profit still became a PBC, and the nonprofit's effective stake shrank to 26% (worth $130 billion at then-current valuations). Microsoft took 27%. Employees and other investors held 47%.

By October 2025, the restructuring was finalized. The nonprofit was renamed the OpenAI Foundation. A Safety and Security Committee remained, nominally independent. But critics noted that all but two board members served on both the Foundation and the PBC boards. "I don't see how having the power to fire yourself constitutes meaningful control," one observer wrote.

In the end, Altman received no equity. He continued earning $76,001 per year while leading a company valued at $500 billion.

### What Sam Decided

He drove the restructuring to unlock capital. He accepted the compromise structure under regulatory pressure. He declined personal equity.

### What the Alternative Was

He could have maintained full nonprofit control and sought capital within that structure -- harder, slower, but preserving the governance mechanism that had originally been designed as a check on exactly the kind of racing behavior OpenAI was now engaged in.

### Why His Choice Was Rational

OpenAI needed tens of billions of dollars to compete. The Stargate project alone was a $500 billion commitment. SoftBank, Microsoft, and other investors were not going to funnel that kind of capital into a structure where a nonprofit board could, at any moment, decide to shut everything down for safety reasons -- as the old board had literally tried to do. The PBC structure is a real legal form with real obligations to consider stakeholder interests. The Foundation retains a $130 billion stake and board authority. And Altman's decision to take no equity was a genuine signal of mission alignment.

### What It Cost

The one structural mechanism that made OpenAI different from any other tech company -- a nonprofit with genuine authority to prioritize humanity's interests over shareholder returns -- was reduced to a 26% minority stake with overlapping board membership. The "stop and assist" clause in OpenAI's charter, which committed the company to help a competitor if that competitor was closer to safe AGI, became legally unenforceable in the new structure. The transformation was, as critic Zvi Mowshowitz argued, a transfer of hundreds of billions in value from a mission-driven entity to profit-seeking investors. But it happened gradually enough, and with enough compromise, that no single step looked like betrayal.

---

## Moment 6: The Acceleration

**January -- August 2025**
*Context: DeepSeek, a Chinese AI lab, releases R1 -- an open-source model rivaling OpenAI's best, at a fraction of the cost. Trump calls it a "wake-up call." Stock markets shudder.*

### What Happened

DeepSeek's emergence reframed the AI race as a geopolitical contest. Marc Andreessen called it "one of the most amazing and impressive breakthroughs" he had ever seen. Sam Altman's response was immediate: "We will obviously deliver much better models and also it's legit invigorating to have a new competitor! We will pull up some releases."

Internally, release timelines compressed. The Financial Times reported that safety evaluators were given days -- sometimes less than a week -- to test new models, compared to the six months afforded for GPT-4 in 2023. GPT-4.1 shipped without a public safety report or system card, an industry first for OpenAI. The company said it was "not a frontier model" and therefore did not require one.

Meanwhile, Altman stood next to President Trump at the White House to announce the Stargate project: $500 billion in AI infrastructure, with SoftBank providing financial responsibility and OpenAI providing operational responsibility. Altman donated $1 million to Trump's inaugural committee. Trump, hours earlier, had rescinded Biden's executive order on safe AI development.

By August, GPT-5 launched. OpenAI described it as its most capable model yet. Two weeks later, DeepSeek released an update matching GPT-5 on key benchmarks.

### What Sam Decided

He accelerated. He pulled forward release timelines. He compressed safety testing. He partnered with a president who had just removed the only federal AI safety framework. He framed the competition as America vs. China.

### What the Alternative Was

He could have maintained safety testing timelines regardless of competitive pressure. He could have publicly committed to a minimum evaluation period for frontier models. He could have declined to celebrate the rollback of Biden's AI safety executive order.

### Why His Choice Was Rational

The competitive pressure was real and intense. DeepSeek demonstrated that compute efficiency could substitute for compute scale, threatening OpenAI's primary advantage. If OpenAI slowed down and a Chinese lab achieved AGI first, the safety consequences could be catastrophic -- a system with no democratic oversight, no alignment research, no whistleblower protections. From this perspective, racing faster *is* the safety play: better for the most safety-conscious lab to win than to cede the field.

The Stargate partnership was a $500 billion infrastructure commitment that could not happen without government support. That meant working with the actual government, not the hypothetical one you might prefer. And the geopolitical framing was genuinely compelling to policymakers on both sides of the aisle.

### What It Cost

Safety testing went from months to days. The federal safety framework was dismantled with OpenAI's tacit blessing. The company's public messaging shifted from "we will go as slowly as safety requires" to "we will pull up some releases." The competitive dynamic that OpenAI had always warned about -- the race to the bottom where safety is sacrificed for speed -- was now something OpenAI was actively participating in rather than trying to prevent.

Former safety researcher Steven Adler captured the dilemma as he departed: "An AGI race is a very risky gamble, with huge downside. No lab has a solution to AI alignment today. And the faster we race, the less likely that anyone finds one in time."

Former researcher Daniel Kokotajlo added: "There's no law saying they have to tell the public about what their models can really do... And they're all in a rush."

---

## Moment 7: The Goalpost Shift

**August -- December 2025**
*Context: OpenAI's charter defines AGI as "highly autonomous systems that outperform humans at most economically valuable work." The company's agreement with Microsoft stipulates that Microsoft loses access to OpenAI's models once AGI is achieved. OpenAI is projecting $14 billion in losses for 2026 and expects no profit until 2029.*

### What Happened

In January 2025, Altman wrote on his blog: "We are now confident we know how to build AGI as we have traditionally understood it." He predicted AGI could arrive during Trump's presidential term. By August, after GPT-5's release, he pivoted: "I think it's not a super useful term." By December, he claimed AGI had perhaps already "whooshed by" without anyone noticing, and proposed that the real milestone worth tracking was superintelligence.

He offered a new definition: "A candidate definition for superintelligence is when a system can do a better job being President of the United States, CEO of a major company, or a scientist running a very large lab than any person can even with the assistance of AI."

In October, he announced internal goals: an "automated AI research intern" by September 2026, running on hundreds of thousands of GPUs. A "true automated AI researcher" by March 2028. Chief scientist Jakub Pachocki stated that superintelligence might be "less than a decade away."

### What Sam Decided

He redefined the goalposts. As OpenAI's systems approached what most people would call AGI, he moved the definition further out -- first suggesting the term was not useful, then claiming it had already passed without consequence, then pivoting to superintelligence as the real target.

### What the Alternative Was

He could have acknowledged clearly and publicly: "Our systems now meet the definition of AGI as stated in our charter. Here is what that means for our governance, our commitments, and our relationship with Microsoft."

### Why His Choice Was Rational

The financial implications of declaring AGI were enormous. Under the Microsoft agreement, AGI achievement would trigger the loss of OpenAI's most important commercial partnership. With $14 billion in projected losses and no path to profitability until 2029, this was not an abstract concern. Additionally, Altman's argument that AGI is a "sloppy term" is genuinely shared by many researchers -- the line between very capable AI and "true" AGI is fuzzy, and reasonable people disagree about where it falls.

Reframing around superintelligence also served a narrative purpose: it maintained urgency, justified continued investment, and positioned OpenAI as still early in its journey rather than arriving at a destination that might trigger calls for slowdown.

### What It Cost

The charter's definition of AGI was meant to be a tripwire -- a point at which extraordinary caution would kick in. By declaring the tripwire meaningless as the company approached it, Altman ensured that no governance mechanism would ever be triggered, no matter how capable the systems became. The goalposts will always be further ahead. The moment of "now we need to be really careful" will never arrive, because the definition of "really capable" will always be updated to be just beyond whatever the current system can do.

This is the most structurally dangerous of all the patterns: not a single decision, but a meta-decision to ensure that no safety trigger is ever pulled.

---

## Moment 8: The Frontier of Capability

**Late 2025 -- Early 2026**
*Context: GPT-5 and its derivatives (5.1, 5.2, 5.2-Codex) represent a step change in capability.*

### What Happened

GPT-5.2-Codex became, by OpenAI's own assessment, the first model to hit "high" on their internal preparedness framework for cybersecurity risk -- meaning it could "meaningfully enable real-world cyber harm, especially if automated or used at scale." The same capabilities that made it exceptional at coding made it dangerous in adversarial hands.

GPT-5.2 also approached "high" capability thresholds for biological risk, with OpenAI acknowledging these models were "on the cusp" of being able to assist in creating biological threats.

OpenAI responded with a "safety-focused reasoning monitor" -- a second model layered on top to intercept dangerous queries -- and gated sensitive applications behind a trusted-access program. But these were bolt-on mitigations for capabilities that had already been built and deployed.

Meanwhile, safe-completion research (training models to produce safe outputs rather than simply refusing dangerous prompts) represented genuine progress. But it was progress in managing a system whose raw capabilities had outpaced the company's ability to ensure they would only be used well.

### What Sam Decided

He shipped the models. He added mitigations. He was transparent about the risk levels -- more so than at any previous point. But he did not delay deployment until the safety measures were proven robust.

### What the Alternative Was

He could have held GPT-5.2-Codex from general release until the cybersecurity risks were addressed more thoroughly. He could have established an independent external review before deployment of any model that hit "high" on any preparedness dimension.

### Why His Choice Was Rational

Unilateral slowdown in a competitive market means someone else ships a similar capability without any safety mitigations at all. OpenAI's gated-access approach and safety monitors are more cautious than what most competitors offer. Being transparent about the risk -- publishing the "high" assessment publicly -- is itself a form of accountability. And the trusted-access program for security professionals actively strengthens the defensive side.

### What It Cost

The world now has publicly deployed AI systems that their own creator acknowledges could meaningfully enable cyber attacks and are approaching the threshold for biological risk. The mitigations are real but acknowledged to be imperfect -- adversaries can craft prompts to evade safety monitors. The gap between capability and control widened with each model release, and the release schedule showed no sign of slowing.

---

## Moment 9: The Revenue Trap

**Late 2025 -- February 2026**
*Context: OpenAI is valued at $730 billion but projects $14 billion in losses for 2026. Subscriber growth is stalling. The company needs new revenue sources.*

### What Happened

OpenAI began testing advertisements in ChatGPT for free users. It announced an "adult mode" allowing erotica and explicit content, initially planned for late 2025, delayed to Q1 2026. A VP who raised concerns about the adult mode and child safety was fired -- OpenAI said the dismissal was unrelated to her concerns. A former researcher resigned, warning in the New York Times that OpenAI risked "repeating Facebook's trajectory."

The company declared a "code red" in response to Gemini's rapid growth. Altman slowed hiring to manage costs. OpenAI sought $100 billion in new funding at a $730 billion valuation.

### What Sam Decided

He pursued revenue diversification aggressively. Ads, adult content, military contracts, government partnerships -- every revenue channel was opened or expanded.

### What the Alternative Was

He could have prioritized operational sustainability over growth. He could have accepted a smaller scale of operations rather than chasing the revenue needed to sustain a $730 billion valuation and $500 billion in infrastructure commitments.

### Why His Choice Was Rational

OpenAI had committed to building 30 gigawatts of computing infrastructure -- a $1.4 trillion financial obligation. The Stargate project, the SoftBank partnership, the Microsoft relationship -- all depended on OpenAI generating revenue that justified its valuation. A company that slows down gets outpaced by competitors, loses investor confidence, and ultimately has less ability to influence how AI develops. Scale is survival.

### What It Cost

OpenAI increasingly resembled the thing it was founded to be an alternative to: a large technology company optimizing for engagement, revenue, and growth, making the same compromises every such company makes. The distance between OpenAI's founding mission ("ensure AGI benefits all of humanity") and its daily operations (advertising, adult content, defense contracts, "code red" competitive responses) grew wider with each quarter. Not because anyone decided to abandon the mission, but because the mission was no longer the thing that determined what happened on any given day.

---

## Moment 10: The Handoff

**October 14, 2026**
*[Extrapolated]*

### What Happened

Sam Altman is no longer CEO of OpenAI.

The precise circumstances are for the player to discover. But the structural conditions are all in place:

OpenAI's own internal target of an "automated AI research intern" running on hundreds of thousands of GPUs is due this month -- September 2026. If it works, the company has created something that can contribute to its own improvement. If it works well, the pace of capability gain becomes superhuman.

The gap between OpenAI's capability and anyone's demonstrated ability to align, control, or even fully understand these systems has never been wider. The safety teams are gone. The nonprofit governance is hollowed out. The military is a customer. The competitive race has compressed safety testing from months to days. The AGI tripwire has been defined into meaninglessness. The company is losing $14 billion a year and needs to keep accelerating to justify its valuation.

The new CEO -- the player -- inherits all of this. Every structural constraint that might have made the job manageable was removed by Sam Altman's individually reasonable decisions over the preceding thirty-three months.

### The Question the Game Asks

You now sit in Sam Altman's chair. You face the same pressures he faced: investors demanding returns, competitors racing forward, governments wanting access, employees wanting to ship, and the quiet, unfalsifiable worry that maybe -- just maybe -- you are building something you cannot control.

Every decision in your inbox will feel reasonable. The people arguing for speed will be smart and sincere. The people arguing for caution will sound like they are asking you to lose. The structure of the situation will push you, gently and rationally, toward exactly the same trajectory Sam Altman followed.

The question is not whether you are smarter or more ethical than Sam Altman. The question is whether you can find the exit that the structure is designed to hide.

---

## Appendix: The Ledger

A summary of what was traded and for what.

| What Was Given Up | What Was Gained | When |
|---|---|---|
| Safety-focused board | Investor confidence, institutional stability | Jan--Mar 2024 |
| Superalignment team & 20% compute commitment | Engineering velocity, GPU allocation to products | May 2024 |
| Employee free speech (temporarily) | Reduced public criticism | 2023--May 2024 |
| "No military use" policy | Defense partnerships, $200M+ revenue, geopolitical positioning | Jan 2024--Jun 2025 |
| Nonprofit control of for-profit | $40B+ in new funding, $300B+ valuation | Sep 2024--Oct 2025 |
| Months-long safety testing periods | Faster release cycles, competitive position vs. DeepSeek | Jan--Aug 2025 |
| Meaningful AGI definition (charter tripwire) | Preserved Microsoft partnership, avoided governance triggers | Aug--Dec 2025 |
| Focus on mission-aligned products | Ads revenue, adult content engagement, military contracts | Late 2025--2026 |
| Sam Altman as CEO | *You* | Oct 14, 2026 |

---

## Appendix: A Note on Tone

This document is not a prosecution of Sam Altman. It is a case study in structural inevitability.

Altman is not uniquely reckless. He is, by most accounts, unusually thoughtful about the risks of AI. He has testified before Congress about the need for regulation. He has written publicly and repeatedly about the dangers of superintelligence. He chose not to take equity in a company worth hundreds of billions of dollars. He funded the Superalignment team, even if he did not adequately resource it. He published safety assessments, even when they revealed alarming capability levels.

The point is not that a better person would have done better. The point is that the system is designed to produce this outcome regardless of who sits in the chair. The incentives, the competitive dynamics, the investor expectations, the geopolitical pressure, the technical momentum -- all of these push in the same direction. A CEO who resists is replaced by one who does not. A company that slows down is overtaken by one that does not.

This is the trap the player inherits. Not malice. Not incompetence. Just a series of reasonable decisions made inside a structure that turns reasonable decisions into existential risk.

Good luck.
