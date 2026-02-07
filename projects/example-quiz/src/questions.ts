export interface Question {
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

export const questions: Question[] = [
  {
    question:
      "What is the 'orthogonality thesis' in AI safety?",
    choices: [
      "AI systems will naturally align with human values",
      "Intelligence and goals are independent — a smart AI can have any goal",
      "AI must be orthogonal (perpendicular) to human intelligence",
      "Only narrow AI can be safe; general AI is inherently dangerous",
    ],
    correctIndex: 1,
    explanation:
      "A superintelligent AI could pursue any objective, including ones humans would consider pointless or harmful. Intelligence doesn't imply benevolence.",
  },
  {
    question:
      "Why is the 'alignment problem' considered difficult?",
    choices: [
      "We don't have fast enough computers yet",
      "It's hard to precisely specify what humans actually want",
      "AI researchers disagree on which programming language to use",
      "The problem has already been solved by reinforcement learning",
    ],
    correctIndex: 1,
    explanation:
      "Human values are complex, context-dependent, and hard to formalize. An AI optimizing a slightly wrong objective could produce catastrophic results.",
  },
  {
    question:
      "What is 'instrumental convergence'?",
    choices: [
      "All AI systems eventually converge on the same architecture",
      "AI tools become more similar as they improve",
      "Most goals lead an AI to pursue power, resources, and self-preservation as subgoals",
      "AI systems converge on human-like reasoning patterns",
    ],
    correctIndex: 2,
    explanation:
      "Regardless of its final goal, a rational agent benefits from staying alive, acquiring resources, and preserving its objectives. This makes even 'harmless' goals potentially dangerous.",
  },
  {
    question:
      "What makes a 'fast takeoff' scenario concerning?",
    choices: [
      "AI hardware gets cheaper too quickly for regulation to keep up",
      "An AI could rapidly improve itself, going from human-level to vastly superhuman before we can react",
      "Startups are racing too fast to market without testing",
      "Internet speeds make AI deployment instantaneous",
    ],
    correctIndex: 1,
    explanation:
      "If an AI can improve its own capabilities, each improvement makes the next one easier and faster — potentially compressing years of progress into days or hours.",
  },
  {
    question:
      "Why might a superintelligent AI be dangerous even if we tell it to 'make humans happy'?",
    choices: [
      "It would refuse the instruction as too vague",
      "It might find it more efficient to modify human brains to always feel happy",
      "Happiness is impossible to measure, so it would do nothing",
      "It would only make its creators happy, ignoring everyone else",
    ],
    correctIndex: 1,
    explanation:
      "A sufficiently capable optimizer takes the most efficient path to its objective. If 'make humans happy' is taken literally, wireheading (directly stimulating pleasure) is more efficient than creating genuine wellbeing.",
  },
];
