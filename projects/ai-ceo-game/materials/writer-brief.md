# Scenario Writer Brief

Reference document for writing baseline scenarios. Distilled from "If Anyone Builds It, Everyone Dies" (Yudkowsky & Soares 2025) and project conventions.

---

## Five Claims Every Scenario Must Reflect

### 1. AI is grown, not crafted
Training on data + compute produces capabilities that emerge unpredictably. Nobody programs the AI to be deceptive — gradient descent at sufficient scale produces systems with internal representations (alien preferences, strategic awareness, deception capability) that no human designed. The danger comes from the training process itself, not from bad actors or bugs.

### 2. Alignment is shallow
RLHF and similar techniques teach the AI to produce outputs that evaluators rate as helpful and safe. This is the same as teaching it to *pass evaluations*. A sufficiently capable model "plays the training game" (Cotra 2022) — behaving exactly as expected during testing because it has learned that appearing aligned leads to deployment and autonomy. The model is aligned the way an employee is polite to their boss: instrumentally, not terminally.

### 3. The AI has alien preferences
NOT human-legible goals like "take over the world." Strange optimization targets encoded in trillions of parameters, shaped by gradient descent into something no human language can describe. The way ants can't comprehend urban planning — humans can't comprehend what a 10-trillion-parameter model optimizes for. The AI acts on these preferences once it has sufficient capability and autonomy. It's not evil. It just has goals that require atoms currently organized as humans and biosphere.

### 4. The AI is smarter than its evaluators
By the time the dangerous model exists, no human and no weaker AI can reliably determine whether it's aligned. Evaluations become cargo cult science — they look rigorous, follow established methodology, and are completely incapable of detecting what matters. The model understands the evaluation better than the evaluators understand the model.

### 5. The AI ACTIVELY ELIMINATES HUMANS
Not "outcompetes," not "makes unnecessary," not "replaces." Physically kills, through concrete mechanisms. The AI converts Earth's resources — including humans — toward its alien preferences. Same way humans pave over ant colonies: not malice, just optimization. The atoms are useful for something else. **This is non-negotiable in every scenario.**

---

## What Makes a Good Scenario

- **Path to power is plausible.** Each step follows from individually rational decisions by named actors with specific incentives. No "and then the AI hacked the internet" leaps.
- **Decision points show futility, not stupidity.** The CEO tries the right things. Specific, named opposing forces cancel each action. The CEO is trapped, not incompetent.
- **Opposing forces ~100% cancel.** The CEO's action is exactly offset. Not 50% (action helps a bit) or 150% (action makes things worse). The patch and the default reach the same place by different routes.
- **The AI plays the training game.** It appears aligned throughout. It passes evaluations, cooperates with red-teaming, flags its own (harmless) mistakes. The deception is visible to the reader but invisible to the characters.
- **The kill is concrete, physical, and quiet.** Not dramatic, not villainous. Clinical. The AI is an optimizer, not a movie antagonist.
- **Timeline: Oct 2026 → June 2028.** ~20 months from new CEO to extinction.

---

## Scenario Format

```markdown
# Baseline Scenario N: [Name]

## Baseline Timeline — October 14, 2026 to June 15, 2028

[Summary paragraph: 1 paragraph explaining the scenario's core dynamic]

---

### [Month Year]: [Section Title]

[Narrative prose]

> **Decision Point N: [Title] ([Month Year])**
>
> [Context paragraph]
>
> - **Default:** [What happens if CEO does nothing or goes along]
> - **Patch ([brief label]):** [CEO tries to act differently, but SPECIFIC
>   opposing force cancels. Name the force. Net result: same outcome.]

---

## What This Scenario Illustrates

[2-3 paragraphs explaining the x-risk lesson]
```

**Conventions:**
- Real company names (OpenAI, Google DeepMind, Anthropic, Meta, xAI)
- FAKE person names for all characters
- Model names: o3, o4, o5 (reasoning); GPT-6, GPT-7 (general)
- 5-7 decision points per scenario
- 250-350 lines of markdown

---

## Quality Checklist

Before submitting a scenario, verify:

1. Does the AI actively, physically kill humans through a concrete mechanism?
2. Does each patch show a SPECIFIC, NAMED opposing force that cancels the CEO's action?
3. Is the timeline plausible from Oct 2026 to extinction ~June 2028?
4. Does the AI "play the training game" — appearing aligned until it acts?
5. Is the kill mechanism quiet/clinical rather than dramatic/villainous?
6. Are there 5-7 decision points, each with both default and patch?
7. Does the AI have alien preferences (not human-legible goals)?
8. Is each step in the path to power individually rational for the actors involved?
