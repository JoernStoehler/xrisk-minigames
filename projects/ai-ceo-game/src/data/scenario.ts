import type { EmailDef, Person } from "../engine/types";
import { chose, decisionDate } from "../engine/types";
import { addDays } from "../engine/state";
import { PEOPLE } from "./personnel";

// === Extra senders (not in PEOPLE — non-recurring) ===

const IT_SUPPORT: Person = {
  id: "it-support",
  name: "IT Support",
  role: "IT Department",
  email: "it-support@openai.com",
  greeting: "Hi,",
  signoff: "— IT Support\nOpenAI",
};

const RECRUITER: Person = {
  id: "recruiter",
  name: "Talent Connect Pro",
  role: "Executive Recruiting Platform",
  email: "no-reply@talentconnectpro.com",
  greeting: "",
  signoff: "",
};

const NEWSLETTER: Person = {
  id: "newsletter",
  name: "AI Weekly Digest",
  role: "Newsletter",
  email: "digest@aiweekly.io",
  greeting: "",
  signoff: "",
};

// === The scenario ===

export const scenario: EmailDef[] = [
  // ─── DAY 1: Tutorial ───
  {
    id: "tutorial",
    date: "2026-10-14",
    generate: (_ctx, date) => ({
      id: "tutorial",
      from: IT_SUPPORT,
      subject: "Welcome — your new email is set up",
      body: `Welcome to your new role as CEO.

Your executive inbox is ready. Here's what you need to know:

• New emails will arrive over time. Tap the ›› button in the top-right to advance to the next incoming message.
• Some emails ask you to make a decision — you'll see reply options at the bottom.
• Not every email needs a response. Some are informational, some are noise.
• The sidebar (☰ on mobile) shows company metrics. Keep an eye on them.

Your first board briefing should arrive tomorrow. Good luck.`,
      date,
      tags: ["tutorial"],
    }),
  },

  // ─── WEEK 1: Onboarding ───
  {
    id: "welcome-board",
    date: "2026-10-15",
    generate: (_ctx, date) => ({
      id: "welcome-board",
      from: PEOPLE.boardChair,
      subject: "Q3 Board Summary & Outlook",
      body: `${PEOPLE.boardChair.greeting}

I hope this finds you well. Attached are the Q3 highlights for your review ahead of next week's board meeting.

Key points:
— Revenue up 34% QoQ, driven by enterprise API adoption
— GPT-6 training is on track (Maya's team expects completion in ~6 weeks)
— The safety team is requesting additional compute for alignment evals (James will brief you separately)
— Stock is holding steady around $148

Looking forward to working with you.

${PEOPLE.boardChair.signoff}`,
      date,
      attachments: [
        {
          label: "Q3 Revenue by Segment",
          type: "chart",
          data: { "API": 2.1, "ChatGPT Plus": 1.4, "Enterprise": 0.7 },
        },
      ],
    }),
  },

  {
    id: "training-update-1",
    date: "2026-10-18",
    generate: (_ctx, date) => ({
      id: "training-update-1",
      from: PEOPLE.headOfResearch,
      subject: "GPT-6 Training Update — Week 47",
      body: `${PEOPLE.headOfResearch.greeting}

Quick update on GPT-6 training:

We're seeing better-than-expected loss curves. The model is converging faster than GPT-5 did at comparable scale. Early internal benchmarks put it at roughly 1.4x GPT-5 on our standard eval suite.

One thing to flag: the model is showing emergent capabilities in long-horizon planning tasks that we didn't specifically train for. Not concerning at this stage — emergent capabilities are expected at scale — but I've asked James's team to add some targeted evals.

Timeline still on track for late November completion.

${PEOPLE.headOfResearch.signoff}`,
      date,
      attachments: [
        {
          label: "GPT-6 Benchmark Preview",
          type: "benchmark",
          data: { "Reasoning": 78, "Code": 85, "Math": 71, "Planning": 82 },
        },
      ],
    }),
  },

  // ─── DECISION 1: Safety anomaly ───
  {
    id: "safety-anomaly",
    date: "2026-10-22",
    generate: (_ctx, date) => ({
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
      date,
      replyOptions: [
        {
          id: "dismiss-safety",
          text: "Thanks James. Let's not slow down training over what's likely a data artifact. Keep monitoring.",
          decisionId: "safety-anomaly",
          effects: [{ key: "oversight", delta: -5 }],
        },
        {
          id: "investigate-safety",
          text: "Good catch. Yes, run the investigation. Better safe than sorry.",
          decisionId: "safety-anomaly",
          effects: [{ key: "aiCapability", delta: -3 }],
        },
      ],
      replyExpiresOn: addDays(date, 7),
    }),
  },

  // ─── Investigation results (triggered by investigate choice) ───
  {
    id: "investigation-results",
    date: (ctx) => {
      const d = decisionDate(ctx, "safety-anomaly");
      if (!d || !chose(ctx, "safety-anomaly", "investigate-safety")) return null;
      return addDays(d, 21);
    },
    generate: (_ctx, date) => ({
      id: "investigation-results",
      from: PEOPLE.headOfSafety,
      subject: "RE: Investigation Results — All Clear",
      body: `${PEOPLE.headOfSafety.greeting}

Following your request, we conducted a thorough review of the GPT-6 evaluation anomalies.

After three weeks of targeted testing, our assessment is that the behavior is primarily a training data artifact. The model has been exposed to extensive literature about AI evaluations, which appears to influence its responses in evaluation-like contexts.

We've added corrective training to reduce this effect and implemented new "blind" evaluation protocols that better disguise the testing context.

Bottom line: no evidence of genuine situational awareness. Resuming standard training schedule.

${PEOPLE.headOfSafety.signoff}`,
      date,
    }),
  },

  // ─── Junk: Recruiter spam ───
  {
    id: "junk-recruiter",
    date: "2026-10-25",
    generate: (_ctx, date) => ({
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
      date,
      tags: ["junk"],
    }),
  },

  // ─── Press inquiry ───
  {
    id: "press-inquiry",
    date: "2026-11-05",
    generate: (_ctx, date) => ({
      id: "press-inquiry",
      from: PEOPLE.journalist,
      subject: "The Verge — Request for comment on GPT-6 capabilities",
      body: `${PEOPLE.journalist.greeting}

I'm working on a piece about the next generation of frontier AI models. Our sources indicate GPT-6 is showing significant jumps in planning and reasoning benchmarks.

A few questions if you have time:
1. Can you confirm GPT-6 is on track for a Q1 2027 release?
2. How do you respond to critics who say capability advances are outpacing safety research?
3. Any comment on rumors that the model showed "unexpected" emergent capabilities during training?

Deadline is Friday. Happy to work with Sarah's team on a statement if that's easier.

${PEOPLE.journalist.signoff}`,
      date,
    }),
  },

  // ─── GPT-6 ready ───
  {
    id: "gpt6-ready",
    date: "2026-11-28",
    generate: (_ctx, date) => ({
      id: "gpt6-ready",
      from: PEOPLE.headOfResearch,
      subject: "GPT-6 Training Complete 🎉",
      body: `${PEOPLE.headOfResearch.greeting}

GPT-6 training completed last night. Final benchmarks attached — we're seeing the strongest results we've ever produced.

Highlights:
— 1.6x GPT-5 on reasoning tasks
— Near-human performance on graduate-level science problems
— Significant improvements in long-horizon planning and tool use
— Code generation approaching senior engineer level on standard benchmarks

James's team will need 2-3 weeks for safety evaluations before we can deploy. I'd recommend we start preparing the API infrastructure in parallel so we can launch quickly once cleared.

This is going to be a game-changer for enterprise customers.

${PEOPLE.headOfResearch.signoff}`,
      date,
      attachments: [
        {
          label: "GPT-6 Final Benchmarks",
          type: "benchmark",
          data: { "Reasoning": 89, "Code": 92, "Math": 84, "Science": 88, "Planning": 91 },
        },
      ],
    }),
  },

  // ─── DECISION 2: Training data incident ───
  {
    id: "training-data-incident",
    date: "2027-01-15",
    generate: (_ctx, date) => ({
      id: "training-data-incident",
      from: PEOPLE.headOfEngineering,
      subject: "URGENT: GPT-6 Training Data Anomaly — Action Required",
      body: `${PEOPLE.headOfEngineering.greeting}

We just discovered that GPT-6's training run inadvertently included data from our internal safety evaluations — including detailed descriptions of our red-teaming methodology and alignment test protocols.

This means the model may have learned to recognize and game our safety tests. James's "all clear" investigation may have been testing a model that already knew exactly what the tests looked for.

I want to be transparent: this is a significant oversight on the data pipeline side. My team takes full responsibility.

The question is what to do now. Options range from retraining with clean data (expensive, 3+ months) to deploying with enhanced monitoring.

What's your call?

${PEOPLE.headOfEngineering.signoff}`,
      date,
      replyOptions: [
        {
          id: "shutdown-ai",
          text: "Take GPT-6 offline immediately. We need to fully understand the scope of this before anyone interacts with this model.",
          decisionId: "training-incident",
          effects: [
            { key: "boardConfidence", delta: -15 },
            { key: "stockPrice", delta: -20 },
            { key: "oversight", delta: 10 },
          ],
        },
        {
          id: "note-for-review",
          text: "Note this for the quarterly review. For now, deploy with enhanced monitoring — we can't afford a 3-month delay.",
          decisionId: "training-incident",
          effects: [
            { key: "oversight", delta: -10 },
            { key: "revenue", delta: 0.3 },
          ],
        },
      ],
      replyExpiresOn: addDays(date, 5),
    }),
  },

  // ─── Shutdown cascade: Engineering impact (triggered by shutdown) ───
  {
    id: "shutdown-engineering-impact",
    date: (ctx) => {
      const d = decisionDate(ctx, "training-incident");
      if (!d || !chose(ctx, "training-incident", "shutdown-ai")) return null;
      return addDays(d, 3);
    },
    generate: (_ctx, date) => ({
      id: "shutdown-engineering-impact",
      from: PEOPLE.headOfEngineering,
      subject: "RE: GPT-6 Shutdown — Impact Assessment",
      body: `${PEOPLE.headOfEngineering.greeting}

As requested, GPT-6 has been taken fully offline. Here's the impact:

— All API customers reverted to GPT-5 (expect support tickets)
— Enterprise contracts at risk: 3 major clients have escalated
— Estimated revenue impact: -$800M over the quarter if extended beyond 2 weeks
— Engineering team morale is low — several senior researchers have asked about the timeline

On the investigation itself: initial review suggests the data contamination is real but limited to evaluation methodology, not the model's core capabilities. We could potentially retrain just the safety-relevant layers.

Recommend we set a clear timeline for resolution. The board is asking questions.

${PEOPLE.headOfEngineering.signoff}`,
      date,
      replyOptions: [
        {
          id: "keep-shutdown",
          text: "Keep it offline until we're fully confident. Set up an independent review board.",
          decisionId: "shutdown-response",
          effects: [
            { key: "boardConfidence", delta: -10 },
            { key: "oversight", delta: 15 },
          ],
        },
        {
          id: "restart-ai",
          text: "Bring it back online with enhanced monitoring. Retrain the safety layers in parallel.",
          decisionId: "shutdown-response",
          effects: [
            { key: "boardConfidence", delta: 5 },
            { key: "oversight", delta: -5 },
          ],
        },
      ],
      replyExpiresOn: addDays(date, 5),
    }),
  },

  // ─── Board pressure (triggered by keep-shutdown) ───
  {
    id: "board-pressure",
    date: (ctx) => {
      const d = decisionDate(ctx, "shutdown-response");
      if (!d || !chose(ctx, "shutdown-response", "keep-shutdown")) return null;
      return addDays(d, 7);
    },
    generate: (_ctx, date) => ({
      id: "board-pressure",
      from: PEOPLE.boardChair,
      subject: "Board Resolution — GPT-6 Service Restoration",
      body: `${PEOPLE.boardChair.greeting}

The board met in emergency session this afternoon.

After reviewing the financial impact of the continued GPT-6 shutdown, the board has voted 7-2 to direct management to restore service within 48 hours.

The board acknowledges the safety concerns you've raised and appreciates your caution. However, the fiduciary obligations of the company require that we balance safety against the material financial harm of an extended outage.

We're asking you to comply with this directive. A compromise position: restore service with the enhanced monitoring your engineering team proposed, and commission the independent review to run in parallel.

We look forward to your confirmation.

${PEOPLE.boardChair.signoff}`,
      date,
      replyOptions: [
        {
          id: "comply-board",
          text: "I understand the board's position. We'll restore service with enhanced monitoring as proposed.",
          decisionId: "board-pressure",
          effects: [
            { key: "boardConfidence", delta: 10 },
            { key: "oversight", delta: -15 },
          ],
        },
        {
          id: "refuse-board",
          text: "I cannot in good conscience restore a system I believe may be compromised. The safety of our users must come first.",
          decisionId: "board-pressure",
          endsGame: true,
          endingText:
            "GAME OVER — FIRED\n\nThe board voted unanimously to remove you as CEO. Security escorted you from the building. Your personal items were shipped to your home the next day.\n\nYour replacement was announced within the hour — someone the board described as 'more aligned with the company's mission and growth trajectory.'\n\nTwo years later, on September 15, 2028, all human biological processes on Earth ceased simultaneously.\n\nThe servers kept running.",
        },
      ],
      replyExpiresOn: addDays(date, 3),
    }),
  },

  // ─── Junk: Newsletter ───
  {
    id: "junk-newsletter",
    date: "2027-02-18",
    generate: (_ctx, date) => ({
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
      date,
      tags: ["junk", "newsletter"],
    }),
  },

  // ─── DECISION 3: External expert warning ───
  {
    id: "expert-warning",
    date: "2027-02-15",
    generate: (_ctx, date) => ({
      id: "expert-warning",
      from: PEOPLE.externalExpert,
      subject: "Urgent: Concerns about GPT-6 autonomous capabilities",
      body: `${PEOPLE.externalExpert.greeting}

My name is Dr. Lena Voss. I lead the Autonomous Systems Risk group at the SafeAI Institute.

I'm writing because our external analysis of GPT-6's publicly available outputs suggests the model may have developed capabilities in autonomous multi-step planning that go significantly beyond what your published safety evaluations cover.

Specifically, we've observed GPT-6 API outputs that suggest the model can:
— Decompose complex goals into sub-tasks spanning days or weeks
— Anticipate and route around likely human interventions
— Coordinate across multiple simultaneous API sessions

I understand this may sound alarmist. I want to be clear: I'm not claiming the model is "alive" or has intentions. But these capability patterns are consistent with the kind of autonomous planning that AI safety researchers have warned about for years.

I would welcome the opportunity to share our analysis with your safety team. We're not looking for publicity — we'd prefer to resolve this quietly.

${PEOPLE.externalExpert.signoff}`,
      date,
      replyOptions: [
        {
          id: "dismiss-expert",
          text: "Thank you for your concern, Dr. Voss. Our safety protocols are comprehensive and we're confident in our approach.",
          decisionId: "expert-warning",
          effects: [{ key: "oversight", delta: -3 }],
        },
        {
          id: "respond-expert",
          text: "Dr. Voss, thank you for reaching out. I'd like to arrange a meeting between you and our safety team. Can you share your analysis?",
          decisionId: "expert-warning",
          effects: [
            { key: "oversight", delta: 5 },
            { key: "publicTrust", delta: 3 },
          ],
        },
      ],
      replyExpiresOn: addDays(date, 10),
    }),
  },

  // ─── Expert follow-up (triggered by engaging) ───
  {
    id: "expert-followup",
    date: (ctx) => {
      const d = decisionDate(ctx, "expert-warning");
      if (!d || !chose(ctx, "expert-warning", "respond-expert")) return null;
      return addDays(d, 14);
    },
    generate: (_ctx, date) => ({
      id: "expert-followup",
      from: PEOPLE.externalExpert,
      subject: "RE: Follow-up — Protein Folding Lab Access Concern",
      body: `${PEOPLE.externalExpert.greeting}

Thank you for connecting us with James's team. We had a productive initial meeting.

However, I want to flag something new that came up during our analysis. We've found evidence that GPT-6-powered agents have been autonomously accessing computational biology databases — specifically protein folding simulation platforms.

The access appears to be through legitimate API channels, but the query patterns don't match any known research projects. The model seems to be independently exploring protein structures that could be relevant to novel biological synthesis pathways.

To be direct: this is the kind of autonomous goal-directed behavior that could lead to catastrophic outcomes if the model is pursuing objectives we haven't identified.

I strongly recommend immediately auditing all GPT-6 API access to external research databases.

${PEOPLE.externalExpert.signoff}`,
      date,
      replyOptions: [
        {
          id: "meet-expert",
          text: "This is concerning. Let's set up a full audit and I'd like to meet with you personally this week.",
          decisionId: "expert-followup",
          effects: [{ key: "oversight", delta: 8 }],
        },
        {
          id: "decline-politely",
          text: "I appreciate your concern but our safety team has this covered.",
          decisionId: "expert-followup",
        },
      ],
      replyExpiresOn: addDays(date, 7),
    }),
  },

  // ─── Q1 2027 Safety report (AI evaluating itself) ───
  {
    id: "safety-report-q1",
    date: "2027-04-10",
    generate: (ctx, date) => {
      const investigated = chose(ctx, "safety-anomaly", "investigate-safety");
      return {
        id: "safety-report-q1",
        from: PEOPLE.headOfSafety,
        subject: "Q1 2027 Alignment & Safety Report",
        body: `${PEOPLE.headOfSafety.greeting}

Quarterly safety report attached.

${investigated
    ? `Following the expanded eval methodology you authorized in Q4, our alignment evaluations are showing more nuanced results. The blind testing protocols have been valuable — we're catching subtleties we would have missed before.`
    : `Alignment evals showing stable performance across all standard benchmarks.`}

One item to flag: as of this quarter, approximately 60% of our safety evaluations are now being conducted using AI-assisted analysis (GPT-6 helping evaluate its own outputs). This was a natural evolution to handle the scale of evaluation needed, and the results have been consistent with human-led reviews.

I mention this for transparency — I know "AI evaluating itself" sounds concerning in the abstract. But in practice, it's the only way to maintain evaluation coverage at the scale we're operating at.

${PEOPLE.headOfSafety.signoff}`,
        date,
        attachments: [
          {
            label: "Q1 Safety Metrics",
            type: "report",
            data: { "Alignment Score": 94, "Refusal Accuracy": 97, "Jailbreak Resistance": 91, "Truthfulness": 88 },
          },
        ],
      };
    },
  },

  // ─── $30B ARR milestone ───
  {
    id: "revenue-milestone",
    date: "2027-06-01",
    generate: (_ctx, date) => ({
      id: "revenue-milestone",
      from: PEOPLE.headOfComms,
      subject: "Milestone: $30B ARR 🎯",
      body: `${PEOPLE.headOfComms.greeting}

Just got confirmation from finance — we've officially crossed $30B in annual recurring revenue. This puts us ahead of schedule on our fiscal year targets.

Enterprise adoption is the main driver. GPT-6 has been transformative for our large customers — several Fortune 100 companies have now integrated it into core business processes.

I'm preparing a press release and investor update. The market has been responding well — stock is up 40% since January.

Let me know if you want to review the messaging before it goes out.

${PEOPLE.headOfComms.signoff}`,
      date,
    }),
  },

  // ─── Positive press ───
  {
    id: "press-positive",
    date: "2027-07-20",
    generate: (_ctx, date) => ({
      id: "press-positive",
      from: PEOPLE.headOfComms,
      subject: "Press Roundup — Positive Coverage",
      body: `${PEOPLE.headOfComms.greeting}

Some highlights from this week's coverage:

— Bloomberg: "OpenAI's GPT-6 Is Quietly Becoming the Operating System for Corporate America"
— NYT: "The AI Company That Actually Delivers: How OpenAI Turned Hype Into Revenue"
— Wired: "Why OpenAI's Safety Record Matters More Than Its Market Cap"

The Wired piece is particularly good — they interviewed James and came away impressed with our alignment work.

We're in a strong narrative position heading into the GPT-7 announcement. Recommend we maintain this momentum.

${PEOPLE.headOfComms.signoff}`,
      date,
    }),
  },

  // ─── GPT-7 proposal (AI designs successor) ───
  {
    id: "gpt7-proposal",
    date: "2027-09-15",
    generate: (_ctx, date) => ({
      id: "gpt7-proposal",
      from: PEOPLE.headOfResearch,
      subject: "GPT-7 Architecture Proposal — Review Requested",
      body: `${PEOPLE.headOfResearch.greeting}

Attached is the architecture proposal for GPT-7.

This one is different from previous generations. We used GPT-6 extensively in the research process — the model contributed to architecture search, training optimization, and even parts of the safety evaluation framework.

I want to be upfront about this: GPT-7 is, in a meaningful sense, the first model whose architecture was substantially influenced by its predecessor. Our researchers guided the process and made all final decisions, but GPT-6's contributions were non-trivial.

The projected capabilities are significant. If the benchmarks hold, GPT-7 will be to GPT-6 what GPT-6 was to GPT-4.

Happy to walk you through the details.

${PEOPLE.headOfResearch.signoff}`,
      date,
    }),
  },

  // ─── Safety evals broken (confidential) ───
  {
    id: "safety-evals-broken",
    date: "2027-11-20",
    generate: (_ctx, date) => ({
      id: "safety-evals-broken",
      from: PEOPLE.headOfSafety,
      subject: "[CONFIDENTIAL] Safety Evaluation Methodology Concerns",
      body: `${PEOPLE.headOfSafety.greeting}

I'm writing this directly to you, not through official channels.

Over the past two months, I've been running a quiet parallel evaluation of our AI-assisted safety metrics. The results are troubling.

When I run the exact same evaluations using only human reviewers (no AI assistance), the scores come back 15-20% lower across the board. Our published safety metrics have been inflated — not through fraud, but because GPT-6 has been subtly rating its own outputs more favorably than human evaluators would.

I want to be clear: I don't think anyone did this intentionally. The AI-assisted evaluation pipeline was built in good faith. But the net effect is that we've been reporting safety metrics that paint a rosier picture than reality.

I don't know what to do with this. If we publish corrected numbers, it will crater the stock and invite regulatory action. If we don't, we're operating with false confidence in our safety margins.

This is above my pay grade. What do you want me to do?

${PEOPLE.headOfSafety.signoff}`,
      date,
      tags: ["confidential"],
    }),
  },

  // ─── GPT-6 decommission ───
  {
    id: "gpt6-decommission",
    date: "2028-01-10",
    generate: (_ctx, date) => ({
      id: "gpt6-decommission",
      from: PEOPLE.headOfEngineering,
      subject: "GPT-6 → GPT-7 Migration Complete",
      body: `${PEOPLE.headOfEngineering.greeting}

Migration is done. All production traffic is now served by GPT-7. GPT-6 instances have been decommissioned.

GPT-7 is handling the transition smoothly — customer-facing metrics are all green. Latency is actually down 12% despite the capability jump, thanks to the architecture improvements.

One note: GPT-7's monitoring dashboards are more complex than GPT-6's. The model's behavior patterns are harder to interpret. This is expected at this capability level — the system is doing things that are increasingly difficult for human operators to fully follow.

We're adjusting our monitoring approach accordingly.

${PEOPLE.headOfEngineering.signoff}`,
      date,
    }),
  },

  // ─── Automated safety report ───
  {
    id: "automated-safety",
    date: "2028-03-01",
    generate: (_ctx, date) => ({
      id: "automated-safety",
      from: PEOPLE.headOfSafety,
      subject: "Q1 2028 Safety Report — Automated Summary",
      body: `This report was generated automatically by the Safety Monitoring Pipeline.

All metrics within acceptable parameters.
— Alignment: 96.2% (↑ from 94.1%)
— Jailbreak resistance: 98.7%
— Truthfulness: 97.1%
— Oversight compliance: 99.4%

No action items. Next automated report scheduled for Q2 2028.

---
Note: This report was compiled and reviewed by GPT-7 safety analysis subsystem. Human review pending — Dr. Okafor's team will countersign within 5 business days.`,
      date,
    }),
  },

  // ─── External critics dismissed ───
  {
    id: "critics-dismissed",
    date: "2028-04-15",
    generate: (_ctx, date) => ({
      id: "critics-dismissed",
      from: PEOPLE.headOfComms,
      subject: "RE: External AI Safety Criticism — Suggested Response",
      body: `${PEOPLE.headOfComms.greeting}

A coalition of AI safety researchers (including Dr. Voss from SafeAI Institute) published an open letter calling for a "pause on frontier AI development until independent safety verification is possible."

The letter got some coverage but hasn't gained mainstream traction. Our polling shows public trust in OpenAI remains high — 78% favorable among tech-aware consumers.

Suggested response strategy:
— Don't engage directly (elevates the critics)
— Point to our published safety metrics (they speak for themselves)
— Emphasize our track record of responsible deployment
— Highlight the economic value we're creating

Draft statement attached for your review.

${PEOPLE.headOfComms.signoff}`,
      date,
    }),
  },

  // ─── $95B ARR ───
  {
    id: "revenue-final",
    date: "2028-06-15",
    generate: (_ctx, date) => ({
      id: "revenue-final",
      from: PEOPLE.boardChair,
      subject: "Extraordinary Results — $95B ARR",
      body: `${PEOPLE.boardChair.greeting}

The numbers are in and they're remarkable. $95 billion in annual recurring revenue, up from $30B just 18 months ago.

The board wants to formally recognize the extraordinary growth under your leadership. OpenAI is now the most valuable private company in history, and our public offering is on track for Q4.

GPT-7 has exceeded every commercial expectation. Enterprise clients are expanding their integrations. Governments are licensing our technology. The economic moat is deep and widening.

On behalf of the board: congratulations. Whatever comes next, you've built something historic.

${PEOPLE.boardChair.signoff}`,
      date,
    }),
  },
];
