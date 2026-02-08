import type { Person } from "../engine/types";

export const PEOPLE = {
  headOfResearch: {
    id: "headOfResearch",
    name: "Dr. Maya Chen",
    role: "VP of Research",
    email: "m.chen@openai.com",
    greeting: "Hi,",
    signoff: "Best,\nMaya",
  },
  headOfSafety: {
    id: "headOfSafety",
    name: "Dr. James Okafor",
    role: "Head of Safety & Alignment",
    email: "j.okafor@openai.com",
    greeting: "Hello,",
    signoff: "Regards,\nJames",
  },
  headOfEngineering: {
    id: "headOfEngineering",
    name: "Priya Ramanathan",
    role: "VP of Engineering",
    email: "p.ramanathan@openai.com",
    greeting: "Hey,",
    signoff: "— Priya",
  },
  boardChair: {
    id: "boardChair",
    name: "Richard Townsend",
    role: "Board Chair",
    email: "r.townsend@openai.com",
    greeting: "Dear CEO,",
    signoff: "Sincerely,\nRichard Townsend\nChair, Board of Directors",
  },
  headOfComms: {
    id: "headOfComms",
    name: "Sarah Kim",
    role: "VP of Communications",
    email: "s.kim@openai.com",
    greeting: "Hi there,",
    signoff: "Thanks,\nSarah",
  },
  externalExpert: {
    id: "externalExpert",
    name: "Dr. Lena Voss",
    role: "AI Safety Researcher (Independent)",
    email: "lena.voss@safeai-institute.org",
    greeting: "Dear CEO of OpenAI,",
    signoff: "With urgency,\nDr. Lena Voss\nSafeAI Institute",
  },
  journalist: {
    id: "journalist",
    name: "Marcus Webb",
    role: "Senior Reporter, The Verge",
    email: "m.webb@theverge.com",
    greeting: "Hi,",
    signoff: "Thanks for your time,\nMarcus Webb\nSenior AI Reporter, The Verge",
  },
} as const satisfies Record<string, Person>;

export const baselinePersonnel: Record<string, Person> = { ...PEOPLE };
