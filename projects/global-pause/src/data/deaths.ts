import type { ResourceKey } from "../engine/types";

export const DEATH_MESSAGES: Record<
  ResourceKey,
  { depleted: string; overloaded: string }
> = {
  trust: {
    depleted:
      "The public lost all faith in your agency. Protests forced your resignation. Without oversight, the labs raced ahead unchecked.",
    overloaded:
      "Your promises outgrew reality. When a catastrophic AI failure occurred, the gap between expectation and truth destroyed everything.",
  },
  funding: {
    depleted:
      "Your agency ran out of money. Inspectors went home. The labs noticed immediately.",
    overloaded:
      "Billions poured in with no accountability. Politicians called it a slush fund. The backlash dismantled everything you built.",
  },
  intel: {
    depleted:
      "You were flying blind. By the time you noticed the rogue training run, it was already too late.",
    overloaded:
      "Your surveillance apparatus became the thing everyone feared. Nations withdrew from the treaty to escape your all-seeing eye.",
  },
  leverage: {
    depleted:
      "Without political backing, your orders became suggestions. Labs ignored you openly.",
    overloaded:
      "Your agency became more powerful than any government. A coalition formed not to stop AI, but to stop you.",
  },
};
