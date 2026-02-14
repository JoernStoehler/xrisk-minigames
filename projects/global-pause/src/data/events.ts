import type { EventTemplate, GameState } from "../engine/types";

export const EVENT_TEMPLATES: EventTemplate[] = [
  // === CHIP SMUGGLING ===
  {
    id: "chip-smuggling-basic",
    type: "chip_smuggling",
    regions: "any",
    headline: "Suspected chip shipment diverted in {region}",
    description:
      "Customs flagged a container manifested as industrial equipment that may contain untracked AI accelerators. The shipment originated from a known chip distributor.",
    hiddenDescription:
      "Confirmed: 48 H100-equivalent chips hidden in networking equipment casings, destined for an undeclared facility.",
    baseWeight: 10,
    minWeek: 8,
    urgencyWeeks: 6,
    responses: [
      {
        type: "investigate",
        label: "Investigate shipment",
        description: "Trace the supply chain and examine the cargo.",
        politicalCapitalCost: 5,
        requiresInspector: false,
        successProbability: 0.7,
        successEffects: { cooperationSelf: 5, politicalCapital: 5 },
        failureEffects: { cooperationSelf: -3 },
      },
      {
        type: "inspect",
        label: "Deploy inspectors",
        description:
          "Send an ISIA inspection team to intercept and catalog the chips.",
        politicalCapitalCost: 10,
        requiresInspector: true,
        successProbability: 0.85,
        successEffects: { cooperationSelf: 8, politicalCapital: 8 },
        failureEffects: { cooperationSelf: -5 },
      },
      {
        type: "sanction",
        label: "Impose trade sanctions",
        description: "Sanction the distributor and receiving entities.",
        politicalCapitalCost: 15,
        requiresInspector: false,
        successProbability: 0.6,
        successEffects: { cooperationSelf: 3, globalSupport: 3 },
        failureEffects: { cooperationSelf: -8, globalSupport: -3 },
      },
    ],
    catastropheEffects: { algorithmicProgress: 5, cooperationSelf: -8 },
  },

  {
    id: "chip-smuggling-network",
    type: "chip_smuggling",
    regions: ["row", "russia"],
    headline: "Organized chip trafficking network in {region}",
    description:
      "Intelligence suggests a sophisticated smuggling ring is funneling AI chips through shell companies across multiple jurisdictions.",
    hiddenDescription:
      "The network has moved ~200 H100-equivalents over 6 months, using modified consumer electronics as cover.",
    baseWeight: 6,
    minWeek: 26,
    urgencyWeeks: 8,
    responses: [
      {
        type: "investigate",
        label: "Launch intelligence operation",
        description: "Coordinate with regional law enforcement to map the network.",
        politicalCapitalCost: 12,
        requiresInspector: false,
        successProbability: 0.55,
        successEffects: { cooperationSelf: 10, algorithmicProgress: -2 },
        failureEffects: { cooperationSelf: -5 },
      },
      {
        type: "inspect",
        label: "Raid suspected locations",
        description: "Deploy inspectors to simultaneously raid known nodes.",
        politicalCapitalCost: 20,
        requiresInspector: true,
        successProbability: 0.7,
        successEffects: {
          cooperationSelf: 12,
          algorithmicProgress: -3,
          globalSupport: 5,
        },
        failureEffects: { cooperationSelf: -10, politicalCapital: -5 },
      },
    ],
    catastropheEffects: { algorithmicProgress: 8, cooperationSelf: -12 },
    weightModifier: (s: GameState) =>
      s.algorithmicProgress > 30 ? 1.5 : 0.8,
  },

  // === ROGUE DATACENTER ===
  {
    id: "rogue-datacenter-thermal",
    type: "rogue_datacenter",
    regions: "any",
    headline: "Thermal anomaly near {region} industrial zone",
    description:
      "Satellite imagery shows unusual heat signatures from a facility not registered as a covered chip cluster. Power draw patterns are consistent with GPU operations.",
    hiddenDescription:
      "A secretly constructed datacenter housing ~500 H100-equivalents, running prohibited training at 2e23 FLOP.",
    baseWeight: 8,
    minWeek: 12,
    urgencyWeeks: 5,
    responses: [
      {
        type: "investigate",
        label: "Request satellite analysis",
        description: "Task intelligence assets for detailed thermal and power monitoring.",
        politicalCapitalCost: 8,
        requiresInspector: false,
        successProbability: 0.65,
        successEffects: { cooperationSelf: 5 },
        failureEffects: {},
      },
      {
        type: "inspect",
        label: "Challenge inspection",
        description:
          "Invoke Article X — formal challenge inspection with 24-hour access.",
        politicalCapitalCost: 20,
        requiresInspector: true,
        successProbability: 0.8,
        successEffects: {
          cooperationSelf: 10,
          algorithmicProgress: -5,
          globalSupport: 5,
        },
        failureEffects: { cooperationSelf: -12, politicalCapital: -5 },
      },
      {
        type: "protective_action",
        label: "Cyber operation",
        description:
          "Authorize a covert cyber operation to disrupt the facility's operations.",
        politicalCapitalCost: 25,
        requiresInspector: false,
        successProbability: 0.6,
        successEffects: { algorithmicProgress: -8 },
        failureEffects: {
          cooperationSelf: -20,
          globalSupport: -8,
          politicalCapital: -10,
        },
      },
    ],
    catastropheEffects: { algorithmicProgress: 12, cooperationSelf: -15 },
  },

  // === PROHIBITED RESEARCH ===
  {
    id: "prohibited-research-university",
    type: "prohibited_research",
    regions: ["us", "eu", "china"],
    headline: "University lab in {region} publishing restricted AI research",
    description:
      "A prominent research group has posted a preprint describing novel training efficiency improvements that fall under Article VIII restricted research categories.",
    hiddenDescription:
      "The paper describes a method that could reduce training compute by 10x for equivalent capability. Several international groups are already attempting to replicate.",
    baseWeight: 9,
    minWeek: 4,
    urgencyWeeks: 4,
    responses: [
      {
        type: "negotiate",
        label: "Contact domestic agency",
        description:
          "Request the national research control agency intervene and retract the paper.",
        politicalCapitalCost: 8,
        requiresInspector: false,
        successProbability: 0.75,
        successEffects: { cooperationSelf: 3 },
        failureEffects: { algorithmicProgress: 5, globalSupport: -3 },
      },
      {
        type: "sanction",
        label: "Sanction institution",
        description: "Cut research funding and impose penalties on the lab.",
        politicalCapitalCost: 15,
        requiresInspector: false,
        successProbability: 0.65,
        successEffects: { cooperationSelf: 5, globalSupport: 2 },
        failureEffects: { globalSupport: -5, cooperationSelf: -5 },
      },
    ],
    catastropheEffects: { algorithmicProgress: 8, cooperationSelf: -5 },
  },

  {
    id: "prohibited-research-private",
    type: "prohibited_research",
    regions: "any",
    headline: "Leaked documents: covert AI research program in {region}",
    description:
      "A former employee has provided documents suggesting a private company is conducting banned capability research under the guise of safety evaluation work.",
    hiddenDescription:
      "The company has been running distributed training across multiple sub-CCC clusters, exploiting the 16 H100-equivalent threshold loophole.",
    baseWeight: 7,
    minWeek: 20,
    urgencyWeeks: 5,
    responses: [
      {
        type: "investigate",
        label: "Protect whistleblower & investigate",
        description:
          "Secure the informant under Article X protections and verify claims.",
        politicalCapitalCost: 10,
        requiresInspector: false,
        successProbability: 0.7,
        successEffects: { cooperationSelf: 8, globalSupport: 5 },
        failureEffects: { cooperationSelf: -3 },
      },
      {
        type: "inspect",
        label: "Emergency challenge inspection",
        description: "Fast-track a challenge inspection before evidence is destroyed.",
        politicalCapitalCost: 22,
        requiresInspector: true,
        successProbability: 0.75,
        successEffects: {
          cooperationSelf: 12,
          algorithmicProgress: -4,
          globalSupport: 8,
        },
        failureEffects: { cooperationSelf: -8, politicalCapital: -5 },
      },
    ],
    catastropheEffects: { algorithmicProgress: 10, cooperationSelf: -8 },
  },

  // === POLITICAL PRESSURE ===
  {
    id: "political-pressure-economic",
    type: "political_pressure",
    regions: ["us", "eu"],
    headline: "Legislators in {region} demand loosening compute restrictions",
    description:
      "A bipartisan coalition argues that AI restrictions are costing jobs and competitiveness. They're proposing to raise FLOP thresholds by 100x.",
    hiddenDescription:
      "Lobbying funded primarily by former AI company executives and cloud computing providers seeking to resume large-scale inference services.",
    baseWeight: 8,
    minWeek: 16,
    urgencyWeeks: 6,
    responses: [
      {
        type: "negotiate",
        label: "Brief legislators",
        description:
          "Present classified threat assessments to the relevant committee.",
        politicalCapitalCost: 10,
        requiresInspector: false,
        successProbability: 0.6,
        successEffects: { cooperationSelf: 5, globalSupport: 3 },
        failureEffects: { cooperationSelf: -5, globalSupport: -5 },
      },
      {
        type: "negotiate",
        label: "Offer targeted carveouts",
        description:
          "Propose ISIA-supervised carveouts for specific safe use cases under Article IV.",
        politicalCapitalCost: 15,
        requiresInspector: false,
        successProbability: 0.75,
        successEffects: {
          cooperationSelf: 8,
          globalSupport: 5,
          politicalCapital: 5,
        },
        failureEffects: { algorithmicProgress: 3, cooperationSelf: -3 },
      },
    ],
    catastropheEffects: { politicalCapital: -15, cooperationSelf: -10 },
    weightModifier: (s: GameState) =>
      s.globalSupport < 50 ? 1.5 : 0.8,
  },

  // === WHISTLEBLOWER TIP ===
  {
    id: "whistleblower-datacenter",
    type: "whistleblower_tip",
    regions: "any",
    headline: "Whistleblower: undeclared chips in {region}",
    description:
      "An anonymous tip through ISIA secure channels reports undeclared AI chips being operated in a commercial datacenter, concealed among non-AI workloads.",
    hiddenDescription:
      "Verified: 120 H100-equivalents hidden in a cloud provider's facility, used for prohibited post-training runs during off-peak hours.",
    baseWeight: 7,
    minWeek: 10,
    urgencyWeeks: 5,
    responses: [
      {
        type: "investigate",
        label: "Verify tip anonymously",
        description: "Cross-reference with satellite data and power records.",
        politicalCapitalCost: 5,
        requiresInspector: false,
        successProbability: 0.7,
        successEffects: { cooperationSelf: 5, politicalCapital: 3 },
        failureEffects: {},
      },
      {
        type: "inspect",
        label: "Surprise inspection",
        description: "Deploy inspectors for an unannounced facility visit.",
        politicalCapitalCost: 15,
        requiresInspector: true,
        successProbability: 0.8,
        successEffects: {
          cooperationSelf: 10,
          algorithmicProgress: -3,
          globalSupport: 4,
        },
        failureEffects: { cooperationSelf: -5 },
      },
    ],
    catastropheEffects: { cooperationSelf: -5 },
    weightModifier: (s: GameState) => {
      // More tips when intelligence coverage is high
      const avgIntel =
        Object.values(s.regions).reduce(
          (sum, r) => sum + r.intelligenceCoverage,
          0,
        ) / 5;
      return avgIntel > 60 ? 1.5 : 0.7;
    },
  },

  // === NON-SIGNATORY THREAT ===
  {
    id: "non-signatory-chipfab",
    type: "non_signatory_threat",
    regions: ["row"],
    headline: "Non-signatory state constructing chip fabrication facility",
    description:
      "Intelligence indicates a non-treaty nation is building semiconductor manufacturing capability, likely with smuggled ASML equipment and expatriate engineers.",
    hiddenDescription:
      "The facility is 18 months from producing AI-capable chips at 7nm. Funded by a sovereign wealth fund seeking AI capabilities independence.",
    baseWeight: 5,
    minWeek: 30,
    urgencyWeeks: 10,
    responses: [
      {
        type: "sanction",
        label: "Economic sanctions",
        description: "Coordinate sanctions targeting the facility's supply chain.",
        politicalCapitalCost: 15,
        requiresInspector: false,
        successProbability: 0.55,
        successEffects: { globalSupport: 5 },
        failureEffects: { globalSupport: -3, cooperationSelf: -5 },
      },
      {
        type: "negotiate",
        label: "Diplomatic engagement",
        description:
          "Offer treaty membership with favorable terms in exchange for halting construction.",
        politicalCapitalCost: 20,
        requiresInspector: false,
        successProbability: 0.45,
        successEffects: { cooperationSelf: 15, globalSupport: 8 },
        failureEffects: { cooperationSelf: -5, politicalCapital: -5 },
      },
      {
        type: "protective_action",
        label: "Targeted sabotage",
        description:
          "Authorize covert operation to disable key equipment at the facility.",
        politicalCapitalCost: 30,
        requiresInspector: false,
        successProbability: 0.5,
        successEffects: { algorithmicProgress: -5, globalSupport: 3 },
        failureEffects: {
          globalSupport: -15,
          politicalCapital: -15,
          cooperationSelf: -20,
        },
      },
    ],
    catastropheEffects: { algorithmicProgress: 10, globalSupport: -5 },
    weightModifier: (s: GameState) =>
      s.week > 100 ? 1.5 : 0.5,
  },

  // === ALGORITHMIC BREAKTHROUGH ===
  {
    id: "algorithmic-breakthrough-efficiency",
    type: "algorithmic_breakthrough",
    regions: ["us", "china", "eu"],
    headline: "Major algorithmic efficiency gain reported in {region}",
    description:
      "AI researchers claim a new architecture that achieves equivalent performance with 50x less compute. The paper is spreading rapidly across preprint servers.",
    hiddenDescription:
      "The claims are verified. This fundamentally shifts the compute threshold required for dangerous capabilities. The CCC definition may need revision.",
    baseWeight: 4,
    minWeek: 40,
    urgencyWeeks: 3,
    responses: [
      {
        type: "negotiate",
        label: "Emergency threshold revision",
        description:
          "Convene the Technical Secretariat to lower FLOP thresholds and CCC definitions.",
        politicalCapitalCost: 25,
        requiresInspector: false,
        successProbability: 0.7,
        successEffects: { globalSupport: 5, algorithmicProgress: -3 },
        failureEffects: { algorithmicProgress: 8, globalSupport: -5 },
      },
      {
        type: "sanction",
        label: "Classify and suppress",
        description:
          "Invoke research restriction protocols. Remove the paper, sanction the researchers.",
        politicalCapitalCost: 20,
        requiresInspector: false,
        successProbability: 0.4,
        successEffects: { algorithmicProgress: -5 },
        failureEffects: {
          algorithmicProgress: 10,
          globalSupport: -8,
          cooperationSelf: -10,
        },
      },
    ],
    catastropheEffects: { algorithmicProgress: 15 },
    weightModifier: (s: GameState) =>
      s.algorithmicProgress > 40 ? 2.0 : 0.5,
  },

  // === CORPORATE EVASION ===
  {
    id: "corporate-evasion-cloud",
    type: "corporate_evasion",
    regions: ["us", "eu"],
    headline: "Cloud provider in {region} routing compute to evade monitoring",
    description:
      "Audit discrepancies suggest a major cloud provider is allocating monitored chips to unmonitored workloads through creative virtualization layers.",
    hiddenDescription:
      "The provider developed a software layer that reports inference workloads while actually running prohibited training in time-sliced bursts.",
    baseWeight: 6,
    minWeek: 20,
    urgencyWeeks: 5,
    responses: [
      {
        type: "investigate",
        label: "Technical audit",
        description: "Send ISIA technical staff to review virtualization logs.",
        politicalCapitalCost: 8,
        requiresInspector: false,
        successProbability: 0.65,
        successEffects: { cooperationSelf: 5, politicalCapital: 3 },
        failureEffects: { cooperationSelf: -3 },
      },
      {
        type: "inspect",
        label: "On-site inspection with forensics",
        description: "Deploy inspectors with hardware forensics capability.",
        politicalCapitalCost: 18,
        requiresInspector: true,
        successProbability: 0.8,
        successEffects: {
          cooperationSelf: 10,
          algorithmicProgress: -3,
          globalSupport: 5,
        },
        failureEffects: { cooperationSelf: -8, politicalCapital: -5 },
      },
    ],
    catastropheEffects: { algorithmicProgress: 4, politicalCapital: -8 },
  },

  // === TREATY WITHDRAWAL THREAT ===
  {
    id: "treaty-withdrawal-economic",
    type: "treaty_withdrawal_threat",
    regions: ["china", "russia"],
    headline: "{region} signals potential treaty withdrawal",
    description:
      "Senior officials publicly question the treaty's fairness, citing economic disadvantages and alleged unequal enforcement. The 12-month withdrawal clock could start any day.",
    hiddenDescription:
      "Internal communications reveal this is primarily a negotiating tactic to obtain more favorable inspection terms, but hardliners are pushing for actual withdrawal.",
    baseWeight: 5,
    minWeek: 40,
    urgencyWeeks: 8,
    responses: [
      {
        type: "negotiate",
        label: "High-level diplomatic talks",
        description:
          "Convene emergency Executive Council session to address concerns.",
        politicalCapitalCost: 20,
        requiresInspector: false,
        successProbability: 0.6,
        successEffects: { cooperationSelf: 15, globalSupport: 5 },
        failureEffects: { cooperationSelf: -10, globalSupport: -5 },
      },
      {
        type: "negotiate",
        label: "Offer concessions",
        description:
          "Propose modified inspection protocols that address sovereignty concerns.",
        politicalCapitalCost: 15,
        requiresInspector: false,
        successProbability: 0.7,
        successEffects: { cooperationSelf: 10 },
        failureEffects: { cooperationSelf: -8, globalSupport: -3 },
      },
    ],
    catastropheEffects: { cooperationSelf: -30, globalSupport: -10 },
    weightModifier: (s: GameState) => {
      const minCoop = Math.min(
        ...Object.values(s.regions).map((r) => r.cooperation),
      );
      return minCoop < 40 ? 2.0 : 0.5;
    },
  },

  // === PUBLIC BACKLASH ===
  {
    id: "public-backlash-jobs",
    type: "public_backlash",
    regions: ["us", "eu"],
    headline: "Mass protests against AI restrictions in {region}",
    description:
      "Tens of thousands march demanding an end to compute restrictions. Tech workers claim the treaty has destroyed their livelihoods. Media coverage is intensifying.",
    hiddenDescription:
      "Protest organizers include legitimate displaced workers, but funding traces back to AI company lobbying groups seeking to undermine the treaty.",
    baseWeight: 7,
    minWeek: 20,
    urgencyWeeks: 4,
    responses: [
      {
        type: "negotiate",
        label: "Public information campaign",
        description:
          "Launch a media campaign explaining the existential risks and benefits of the treaty.",
        politicalCapitalCost: 12,
        requiresInspector: false,
        successProbability: 0.55,
        successEffects: { globalSupport: 8 },
        failureEffects: { globalSupport: -5 },
      },
      {
        type: "negotiate",
        label: "Announce economic support package",
        description:
          "Propose job retraining programs and economic transition funds for affected workers.",
        politicalCapitalCost: 18,
        requiresInspector: false,
        successProbability: 0.7,
        successEffects: { globalSupport: 12, cooperationSelf: 5 },
        failureEffects: { globalSupport: -3, politicalCapital: -5 },
      },
    ],
    catastropheEffects: { globalSupport: -15, politicalCapital: -10 },
    weightModifier: (s: GameState) =>
      s.globalSupport < 50 ? 1.8 : 0.6,
  },

  // === CHIP CONSOLIDATION (early game) ===
  {
    id: "consolidation-resistance",
    type: "political_pressure",
    regions: "any",
    headline: "{region} falling behind on chip consolidation deadline",
    description:
      "With the 120-day consolidation deadline approaching, {region} reports significant resistance from datacenter operators reluctant to declare their chip inventories.",
    hiddenDescription:
      "Several operators are attempting to reclassify AI chips as general-purpose to avoid the CCC threshold declaration requirement.",
    baseWeight: 12,
    minWeek: 0,
    maxWeek: 17, // 120 days = ~17 weeks
    urgencyWeeks: 4,
    responses: [
      {
        type: "negotiate",
        label: "Assist with compliance",
        description: "Send ISIA technical staff to help operators meet requirements.",
        politicalCapitalCost: 8,
        requiresInspector: false,
        successProbability: 0.8,
        successEffects: { cooperationSelf: 8 },
        failureEffects: { cooperationSelf: -3 },
      },
      {
        type: "sanction",
        label: "Enforce compliance deadline",
        description: "Threaten penalties for non-compliance with Article V timelines.",
        politicalCapitalCost: 12,
        requiresInspector: false,
        successProbability: 0.65,
        successEffects: { cooperationSelf: 5, globalSupport: 3 },
        failureEffects: { cooperationSelf: -8, globalSupport: -3 },
      },
    ],
    catastropheEffects: { cooperationSelf: -12, algorithmicProgress: 3 },
  },

  // === LATE GAME: DISTRIBUTED TRAINING ===
  {
    id: "distributed-training-attack",
    type: "rogue_datacenter",
    regions: "any",
    headline: "Suspected distributed training across sub-CCC clusters in {region}",
    description:
      "Network traffic analysis shows coordinated compute activity across dozens of small, individually-legal chip clusters. The aggregate exceeds CCC thresholds.",
    hiddenDescription:
      "A coordinated group is using a novel distributed training protocol that splits workloads across 50+ consumer-grade clusters, each below the 16 H100-equivalent threshold.",
    baseWeight: 5,
    minWeek: 80,
    urgencyWeeks: 4,
    responses: [
      {
        type: "investigate",
        label: "Network forensics",
        description: "Analyze traffic patterns to map the distributed cluster.",
        politicalCapitalCost: 12,
        requiresInspector: false,
        successProbability: 0.5,
        successEffects: { cooperationSelf: 8, algorithmicProgress: -3 },
        failureEffects: { algorithmicProgress: 5 },
      },
      {
        type: "negotiate",
        label: "Lower CCC threshold",
        description:
          "Emergency Director-General action to reduce the CCC definition from 16 to 8 H100-equivalents.",
        politicalCapitalCost: 25,
        requiresInspector: false,
        successProbability: 0.6,
        successEffects: {
          globalSupport: -5,
          algorithmicProgress: -5,
          politicalCapital: -5,
        },
        failureEffects: {
          globalSupport: -10,
          cooperationSelf: -10,
        },
      },
    ],
    catastropheEffects: { algorithmicProgress: 12, cooperationSelf: -10 },
    weightModifier: (s: GameState) =>
      s.algorithmicProgress > 50 ? 2.0 : 0.3,
  },

  // === CONSUMER HARDWARE BREAKTHROUGH ===
  {
    id: "consumer-hardware-breakthrough",
    type: "algorithmic_breakthrough",
    regions: ["us", "china"],
    headline: "Consumer GPUs now viable for AI training in {region}",
    description:
      "New open-source software makes it feasible to train capable models on consumer gaming hardware. The verification regime based on AI chip tracking may be undermined.",
    hiddenDescription:
      "Combined with recent algorithmic efficiency gains, consumer hardware can now achieve in weeks what required datacenter-scale compute just years ago.",
    baseWeight: 3,
    minWeek: 100,
    urgencyWeeks: 3,
    responses: [
      {
        type: "negotiate",
        label: "Expand treaty scope",
        description:
          "Emergency threshold revision to cover consumer hardware above new capability levels.",
        politicalCapitalCost: 30,
        requiresInspector: false,
        successProbability: 0.45,
        successEffects: { algorithmicProgress: -5 },
        failureEffects: {
          algorithmicProgress: 10,
          globalSupport: -10,
        },
      },
      {
        type: "sanction",
        label: "Suppress the software",
        description:
          "Classify the training framework as restricted research and pursue takedowns.",
        politicalCapitalCost: 20,
        requiresInspector: false,
        successProbability: 0.35,
        successEffects: { algorithmicProgress: -3 },
        failureEffects: {
          algorithmicProgress: 8,
          globalSupport: -8,
        },
      },
    ],
    catastropheEffects: { algorithmicProgress: 20 },
    weightModifier: (s: GameState) =>
      s.algorithmicProgress > 60 ? 2.5 : 0.2,
  },

  // === POSITIVE EVENT: SAFETY BREAKTHROUGH ===
  {
    id: "safety-research-progress",
    type: "whistleblower_tip",
    regions: ["us", "eu"],
    headline: "Major safety research milestone in {region}",
    description:
      "ISIA-funded researchers report a significant breakthrough in human intelligence augmentation trials. Cognitive enhancement results exceed expectations.",
    hiddenDescription:
      "Phase II clinical trials show a 40% improvement in complex reasoning tasks. This could accelerate the off-ramp timeline significantly.",
    baseWeight: 4,
    minWeek: 60,
    urgencyWeeks: 8,
    responses: [
      {
        type: "fund_safety",
        label: "Increase research funding",
        description: "Allocate additional political capital to accelerate this line of research.",
        politicalCapitalCost: 15,
        requiresInspector: false,
        successProbability: 0.85,
        successEffects: {
          safetyResearchProgress: 5,
          globalSupport: 5,
        },
        failureEffects: { politicalCapital: -3 },
      },
      {
        type: "negotiate",
        label: "Share results internationally",
        description:
          "Distribute findings to all treaty parties to build confidence in the off-ramp.",
        politicalCapitalCost: 5,
        requiresInspector: false,
        successProbability: 0.9,
        successEffects: {
          globalSupport: 8,
          safetyResearchProgress: 3,
        },
        failureEffects: {},
      },
    ],
    catastropheEffects: { safetyResearchProgress: -2 },
    weightModifier: (s: GameState) =>
      s.resources.safetyResearchProgress > 30 ? 1.5 : 0.5,
  },
];
