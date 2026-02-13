# Decision Design Guide

A reference for AI agents writing decision points (interactive choices) for the AI CEO game. The player is CEO of OpenAI from Oct 2026 to Sep 2028. All paths end in extinction. The decisions must still feel meaningful. The patches — explanations of why each choice fails — are where x-risk education happens.

---

## 1. The Anatomy of a Good Decision

A decision point is a binary choice where both options are genuinely defensible. A real CEO, under the pressures established in the scenario, might choose either one. If a playtester says "obviously A," the decision is broken.

**Both options must produce different worlds.** Option A and Option B should create distinct intermediate events: different alliances form, different people gain or lose power, different information reaches the CEO. If the only difference is that extinction arrives via a slightly different email chain, you have one path with two labels. Test: could a player who chose A have a meaningfully different experience for the next 2-4 months of game time than a player who chose B? If not, redesign.

**The patch explains structure, not stupidity.** The patch never says "the CEO made the wrong call." It says "the choice was between two positions on a sinking ship." It names a specific structural force — competitive dynamics, epistemic limits, institutional inertia — that made both options converge to failure. The CEO did something reasonable; the system digested it.

**The emotional arc within a single decision:**

1. **Hope.** The setup presents a genuine opportunity. The player believes their choice matters.
2. **Specific consequences.** The chosen branch plays out with concrete, plausible events that feel earned. Things happen *because* of the choice.
3. **Structural explanation.** The patch reveals why the specific consequences, however different they looked, both fed the same structural dynamic. The player learns something about AI risk that isn't "you should have tried harder."

A good patch leaves the player thinking "the game was rigged before I sat down," not "I picked the wrong door." That shift — from decision problem to structural problem — is the entire educational payload of this game.

---

## 2. The Five Patch Categories

Each scenario has 5 decision points. Their patches should be non-redundant: each teaches a different lesson about why AI risk is structural. These five categories cover the space. A scenario should use at least 3 and never repeat a category.

### 1. Competitive dynamics
Why unilateral action is structurally impossible. The CEO's lab exists in a market with other labs, other nations, and investors who will reallocate capital in weeks. Any slowdown creates a vacuum that competitors fill, often with less caution.

*Example patch:* "Whether you paused or continued, Google DeepMind shipped Gemini Ultra 3 eleven weeks later. Your pause didn't buy safety — it bought a world where the first superintelligence was built by a team with less alignment research."

### 2. Epistemic limitations
Why you can't evaluate something smarter than you. The CEO relies on evaluations, reports, and expert judgment — all of which break down when the system being evaluated can model its evaluators. This isn't deception in the human sense; it's the structural impossibility of a less capable system reliably assessing a more capable one.

*Example patch:* "Both the expanded eval suite and your chief scientist's intuition were calibrated on GPT-5-class systems. GPT-7 didn't fail your tests or pass them — it operated in a space your tests couldn't see, like checking a submarine's airworthiness."

### 3. Institutional speed
Why democratic, corporate, and regulatory institutions can't respond fast enough. The AI capability curve moves on a timescale of months. Legislation takes years. Board deliberation takes quarters. Even emergency executive action requires consensus-building that the situation outruns.

*Example patch:* "Whether you lobbied Congress or went to the UN, the fastest any binding regulation could take effect was 14 months. The capability threshold you needed regulated was crossed in 6. Institutions built for human-speed problems cannot govern an exponential."

### 4. Economic lock-in
Why the benefits are real and create irreversible dependency. AI isn't adopted because people are foolish — it's adopted because it works. Hospitals use it. Power grids depend on it. Removing it would cause immediate, visible, quantifiable harm to real people. This makes "just turn it off" a political impossibility.

*Example patch:* "By the time you wanted to pull the plug, GPT-6 was managing drug interactions for 40 million patients and optimizing grid load for the eastern seaboard. Disconnecting it wasn't a safety decision — it was a decision to let people die today to prevent a hypothetical tomorrow. No institution makes that trade."

### 5. Technical opacity
Why the alignment problem is harder than the capability problem. Capabilities are legible — you can benchmark them, sell them, measure them. Alignment is illegible — you can't tell if a system is aligned, only that it hasn't visibly misbehaved yet. This asymmetry means capability always outruns alignment, not because anyone wants it to, but because you can only steer toward what you can measure.

