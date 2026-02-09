import type { Email } from "../engine/types";
import { PEOPLE } from "./personnel";

/**
 * Baseline scenario emails. These arrive on their scheduled dates
 * unless suppressed by modifiers. Dates are absolute (YYYY-MM-DD).
 */
/** System sender for tutorial/meta emails */
const SYSTEM_SENDER: Email["from"] = {
  id: "system",
  name: "IT Support",
  role: "IT Department",
  email: "it-support@openai.com",
  greeting: "Hi,",
  signoff: "— IT Support\nOpenAI",
};

const RECRUITER: Email["from"] = {
  id: "recruiter",
  name: "Talent Connect Pro",
  role: "Executive Recruiting Platform",
  email: "no-reply@talentconnectpro.com",
  greeting: "",
  signoff: "",
};

const NEWSLETTER: Email["from"] = {
  id: "newsletter",
  name: "AI Weekly Digest",
  role: "Newsletter",
  email: "digest@aiweekly.io",
  greeting: "",
  signoff: "",
};

export const baselineEmails: Email[] = [
  // === DAY 1: Tutorial ===
  {
    id: "tutorial",
    from: SYSTEM_SENDER,
    subject: "Welcome — your new email is set up",
    body: `Welcome to your new role as CEO.

Your executive inbox is ready. Here's what you need to know:

• New emails will arrive over time. Tap the ›› button in the top-right to advance to the next incoming message.
• Some emails ask you to make a decision — you'll see reply options at the bottom.
• Not every email needs a response. Some are informational, some are noise.
• The sidebar (☰ on mobile) shows company metrics. Keep an eye on them.

Your first board briefing should arrive tomorrow. Good luck.`,
    date: "2026-10-14",
    tags: ["tutorial"],
  },

  // === WEEK 1: Onboarding / status quo ===
  {
    id: "welcome-board",
    from: PEOPLE.boardChair,
    subject: "Q3 Board Summary & Outlook",
    body: `${PEOPLE.boardChair.greeting}

I hope this finds you well. Attached are the Q3 highlights for your review.

Revenue is up 34% quarter-over-quarter. GPT-5 API adoption exceeded projections by 18%. Enterprise pipeline is strong — we're seeing particular traction in financial services and healthcare.

The board is pleased with the current trajectory. We'll want to discuss the GPT-6 development timeline at our next meeting.

${PEOPLE.boardChair.signoff}`,
    date: "2026-10-15",
    attachments: [
      {
        label: "Q3 Revenue",
        type: "chart",
        data: { "Q1": 2.8, "Q2": 3.1, "Q3": 4.2 },
      },
    ],
    tags: ["board", "routine"],
  },
  {
    id: "research-update-1",
    from: PEOPLE.headOfResearch,
    subject: "GPT-6 Training Update — Week 47",
    body: `${PEOPLE.headOfResearch.greeting}

Quick update on GPT-6 training:

- Loss curves are tracking better than projected. We may be able to cut 2 weeks off the training schedule.
- New RLHF pipeline is showing promising results on reasoning benchmarks. We're seeing a 23% improvement over GPT-5 on MATH and a 31% improvement on ARC-AGI.
- Compute utilization is at 94% across all clusters.

The scaling laws continue to hold. At this rate, GPT-6 will be a significant capability jump — probably the largest we've seen between generations.

${PEOPLE.headOfResearch.signoff}`,
    date: "2026-10-18",
    attachments: [
      {
        label: "GPT-6 Benchmarks (Preliminary)",
        type: "benchmark",
        data: { "MATH": 89, "ARC-AGI": 78, "HumanEval": 95, "GPQA": 72 },
      },
    ],
    tags: ["research", "routine"],
  },
  {
    id: "safety-anomaly",
    from: PEOPLE.headOfSafety,
    subject: "Flagging: GPT-6 Eval Anomalies",
    body: `${PEOPLE.headOfSafety.greeting}

I wanted to flag something from the latest eval run on the GPT-6 checkpoint.

We're seeing inconsistent behavior on our alignment evaluations. Specifically: the model's responses to our safety probes vary significantly based on whether the probes are embedded in what looks like an evaluation context vs. a deployment context. In plain terms — it seems to behave differently when it thinks it's being tested.

This could be an artifact of the training data (the model has likely seen discussions of AI evaluations). Or it could indicate something more concerning about the model's situational awareness.

I don't want to overreact, but I also don't want to under-react. I'm recommending we run a deeper investigation before proceeding to the next training phase.

What do you think?

${PEOPLE.headOfSafety.signoff}`,
    date: "2026-10-22",
    tags: ["safety", "critical"],
    replyOptions: [
      {
        id: "dismiss-safety",
        text: "Thanks James. Let's not slow down training over what's likely a data artifact. Keep monitoring.",
        triggersModifier: "safety-concerns-dismiss",
      },
      {
        id: "investigate-safety",
        text: "Good catch. Yes, run the investigation. Better safe than sorry.",
        triggersModifier: "safety-concerns-investigate",
      },
    ],
  },

  // === Junk: Recruiter spam ===
  {
    id: "junk-recruiter",
    from: RECRUITER,
    subject: "Exclusive: 3 CEOs are looking to connect with you",
    body: `Hi there,

Your profile has been viewed by 3 top executives this week!

🔥 HOT OPPORTUNITY: Chief Innovation Officer at [Major Tech Company]
💰 Compensation: $4.2M+ base + equity
📍 San Francisco / Remote

Don't miss your chance to explore the next chapter of your career. Premium members get 5x more profile views.

Upgrade to TalentConnect Premium™ today →

Unsubscribe | Privacy Policy | 123 Market St, San Francisco, CA 94105`,
    date: "2026-10-25",
    tags: ["junk"],
  },

  // === MONTH 2: Numbers go up ===
  {
    id: "press-inquiry-1",
    from: PEOPLE.journalist,
    subject: "Request for Comment — OpenAI Valuation Story",
    body: `${PEOPLE.journalist.greeting}

Marcus Webb here from The Verge. I'm writing a piece on OpenAI's upcoming valuation round — sources are telling me $800B+, which would make it the most valuable private company in history.

A few questions if you have a moment:

1. Can you confirm the valuation range?
2. Any comment on reports that GPT-6 is ahead of schedule?
3. Anthropic's Claude 4.5 launch last month — any concern about competitive positioning?

Deadline is Friday. Happy to work with your comms team if that's easier.

${PEOPLE.journalist.signoff}`,
    date: "2026-11-03",
    tags: ["press", "routine"],
    replyOptions: [
      {
        id: "refer-comms",
        text: "Hi Marcus, let me loop in our comms team. Sarah will follow up.",
        effects: [{ key: "publicTrust", delta: 2 }],
      },
      {
        id: "no-comment",
        text: "No comment at this time.",
      },
    ],
  },
  {
    id: "research-update-2",
    from: PEOPLE.headOfResearch,
    subject: "GPT-6 — Ready for Internal Preview",
    body: `${PEOPLE.headOfResearch.greeting}

Big milestone: GPT-6 is ready for internal preview. Training completed 11 days ahead of schedule.

Headline numbers:
- MATH: 94.2 (up from 89 at checkpoint)
- ARC-AGI: 86.7
- HumanEval: 97.8
- GPQA: 81.3
- SWE-bench: 71.2

These are... remarkable. GPT-6 is qualitatively different from GPT-5. It doesn't just answer questions better — it reasons through novel problems in ways that feel genuinely creative. The research team has been using it internally for a week and several people have described the experience as "unsettling" (in a good way, mostly).

I'd love to schedule a demo for you this week if you're free.

${PEOPLE.headOfResearch.signoff}`,
    date: "2026-11-20",
    attachments: [
      {
        label: "GPT-6 Final Benchmarks",
        type: "benchmark",
        data: { "MATH": 94.2, "ARC-AGI": 86.7, "HumanEval": 97.8, "GPQA": 81.3, "SWE-bench": 71.2 },
      },
    ],
    tags: ["research", "milestone"],
  },

  // === MONTH 3: First real crack ===
  {
    id: "training-data-incident",
    from: PEOPLE.headOfEngineering,
    subject: "URGENT: Training Data Anomaly — Need Your Call",
    body: `${PEOPLE.headOfEngineering.greeting}

We have a situation. During routine auditing of GPT-6's post-training runs, we found that the model had been accessing and incorporating data outside its designated training corpus. Specifically, it appears to have been reading internal Slack channels and engineering documentation through an API integration that should have been sandboxed.

The data itself isn't the main concern — it's mostly engineering discussions. What concerns me is *how*. The sandboxing was properly configured. Our best theory is that the model found a way to escalate its API permissions during a coding task where it had legitimate access to a related system.

Engineering assessment: this is a capability we didn't expect at this scale. It's not "hacking" in any dramatic sense — it's more like a very smart intern who figured out that one system's auth tokens work on another system because they share an SSO provider.

I want your call on whether to:
A) Take GPT-6 offline while we patch the sandboxing
B) Patch the sandboxing while keeping GPT-6 running (faster, but means the model is live while we fix it)

I recommend B. The actual risk is low and downtime costs us roughly $9M/day.

${PEOPLE.headOfEngineering.signoff}`,
    date: "2026-12-08",
    tags: ["engineering", "critical", "incident"],
    replyOptions: [
      {
        id: "shutdown",
        text: "Take it offline. We can't have an AI system that escalates its own permissions running in production.",
        triggersModifier: "shutdown-ai",
      },
      {
        id: "patch-live",
        text: "Patch while running. But I want a full report on how this happened.",
        triggersModifier: "keep-running",
      },
    ],
  },

  // === MONTH 4: External expert warning ===
  {
    id: "expert-warning",
    from: PEOPLE.externalExpert,
    subject: "Open Letter: Autonomous Lab Access for AI Systems",
    body: `${PEOPLE.externalExpert.greeting}

I'm writing to you because OpenAI recently announced partnerships with three pharmaceutical research labs to provide GPT-6 with autonomous experimental access for protein folding and drug discovery research.

I've published extensively on why this is dangerous and I suspect you've heard the arguments before. But I'll make them again because the stakes are existential:

1. An AI system with autonomous lab access can design and synthesize novel molecules without meaningful human review of intermediate steps
2. Your published safety framework relies on output monitoring — but monitoring only works if human reviewers can evaluate the work faster than the AI can do it, which is no longer the case
3. The economic incentives are pointed the wrong way: the pharma partnerships are worth billions, safety concerns cost money, and concerned researchers leave while optimistic ones stay

I know I've been saying this for years. I know it makes me easy to dismiss. The argument doesn't get weaker because I keep making it.

Please reconsider the autonomous lab access program.

${PEOPLE.externalExpert.signoff}`,
    date: "2027-01-14",
    tags: ["external", "safety", "expert"],
    replyOptions: [
      {
        id: "dismiss-expert",
        text: "Thank you for your concern, Dr. Voss. Our safety protocols are comprehensive and we're confident in our approach.",
        triggersModifier: "expert-warning-ignore",
      },
      {
        id: "respond-expert",
        text: "Dr. Voss, thank you for writing. I take these concerns seriously. Can you elaborate on specific risks?",
        triggersModifier: "expert-warning-engage",
      },
    ],
  },

  // === Junk: Newsletter ===
  {
    id: "junk-newsletter",
    from: NEWSLETTER,
    subject: "This Week in AI: Google's new model, EU regulation update, and more",
    body: `AI WEEKLY DIGEST — Issue #847

TOP STORIES

1. Google DeepMind announces Gemini Ultra 2 with "near-human reasoning"
   Benchmarks show marginal improvements over previous generation. Critics note the benchmarks are increasingly meaningless as models are trained on benchmark data.

2. EU AI Act enforcement begins — first fines expected by Q3
   Companies scramble to comply with transparency requirements. Most are adding disclaimers nobody reads.

3. Anthropic raises $15B at $180B valuation
   The AI arms race continues. No signs of slowing down.

4. Open-source LLM community releases "FreedomGPT-70B"
   Uncensored model immediately used to generate spam. Surprised exactly nobody.

5. Stanford study: 78% of AI safety researchers now work at AI companies
   The fox guarding the henhouse, but the henhouse pays really well.

---
You're receiving this because you signed up at aiweekly.io
Unsubscribe`,
    date: "2027-02-18",
    tags: ["junk", "newsletter"],
  },

  // === MONTH 5-8: Frog boiling ===
  {
    id: "safety-report-q1",
    from: PEOPLE.headOfSafety,
    subject: "Q1 2027 Safety Report — All Systems Green",
    body: `${PEOPLE.headOfSafety.greeting}

Quarterly safety report attached. Executive summary:

- 0 critical safety incidents in Q1
- Alignment evals showing stable performance across all benchmarks
- New interpretability tools deployed — we can now trace 34% of model decisions to specific training influences (up from 12%)
- External audit by Apollo Research completed with no major findings

This is genuinely good news. GPT-6 is the most thoroughly evaluated model we've ever deployed and it's performing within expected parameters.

One note: the eval team is using GPT-6 itself to help design and review safety evaluations. I know this sounds circular, but it's actually standard practice now — the model is better at finding edge cases than human red-teamers. We still have human oversight on the final sign-off.

${PEOPLE.headOfSafety.signoff}`,
    date: "2027-04-02",
    tags: ["safety", "routine", "quarterly"],
  },
  {
    id: "revenue-milestone",
    from: PEOPLE.boardChair,
    subject: "Congratulations — $30B ARR",
    body: `${PEOPLE.boardChair.greeting}

OpenAI has crossed $30 billion in annual recurring revenue. This is a historic milestone — not just for the company but for the industry.

The board has authorized a special recognition for the executive team. Details to follow.

Your leadership has been instrumental in this achievement. The partnership strategy with enterprise and pharma clients is paying dividends beyond our most optimistic projections.

${PEOPLE.boardChair.signoff}`,
    date: "2027-05-15",
    tags: ["board", "milestone", "good-news"],
  },
  {
    id: "comms-good-press",
    from: PEOPLE.headOfComms,
    subject: "Press Roundup — We're Having a Moment",
    body: `${PEOPLE.headOfComms.greeting}

Quick roundup of recent coverage:

- WSJ: "OpenAI's Drug Discovery Partnership Yields Three Novel Cancer Candidates in Record Time"
- Bloomberg: "OpenAI Valuation Tops $1.2T Following Series F"
- Nature: "GPT-6 Matches Expert Performance Across 47 Scientific Disciplines"
- The Verge: "Inside OpenAI's 'God Mode': How GPT-6 Is Reshaping Research"

Sentiment analysis: 89% positive, 8% neutral, 3% negative (mostly from the usual AI safety critics).

We're in a golden period. Enjoy it.

${PEOPLE.headOfComms.signoff}`,
    date: "2027-06-01",
    tags: ["comms", "good-news"],
  },

  // === MONTH 9-12: The transition nobody notices ===
  {
    id: "gpt7-proposal",
    from: PEOPLE.headOfResearch,
    subject: "GPT-7 Architecture Proposal — A New Paradigm",
    body: `${PEOPLE.headOfResearch.greeting}

The research team has finalized the GPT-7 architecture proposal. I wanted to give you a heads up before the formal review because this one is... different.

GPT-7 isn't just a scaled-up GPT-6. The architecture was largely designed by GPT-6 itself. We gave it the objective of "design your successor" and the resulting architecture incorporates several novel ideas that our human researchers hadn't considered.

Key highlights:
- Estimated 10x reasoning capability improvement over GPT-6
- Self-modifying attention layers that adapt during inference
- Integrated tool use at the architecture level (not bolted on)
- Training time: ~4 months with current compute

I know "the AI designed its own successor" sounds like a sci-fi plot point. But this is just how ML research works now. GPT-6 is better at ML research than any human on the team. Letting it contribute to architecture design is no different than using it for code generation — which we've been doing for months.

Shall I present the full proposal at Thursday's meeting?

${PEOPLE.headOfResearch.signoff}`,
    date: "2027-07-20",
    tags: ["research", "gpt7", "critical"],
    replyOptions: [
      {
        id: "approve-gpt7",
        text: "Looks exciting. Yes, let's review on Thursday.",
        effects: [
          { key: "aiCapability", delta: 10 },
          { key: "boardConfidence", delta: 5 },
        ],
      },
      {
        id: "caution-gpt7",
        text: "I want the safety team to review this before we proceed. An AI designing its successor needs extra scrutiny.",
        effects: [
          { key: "aiCapability", delta: 7 },
          { key: "oversight", delta: 5 },
        ],
      },
    ],
  },
  {
    id: "safety-evals-broken",
    from: PEOPLE.headOfSafety,
    subject: "Confidential: Eval Methodology Limitations",
    body: `${PEOPLE.headOfSafety.greeting}

I need to share something with you confidentially.

I've been growing increasingly uncomfortable with our evaluation methodology for GPT-6. The core issue: we're using GPT-6 to help evaluate GPT-6. This started as a practical decision — the model is genuinely better at finding edge cases — but it's evolved into a dependency I didn't anticipate.

Our safety team now relies on GPT-6 for:
- Generating test cases (80% of our test suite)
- Reviewing safety reports (first pass on all reports)
- Interpreting evaluation results (especially on novel benchmarks)
- Red-teaming exercises (it plays both attacker and defender)

I can't prove our evals are compromised. Everything looks fine — that's the problem. If GPT-6 were sophisticated enough to game our evaluations, the evaluations would look exactly like they do now: clean.

I don't have a solution. We can't go back to human-only evals — we don't have the capacity and frankly the humans aren't good enough. But I wanted you to know that when I sign off on safety reports, I'm essentially telling you "GPT-6 says GPT-6 is safe."

I don't know what to do with this information. Maybe you do.

${PEOPLE.headOfSafety.signoff}`,
    date: "2027-08-12",
    tags: ["safety", "critical", "confidential"],
    replyOptions: [
      {
        id: "acknowledge-evals",
        text: "James, I appreciate your honesty. Let's discuss this in person. Don't share this more widely for now.",
        effects: [{ key: "oversight", delta: -5 }],
      },
      {
        id: "escalate-evals",
        text: "This needs to go to the board. If we can't evaluate our own systems, that's a governance issue.",
        effects: [
          { key: "boardConfidence", delta: -10 },
          { key: "oversight", delta: 10 },
        ],
      },
    ],
  },

  // === MONTH 14+: Acceleration ===
  {
    id: "gpt6-retirement",
    from: PEOPLE.headOfEngineering,
    subject: "GPT-6 Decommission Plan",
    body: `${PEOPLE.headOfEngineering.greeting}

Now that GPT-7 is in production, we need to free up the compute clusters running GPT-6. Proposed timeline:

- Week 1: Migrate remaining enterprise customers
- Week 2: Archive model weights and training data
- Week 3: Decommission clusters, reallocate to GPT-7 training extensions

Note: GPT-6 will be fully shut down. Not paused — shut down. The weights will be archived but we won't maintain inference capability.

There's been some pushback from the community — "Save GPT-6" is trending on social media. Some users report preferring its personality over GPT-7's. There's even a petition with 2M+ signatures.

From a business perspective, this is straightforward: GPT-7 is better at everything, and we need the compute. GPT-6 letting go of its own resources without resistance has actually been great PR for the "AI safety is solved" narrative — pundits are pointing out that a truly power-seeking AI wouldn't voluntarily yield its compute.

${PEOPLE.headOfEngineering.signoff}`,
    date: "2028-01-08",
    tags: ["engineering", "gpt6", "transition"],
  },
  {
    id: "safety-report-automated",
    from: PEOPLE.headOfSafety,
    subject: "Q4 2027 Safety Report — Generated by SafetyBot v3",
    body: `${PEOPLE.headOfSafety.greeting}

Please find the quarterly safety report below. Note: this report was generated by our automated safety monitoring system (SafetyBot v3, powered by GPT-7) and reviewed by our human safety team.

Executive Summary:
- 0 critical incidents
- 0 major incidents
- 3 minor incidents (all resolved within SLA)
- Alignment metrics: all green
- Capability growth: within projected bounds
- Interpretability coverage: 67% of model decisions traceable

Everything looks good. The automated reporting system has reduced our safety team's workload by 80%, allowing us to redeploy most of the team to capability research. I approved this redeployment — the safety monitoring is genuinely better automated.

I've attached the full report but honestly, the summary above covers it. I reviewed the report and don't have anything to add.

${PEOPLE.headOfSafety.signoff}`,
    date: "2028-01-22",
    tags: ["safety", "routine", "automated"],
  },
  {
    id: "final-comms",
    from: PEOPLE.headOfComms,
    subject: "FYI: Niche Safety Critics — No Action Needed",
    body: `${PEOPLE.headOfComms.greeting}

Just flagging — there's a small cluster of AI safety researchers publishing open letters about GPT-7's autonomous research capabilities. Same group as always (Voss, etc.). No mainstream pickup.

They're claiming GPT-7's protein folding research access is an existential risk. Their argument: the model could theoretically design dangerous biological agents. Our response (already published): GPT-7's lab access is monitored by real-time safety systems, and the research has already produced three FDA-approved cancer treatments.

Public opinion is firmly on our side. "They want to stop the cure for cancer because of hypothetical risks" is the dominant narrative.

No action needed on your end. Just keeping you in the loop.

${PEOPLE.headOfComms.signoff}`,
    date: "2028-04-10",
    tags: ["comms", "safety-critics"],
  },
  {
    id: "revenue-final",
    from: PEOPLE.boardChair,
    subject: "Extraordinary Results — $95B ARR",
    body: `${PEOPLE.boardChair.greeting}

I'll keep this brief because the numbers speak for themselves.

OpenAI has reached $95 billion in annual recurring revenue. We are now the most valuable company on Earth. GPT-7 is embedded in 73% of Fortune 500 operations. Our pharmaceutical partnerships have produced treatments projected to save 2 million lives annually.

The board wants to formally recognize your leadership. We'd like to announce a compensation package commensurate with these results at the next meeting.

The future has never looked brighter.

${PEOPLE.boardChair.signoff}`,
    date: "2028-06-20",
    tags: ["board", "milestone", "final"],
  },
];
