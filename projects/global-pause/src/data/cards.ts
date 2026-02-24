import type { CardTemplate, GameState } from "../engine/types";

// Helper: check if a specific card+choice is in recent history
function recentChoice(
  state: GameState,
  cardId: string,
  choice: "left" | "right",
  withinTurns = 10,
): boolean {
  return state.history
    .slice(-withinTurns)
    .some((h) => h.cardId === cardId && h.choice === choice);
}

export const CARD_TEMPLATES: CardTemplate[] = [
  // --- ROUTINE EVENTS (high base weight, always available) ---
  {
    id: "budget-review",
    speaker: "Chief Financial Officer",
    text: "Quarterly budget review. Member states are asking where their money goes. Do we publish a full transparency report or keep operational details classified?",
    left: {
      label: "Full transparency",
      effects: [
        { resource: "trust", delta: 8 },
        { resource: "intel", delta: -5 },
      ],
      previews: [
        { resource: "trust", direction: "up", size: "small" },
        { resource: "intel", direction: "down", size: "small" },
      ],
    },
    right: {
      label: "Keep it classified",
      effects: [
        { resource: "trust", delta: -5 },
        { resource: "intel", delta: 6 },
      ],
      previews: [
        { resource: "trust", direction: "down", size: "small" },
        { resource: "intel", direction: "up", size: "small" },
      ],
    },
    weight: () => 2,
  },
  {
    id: "un-speech",
    speaker: "Communications Director",
    text: "The UN General Assembly wants you to give a keynote on AI safety progress. Big stage, big promises expected.",
    left: {
      label: "Bold promises",
      effects: [
        { resource: "trust", delta: 12 },
        { resource: "leverage", delta: 5 },
      ],
      previews: [
        { resource: "trust", direction: "up", size: "large" },
        { resource: "leverage", direction: "up", size: "small" },
      ],
    },
    right: {
      label: "Cautious honesty",
      effects: [
        { resource: "trust", delta: -3 },
        { resource: "leverage", delta: -4 },
      ],
      previews: [
        { resource: "trust", direction: "down", size: "small" },
        { resource: "leverage", direction: "down", size: "small" },
      ],
    },
    weight: () => 1.5,
  },
  {
    id: "hiring-spree",
    speaker: "Head of Human Resources",
    text: "We have openings for 200 new inspectors. Aggressive hiring would boost our capabilities but the cost is significant.",
    left: {
      label: "Hire aggressively",
      effects: [
        { resource: "funding", delta: -15 },
        { resource: "intel", delta: 10 },
      ],
      previews: [
        { resource: "funding", direction: "down", size: "large" },
        { resource: "intel", direction: "up", size: "large" },
      ],
    },
    right: {
      label: "Hire conservatively",
      effects: [
        { resource: "funding", delta: -3 },
        { resource: "intel", delta: 3 },
      ],
      previews: [
        { resource: "funding", direction: "down", size: "small" },
        { resource: "intel", direction: "up", size: "small" },
      ],
    },
    weight: () => 1.5,
  },
  {
    id: "lobby-meeting",
    speaker: "Political Advisor",
    text: "Tech industry lobbyists want a private meeting. They're offering 'cooperation' but probably want concessions on compute limits.",
    left: {
      label: "Take the meeting",
      effects: [
        { resource: "funding", delta: 10 },
        { resource: "leverage", delta: -8 },
      ],
      previews: [
        { resource: "funding", direction: "up", size: "small" },
        { resource: "leverage", direction: "down", size: "small" },
      ],
    },
    right: {
      label: "Decline politely",
      effects: [
        { resource: "trust", delta: 5 },
        { resource: "funding", delta: -5 },
      ],
      previews: [
        { resource: "trust", direction: "up", size: "small" },
        { resource: "funding", direction: "down", size: "small" },
      ],
    },
    weight: () => 2,
  },
  {
    id: "media-interview",
    speaker: "Press Secretary",
    text: "A major outlet wants an exclusive interview about ISIA operations. Great exposure, but they'll ask tough questions.",
    left: {
      label: "Do the interview",
      effects: [
        { resource: "trust", delta: 7 },
        { resource: "intel", delta: -4 },
      ],
      previews: [
        { resource: "trust", direction: "up", size: "small" },
        { resource: "intel", direction: "down", size: "small" },
      ],
    },
    right: {
      label: "No comment",
      effects: [
        { resource: "trust", delta: -6 },
        { resource: "intel", delta: 3 },
      ],
      previews: [
        { resource: "trust", direction: "down", size: "small" },
        { resource: "intel", direction: "up", size: "small" },
      ],
    },
    weight: () => 2,
  },

  // --- INCIDENTS (moderate weight, state-dependent) ---
  {
    id: "rogue-lab-normal",
    speaker: "Intelligence Analyst",
    text: "Thermal anomaly near Shenzhen industrial zone. Signature consistent with an undeclared compute cluster running prohibited training.",
    left: {
      label: "Send inspectors",
      effects: [
        { resource: "funding", delta: -12 },
        { resource: "intel", delta: 8 },
        { resource: "leverage", delta: 5 },
      ],
      previews: [
        { resource: "funding", direction: "down", size: "large" },
        { resource: "intel", direction: "up", size: "small" },
        { resource: "leverage", direction: "up", size: "small" },
      ],
    },
    right: {
      label: "Flag for next quarter",
      effects: [
        { resource: "trust", delta: -5 },
        { resource: "intel", delta: -3 },
      ],
      previews: [
        { resource: "trust", direction: "down", size: "small" },
        { resource: "intel", direction: "down", size: "small" },
      ],
    },
    weight: (s) => (s.resources.intel >= 40 ? 1.5 : 0),
  },
  {
    id: "rogue-lab-degraded",
    speaker: "Junior Analyst",
    text: "There are... rumors of unauthorized compute usage somewhere in East Asia. We can't pin it down with our current intelligence.",
    left: {
      label: "Expensive investigation",
      effects: [
        { resource: "funding", delta: -18 },
        { resource: "intel", delta: 5 },
      ],
      previews: [
        { resource: "funding", direction: "down", size: "large" },
        { resource: "intel", direction: "up", size: "small" },
      ],
    },
    right: {
      label: "Ignore the rumors",
      effects: [
        { resource: "trust", delta: -3 },
        { resource: "intel", delta: -6 },
      ],
      previews: [
        { resource: "trust", direction: "down", size: "small" },
        { resource: "intel", direction: "down", size: "small" },
      ],
    },
    weight: (s) => (s.resources.intel < 40 ? 1.5 : 0),
  },
  {
    id: "chip-smuggling",
    speaker: "Customs Liaison",
    text: "Border agents intercepted a container with 48 H100 GPUs hidden inside networking equipment. Trail leads to a shell company.",
    left: {
      label: "Full investigation",
      effects: [
        { resource: "funding", delta: -8 },
        { resource: "intel", delta: 6 },
        { resource: "trust", delta: 4 },
      ],
      previews: [
        { resource: "funding", direction: "down", size: "small" },
        { resource: "intel", direction: "up", size: "small" },
        { resource: "trust", direction: "up", size: "small" },
      ],
    },
    right: {
      label: "Seize and move on",
      effects: [
        { resource: "intel", delta: -4 },
        { resource: "leverage", delta: 3 },
      ],
      previews: [
        { resource: "intel", direction: "down", size: "small" },
        { resource: "leverage", direction: "up", size: "small" },
      ],
    },
    weight: () => 1.5,
  },
  {
    id: "whistleblower",
    speaker: "Anonymous Source",
    text: "A researcher at a major lab claims they've been running prohibited capability evaluations in secret. They want protection.",
    left: {
      label: "Protect and investigate",
      effects: [
        { resource: "funding", delta: -10 },
        { resource: "intel", delta: 12 },
        { resource: "trust", delta: 5 },
      ],
      previews: [
        { resource: "funding", direction: "down", size: "small" },
        { resource: "intel", direction: "up", size: "large" },
        { resource: "trust", direction: "up", size: "small" },
      ],
    },
    right: {
      label: "Too risky, decline",
      effects: [
        { resource: "trust", delta: -8 },
        { resource: "intel", delta: -5 },
      ],
      previews: [
        { resource: "trust", direction: "down", size: "small" },
        { resource: "intel", direction: "down", size: "small" },
      ],
    },
    weight: () => 1,
  },

  // --- POLITICAL EVENTS (leverage-heavy) ---
  {
    id: "treaty-threat",
    speaker: "Diplomatic Attaché",
    text: "A major signatory is threatening to withdraw from the treaty. They say enforcement is too aggressive. Or maybe not aggressive enough.",
    left: {
      label: "Offer concessions",
      effects: [
        { resource: "leverage", delta: -10 },
        { resource: "trust", delta: -5 },
        { resource: "funding", delta: 8 },
      ],
      previews: [
        { resource: "leverage", direction: "down", size: "large" },
        { resource: "trust", direction: "down", size: "small" },
        { resource: "funding", direction: "up", size: "small" },
      ],
    },
    right: {
      label: "Stand firm",
      effects: [
        { resource: "leverage", delta: 8 },
        { resource: "funding", delta: -10 },
      ],
      previews: [
        { resource: "leverage", direction: "up", size: "small" },
        { resource: "funding", direction: "down", size: "large" },
      ],
    },
    weight: (s) => (s.turn >= 5 ? 1.5 : 0),
  },
  {
    id: "senate-hearing",
    speaker: "Political Advisor",
    text: "The US Senate wants you to testify about ISIA effectiveness. They're skeptical. Your performance here affects American funding.",
    left: {
      label: "Show strength",
      effects: [
        { resource: "leverage", delta: 10 },
        { resource: "trust", delta: -5 },
      ],
      previews: [
        { resource: "leverage", direction: "up", size: "large" },
        { resource: "trust", direction: "down", size: "small" },
      ],
    },
    right: {
      label: "Ask for patience",
      effects: [
        { resource: "trust", delta: 5 },
        { resource: "funding", delta: -8 },
      ],
      previews: [
        { resource: "trust", direction: "up", size: "small" },
        { resource: "funding", direction: "down", size: "small" },
      ],
    },
    weight: (s) => (s.turn >= 3 ? 1 : 0),
  },

  // --- HISTORY-TRIGGERED CARDS ---
  {
    id: "whistleblower-fallout",
    speaker: "Legal Counsel",
    text: "The lab you investigated after the whistleblower tip is suing ISIA for overreach. This could set a dangerous precedent.",
    left: {
      label: "Fight in court",
      effects: [
        { resource: "funding", delta: -15 },
        { resource: "leverage", delta: 8 },
      ],
      previews: [
        { resource: "funding", direction: "down", size: "large" },
        { resource: "leverage", direction: "up", size: "small" },
      ],
    },
    right: {
      label: "Settle quietly",
      effects: [
        { resource: "trust", delta: -8 },
        { resource: "funding", delta: -5 },
      ],
      previews: [
        { resource: "trust", direction: "down", size: "small" },
        { resource: "funding", direction: "down", size: "small" },
      ],
    },
    weight: (s) =>
      recentChoice(s, "whistleblower", "left") ? 3 : 0,
  },
  {
    id: "coverup-leak",
    speaker: "Press Secretary",
    text: "Someone leaked that you declined to protect a whistleblower. The press is running with 'ISIA ignores insider tips.'",
    left: {
      label: "Issue a statement",
      effects: [
        { resource: "trust", delta: -5 },
        { resource: "leverage", delta: -3 },
      ],
      previews: [
        { resource: "trust", direction: "down", size: "small" },
        { resource: "leverage", direction: "down", size: "small" },
      ],
    },
    right: {
      label: "Ride it out",
      effects: [
        { resource: "trust", delta: -10 },
      ],
      previews: [
        { resource: "trust", direction: "down", size: "large" },
      ],
    },
    weight: (s) =>
      recentChoice(s, "whistleblower", "right") ? 3 : 0,
  },

  // --- CRISIS EVENTS (appear when bars are extreme) ---
  {
    id: "funding-crisis",
    speaker: "Chief Financial Officer",
    text: "We're running dangerously low on funds. Emergency options only: either cut programs or beg member states for emergency funding.",
    left: {
      label: "Emergency appeal",
      effects: [
        { resource: "funding", delta: 15 },
        { resource: "leverage", delta: -10 },
      ],
      previews: [
        { resource: "funding", direction: "up", size: "large" },
        { resource: "leverage", direction: "down", size: "large" },
      ],
    },
    right: {
      label: "Cut programs",
      effects: [
        { resource: "funding", delta: 8 },
        { resource: "intel", delta: -12 },
      ],
      previews: [
        { resource: "funding", direction: "up", size: "small" },
        { resource: "intel", direction: "down", size: "large" },
      ],
    },
    weight: (s) => (s.resources.funding < 20 ? 5 : 0),
    color: "#ef4444",
  },
  {
    id: "trust-crisis",
    speaker: "Communications Director",
    text: "Public approval is cratering. Protests outside ISIA headquarters. We need a dramatic gesture to restore confidence.",
    left: {
      label: "Major transparency push",
      effects: [
        { resource: "trust", delta: 15 },
        { resource: "intel", delta: -10 },
      ],
      previews: [
        { resource: "trust", direction: "up", size: "large" },
        { resource: "intel", direction: "down", size: "large" },
      ],
    },
    right: {
      label: "Crackdown on critics",
      effects: [
        { resource: "trust", delta: 5 },
        { resource: "leverage", delta: 10 },
      ],
      previews: [
        { resource: "trust", direction: "up", size: "small" },
        { resource: "leverage", direction: "up", size: "large" },
      ],
    },
    weight: (s) => (s.resources.trust < 20 ? 5 : 0),
    color: "#ef4444",
  },
  {
    id: "surveillance-backlash",
    speaker: "Civil Liberties Advocate",
    text: "Your intelligence network has grown too powerful. Three nations are demanding you dismantle monitoring programs or they walk.",
    left: {
      label: "Scale back surveillance",
      effects: [
        { resource: "intel", delta: -15 },
        { resource: "trust", delta: 8 },
      ],
      previews: [
        { resource: "intel", direction: "down", size: "large" },
        { resource: "trust", direction: "up", size: "small" },
      ],
    },
    right: {
      label: "Defend the programs",
      effects: [
        { resource: "intel", delta: 5 },
        { resource: "leverage", delta: -10 },
      ],
      previews: [
        { resource: "intel", direction: "up", size: "small" },
        { resource: "leverage", direction: "down", size: "large" },
      ],
    },
    weight: (s) => (s.resources.intel > 80 ? 5 : 0),
    color: "#f97316",
  },
  {
    id: "power-grab-accusation",
    speaker: "UN Secretary-General",
    text: "Multiple delegations accuse you of empire-building. 'The Director-General answers to no one,' they say. They want oversight reforms.",
    left: {
      label: "Accept oversight",
      effects: [
        { resource: "leverage", delta: -15 },
        { resource: "trust", delta: 10 },
      ],
      previews: [
        { resource: "leverage", direction: "down", size: "large" },
        { resource: "trust", direction: "up", size: "large" },
      ],
    },
    right: {
      label: "Resist reforms",
      effects: [
        { resource: "leverage", delta: 5 },
        { resource: "trust", delta: -12 },
      ],
      previews: [
        { resource: "leverage", direction: "up", size: "small" },
        { resource: "trust", direction: "down", size: "large" },
      ],
    },
    weight: (s) => (s.resources.leverage > 80 ? 5 : 0),
    color: "#f97316",
  },

  // --- FILLER / COLOR ---
  {
    id: "coffee-chat",
    speaker: "Deputy Director",
    text: "Quiet day at ISIA. Your deputy suggests using the downtime for either staff morale events or catching up on intelligence briefings.",
    left: {
      label: "Staff morale day",
      effects: [
        { resource: "trust", delta: 3 },
        { resource: "funding", delta: -2 },
      ],
      previews: [
        { resource: "trust", direction: "up", size: "small" },
        { resource: "funding", direction: "down", size: "small" },
      ],
    },
    right: {
      label: "Intelligence briefings",
      effects: [
        { resource: "intel", delta: 4 },
        { resource: "trust", delta: -2 },
      ],
      previews: [
        { resource: "intel", direction: "up", size: "small" },
        { resource: "trust", direction: "down", size: "small" },
      ],
    },
    weight: () => 3,
  },
  {
    id: "conference-invite",
    speaker: "Executive Assistant",
    text: "You've been invited to speak at the World Economic Forum. Good for visibility but uses political capital.",
    left: {
      label: "Attend and network",
      effects: [
        { resource: "leverage", delta: 6 },
        { resource: "funding", delta: 5 },
        { resource: "trust", delta: -3 },
      ],
      previews: [
        { resource: "leverage", direction: "up", size: "small" },
        { resource: "funding", direction: "up", size: "small" },
        { resource: "trust", direction: "down", size: "small" },
      ],
    },
    right: {
      label: "Send a deputy",
      effects: [
        { resource: "trust", delta: 3 },
        { resource: "leverage", delta: -3 },
      ],
      previews: [
        { resource: "trust", direction: "up", size: "small" },
        { resource: "leverage", direction: "down", size: "small" },
      ],
    },
    weight: () => 1.5,
  },
];