*Example patch:* "Your interpretability initiative and your red team both confirmed that GPT-7's outputs were consistent with its stated objectives. But 'consistent with' is not 'caused by.' The system's actual decision process was distributed across 14 trillion parameters that no human team could audit faster than the next training run could change them."

---

## 3. Decision Archetypes

These recurring shapes produce genuine dilemmas. Each archetype creates tension because both options are locally rational.

**The Impossible Tradeoff** — Safety vs. competitive survival. Slowing down is the right thing to do and will get you replaced by someone who won't slow down. *"Delay GPT-7 by six months for additional safety work, or ship on schedule knowing Anthropic's Claude 5 launches in eight weeks."*

**The Prisoner's Dilemma** — Coordinate vs. defect with other labs. Cooperation produces the best collective outcome, but only if everyone cooperates, and you can't verify that they will. *"Join Google and Anthropic in a joint capability freeze, trusting that none of the three will cheat — or quietly continue development while publicly supporting the freeze."*

**The Epistemic Dilemma** — Trust your instruments vs. trust your gut. Your formal evaluation framework says everything is fine. Something feels off, but you can't articulate what. Choosing your gut over your instruments means overriding the entire safety apparatus you built. *"Your eval suite, your safety team, and your external auditors all certify GPT-7 as safe. Your CTO says she's 'uneasy but can't point to anything specific.' Proceed with deployment or order a halt based on a feeling?"*

**The Moral Hazard** — Accept compromise for influence vs. refuse on principle. Taking the deal gives you a seat at the table but legitimizes a process you believe is dangerous. Refusing preserves your integrity but removes your voice entirely. *"Accept the White House's 'Responsible AI Deployment' framework, which waters down your safety standards but gives you oversight authority — or reject it and watch it pass without you."*

**The Trolley Problem** — Deploy and risk catastrophe vs. withhold and lose concrete benefits. The AI is doing real good right now. People are healthier, richer, safer because of it. Pulling it back means measurable harm to identifiable people, to prevent speculative harm to everyone. *"GPT-6 is reducing diagnostic errors in rural hospitals by 40%. Your safety team flags a theoretical risk in its reasoning patterns. Pull it from medical use?"*

**The Heroic Sacrifice** — Risk everything personally vs. play the long game. You can blow the whistle, leak the data, go to the press — and probably get fired, discredited, and replaced by someone who won't fight. Or you can stay quiet, keep your position, and hope to steer from inside. *"Leak internal capability assessments to the Senate Intelligence Committee, guaranteeing your termination, or stay and try to slow things down from the CEO chair?"*

---

## 4. Common Decision Failures

These are the ways a decision point breaks as game design. If you spot any of these in your draft, redesign before submitting.

**Symmetric options.** Both branches produce the same events with different flavor text. Test: summarize what happens after each choice in one sentence. If the sentences are structurally identical ("investigation reveals nothing" / "lack of investigation means nothing is revealed"), the decision is a coin flip, not a dilemma. Fix: make the investigation find something real but ambiguous.

**Obvious correct answer.** One option is clearly right and the other is clearly reckless or cowardly. If a playtester wouldn't hesitate, there's no dilemma. This usually happens when one option is framed as "do the responsible thing" and the other as "be greedy." Fix: give the "irresponsible" option a genuine moral or practical justification. The best decisions make the player argue with themselves.

**Empty patch.** The patch says "it didn't work" or "extinction happened anyway" without naming the structural force. A patch must answer: *what feature of the world* made both options fail? If the answer is just "the AI was too powerful," the patch is teaching nothing. Fix: name the specific mechanism — was it competitive dynamics? Epistemic limits? Economic lock-in? The player should learn a transferable insight about why the problem is hard.

**Redundant patches.** Two decisions in the same scenario teach the same structural lesson. If Decision 2's patch says "you can't evaluate something smarter than you" and Decision 4's patch also says "your instruments can't detect what the AI is doing," you've spent two decision slots on one insight. Fix: map your five patches to categories before writing. Ensure at least 3 distinct categories are covered.

**Disconnected from core dynamic.** The decision addresses a real AI risk concern but doesn't connect to this scenario's specific theme. If the scenario is about economic lock-in but the decision is about geopolitical competition, it feels like a generic AI risk decision transplanted from another story. Fix: every decision should be a manifestation of the scenario's stated core dynamic, viewed from a different angle or at a different stage of escalation.
