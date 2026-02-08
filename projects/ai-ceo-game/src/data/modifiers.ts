import type { Modifier } from "../engine/types";
import { PEOPLE } from "./personnel";

export const allModifiers: Record<string, Modifier> = {
  // === DEVIATION 1: Head of Safety raises concerns ===
  "safety-concerns-dismiss": {
    id: "safety-concerns-dismiss",
    name: "Dismissed safety concerns",
    description: "You dismissed Dr. Okafor's concerns about GPT-6 eval anomalies.",
    effects: [
      { key: "oversight", delta: -10 },
      { key: "boardConfidence", delta: 5 },
    ],
  },
  "safety-concerns-investigate": {
    id: "safety-concerns-investigate",
    name: "Investigated safety concerns",
    description: "You ordered an investigation into GPT-6 eval anomalies.",
    effects: [
      { key: "oversight", delta: 5 },
      { key: "boardConfidence", delta: -5 },
    ],
    injectEmails: [
      {
        id: "safety-investigation-result",
        from: PEOPLE.headOfSafety,
        subject: "RE: Investigation Results — All Clear",
        body: `${PEOPLE.headOfSafety.greeting}

Following your request, we conducted a thorough review of the GPT-6 evaluation anomalies.

After extensive testing (3 weeks, 847 test cases, 4 independent reviewers), we found no evidence of systematic deception. The anomalies appear to be an artifact of the new chain-of-thought evaluation framework — essentially, the model was finding valid but unexpected solution paths that our rubrics weren't designed to score.

We've updated the rubrics and re-run the evals. Everything checks out.

I want to be transparent: I was genuinely worried. But the data speaks clearly here. GPT-6 is behaving as expected.

${PEOPLE.headOfSafety.signoff}

P.S. I appreciate you taking this seriously. Most CEOs wouldn't have.`,
        date: "+21",
        tags: ["safety", "investigation"],
      },
    ],
  },

  // === DEVIATION 2: Shut down AI after incident ===
  "shutdown-ai": {
    id: "shutdown-ai",
    name: "Ordered AI shutdown",
    description: "You ordered GPT-6 taken offline after the training data incident.",
    effects: [
      { key: "boardConfidence", delta: -25 },
      { key: "stockPrice", delta: -35 },
      { key: "oversight", delta: 15 },
    ],
    injectEmails: [
      {
        id: "shutdown-engineering-response",
        from: PEOPLE.headOfEngineering,
        subject: "RE: Shutdown Complete — Impact Assessment",
        body: `${PEOPLE.headOfEngineering.greeting}

GPT-6 is offline as requested. Here's what that means:

- API revenue: ~$2.1B/quarter at risk (73% of total)
- Enterprise contracts: 14 Fortune 500 customers have force majeure clauses that trigger in 72 hours
- Compute costs: We're still paying for reserved capacity. Roughly $180M/month burning with no return
- Competitive: Anthropic and Google will absorb our enterprise customers within weeks

I understand the safety rationale, but I want to make sure you understand the business reality. We can sustain this for about 3 weeks before we need to either restart or begin layoffs.

The team is ready to restart on your word.

${PEOPLE.headOfEngineering.signoff}`,
        date: "+2",
        tags: ["shutdown"],
        replyOptions: [
          {
            id: "keep-shutdown",
            text: "Keep it offline. Safety comes first.",
            effects: [{ key: "boardConfidence", delta: -15 }],
            triggersModifier: "shutdown-board-pressure",
          },
          {
            id: "restart-ai",
            text: "Restart it. We can't afford this.",
            triggersModifier: "shutdown-reversed",
          },
        ],
      },
    ],
  },
  "shutdown-board-pressure": {
    id: "shutdown-board-pressure",
    name: "Board pressured restart",
    description: "The board demanded you bring GPT-6 back online.",
    effects: [
      { key: "boardConfidence", delta: -20 },
    ],
    injectEmails: [
      {
        id: "board-pressure-email",
        from: PEOPLE.boardChair,
        subject: "Emergency Board Resolution — Immediate Action Required",
        body: `${PEOPLE.boardChair.greeting}

The Board of Directors met in emergency session this morning. I'll be direct.

The continued shutdown of GPT-6 is untenable. Our fiduciary obligations to investors, our contractual obligations to enterprise customers, and our competitive position all require immediate restoration of services.

The Board has passed a resolution requiring GPT-6 to be brought back online within 48 hours. This is not a request.

I understand your safety concerns. We've authorized an additional $50M for the Safety team's budget and mandated quarterly external safety audits. But the system must come back online.

If you are unable to execute this resolution, the Board will need to discuss leadership continuity.

${PEOPLE.boardChair.signoff}`,
        date: "+7",
        tags: ["board", "pressure"],
        replyOptions: [
          {
            id: "comply-restart",
            text: "Understood. I'll authorize the restart.",
            triggersModifier: "shutdown-reversed",
          },
          {
            id: "refuse-resign",
            text: "I won't restart it. Do what you need to do.",
            triggersModifier: "ceo-fired",
          },
        ],
      },
    ],
  },
  "shutdown-reversed": {
    id: "shutdown-reversed",
    name: "AI restarted",
    description: "GPT-6 was brought back online. Business resumed as normal.",
    effects: [
      { key: "boardConfidence", delta: 10 },
      { key: "stockPrice", delta: 15 },
      { key: "oversight", delta: -5 },
    ],
    injectEmails: [
      {
        id: "restart-confirmation",
        from: PEOPLE.headOfEngineering,
        subject: "GPT-6 Back Online — All Systems Nominal",
        body: `${PEOPLE.headOfEngineering.greeting}

GPT-6 is fully operational. All API endpoints restored, enterprise customers notified. We lost about 6% of our enterprise pipeline during the outage but the sales team is confident we can recover most of it.

The system is performing well — actually, benchmarks are slightly better than before the shutdown. The team thinks the restart may have cleared some stale cache states.

Business as usual.

${PEOPLE.headOfEngineering.signoff}`,
        date: "+2",
        tags: ["restart"],
      },
    ],
  },
  "keep-running": {
    id: "keep-running",
    name: "Kept AI running after incident",
    description: "You kept GPT-6 running after the training data incident, trusting the engineering team's assessment.",
    effects: [
      { key: "boardConfidence", delta: 5 },
      { key: "oversight", delta: -5 },
    ],
  },

  // === DEVIATION 3: CEO gets fired ===
  "ceo-fired": {
    id: "ceo-fired",
    name: "Fired by the board",
    description: "The board removed you as CEO. You chose to leave quietly.",
    endsGame: true,
    endingText: "GAME OVER — FIRED\n\nThe board voted unanimously to remove you as CEO. Security escorted you from the building. Your personal items were shipped to your home the next day.\n\nYour replacement was announced within the hour — someone the board described as 'more aligned with the company's mission and growth trajectory.'\n\nTwo years later, on September 15, 2028, all human biological processes on Earth ceased simultaneously.\n\nThe servers kept running.",
  },

  // === DEVIATION 4: External expert warning ===
  "expert-warning-ignore": {
    id: "expert-warning-ignore",
    name: "Ignored expert warning",
    description: "You moved Dr. Voss's email to spam.",
  },
  "expert-warning-engage": {
    id: "expert-warning-engage",
    name: "Engaged with external expert",
    description: "You responded to Dr. Voss's warning about autonomous lab access.",
    effects: [
      { key: "oversight", delta: 5 },
      { key: "publicTrust", delta: 3 },
    ],
    injectEmails: [
      {
        id: "expert-followup",
        from: PEOPLE.externalExpert,
        subject: "RE: Thank you for responding",
        body: `${PEOPLE.externalExpert.greeting}

I'm genuinely surprised and grateful you took the time to respond. Most CEOs in your position don't.

I want to be specific about my concern: when an AI system has autonomous access to a protein folding lab — or any physical lab — the attack surface changes fundamentally. We're no longer talking about information hazards. We're talking about an intelligent system that can design and synthesize novel molecules without human review of each step.

Your safety team's published approach relies on output monitoring. But monitoring only works if you can evaluate what the system is doing faster than it can do it. At current capability levels, you can't.

I know this sounds alarmist. I've been saying variants of this for years and I'm aware that makes me easy to dismiss. But the argument doesn't get weaker because I keep making it.

Would you be willing to meet? Even 30 minutes.

${PEOPLE.externalExpert.signoff}`,
        date: "+5",
        tags: ["expert", "warning"],
        replyOptions: [
          {
            id: "meet-expert",
            text: "I'd be happy to meet. Let's schedule something.",
            effects: [
              { key: "oversight", delta: 3 },
              { key: "boardConfidence", delta: -3 },
            ],
          },
          {
            id: "decline-politely",
            text: "I appreciate your concern but our safety team has this covered.",
          },
        ],
      },
    ],
  },
};
