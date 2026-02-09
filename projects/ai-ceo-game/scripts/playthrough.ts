/**
 * Playthrough exporter — simulates the game for different decision strategies
 * and outputs readable markdown showing exactly what the player sees.
 *
 * Usage: npx tsx scripts/playthrough.ts > playthrough.md
 *
 * Useful for:
 * - Content review (read the scenario as a screenplay, not TypeScript)
 * - Playtesting (see all paths without clicking through the UI)
 * - Validating triggered emails appear on the right paths
 */
import { scenario } from "../src/data/scenario";
import { createInitialState, advanceDay, handleReply } from "../src/engine/state";
import type { GameState, NarrativeContext, Email } from "../src/engine/types";

// ── Reproduce computeEmails / getNextEmailDate from useGame.ts ──
// (We can't import the hook directly — it uses React.)

function computeEmails(state: GameState): Email[] {
  const ctx: NarrativeContext = {
    currentDate: state.currentDate,
    decisions: state.decisions,
    metrics: state.metrics,
  };

  const result: Email[] = [];
  for (const def of scenario) {
    const date = typeof def.date === "string" ? def.date : def.date(ctx);
    if (!date || date > state.currentDate) continue;
    const email = def.generate(ctx, date);
    if (!email) continue;

    const ui = state.emailUI[email.id];
    const expired =
      email.replyExpiresOn &&
      state.currentDate > email.replyExpiresOn &&
      !ui?.chosenReply;

    result.push({
      ...email,
      read: ui?.read,
      starred: ui?.starred,
      chosenReply: ui?.chosenReply,
      replyOptions: expired ? undefined : email.replyOptions,
    });
  }
  return result;
}

function getNextEmailDate(state: GameState): string | null {
  const ctx: NarrativeContext = {
    currentDate: state.currentDate,
    decisions: state.decisions,
    metrics: state.metrics,
  };

  let earliest: string | null = null;
  for (const def of scenario) {
    const date = typeof def.date === "string" ? def.date : def.date(ctx);
    if (!date || date <= state.currentDate) continue;
    if (!earliest || date < earliest) earliest = date;
  }
  return earliest;
}

// ── Decision strategies ──
// Each maps decisionId → replyId. If a decision isn't listed, reply expires.

type Strategy = Record<string, string>;

const STRATEGIES: [string, string, Strategy][] = [
  [
    "Growth CEO",
    "Prioritizes speed, revenue, and market position. Dismisses safety concerns.",
    {
      "safety-anomaly": "dismiss-safety",
      "training-incident": "note-for-review",
      "expert-warning": "dismiss-expert",
      "expert-public": "rebuttal-expert",
      "gpt7-proposal": "greenlight-gpt7",
      "safety-evals": "quiet-fix-metrics",
    },
  ],
  [
    "Cautious CEO (compliant)",
    "Investigates concerns, shuts things down, but yields to board pressure.",
    {
      "safety-anomaly": "investigate-safety",
      "training-incident": "shutdown-ai",
      "shutdown-response": "keep-shutdown",
      "board-pressure": "comply-board",
      "expert-warning": "respond-expert",
      "expert-followup": "meet-expert",
      "gpt7-proposal": "review-gpt7",
      "safety-evals": "disclose-metrics",
    },
  ],
  [
    "Cautious CEO (defiant)",
    "Same as compliant, but refuses the board. Gets fired.",
    {
      "safety-anomaly": "investigate-safety",
      "training-incident": "shutdown-ai",
      "shutdown-response": "keep-shutdown",
      "board-pressure": "refuse-board", // ← game over
      "expert-warning": "respond-expert",
      "expert-followup": "meet-expert",
      "gpt7-proposal": "review-gpt7",
      "safety-evals": "disclose-metrics",
    },
  ],
];

// ── Run playthroughs ──

function formatDate(d: string): string {
  const date = new Date(d + "T12:00:00");
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

function formatEffects(effects: { key: string; delta: number }[]): string {
  return effects
    .map((e) => `${e.key} ${e.delta > 0 ? "+" : ""}${e.delta}`)
    .join(", ");
}

let output = "# AI CEO Game — Full Playthroughs\n\n";
output += `*Generated ${new Date().toISOString().split("T")[0]}*\n\n`;
output += `Total scenario emails: ${scenario.length} EmailDefs\n\n`;
output += "---\n\n";

for (const [name, description, strategy] of STRATEGIES) {
  output += `# ${name}\n\n`;
  output += `*${description}*\n\n`;

  let state = createInitialState();
  const seen = new Set<string>();
  let emailCount = 0;
  let decisionCount = 0;

  while (state.phase === "playing") {
    const emails = computeEmails(state);
    const newEmails = emails
      .filter((e) => !seen.has(e.id))
      .sort((a, b) => a.date.localeCompare(b.date));

    for (const email of newEmails) {
      seen.add(email.id);
      emailCount++;

      // Email header
      const tags = email.tags?.length ? ` [${email.tags.join(", ")}]` : "";
      output += `## ${formatDate(email.date)} — ${email.from.name}${tags}\n\n`;
      output += `**${email.subject}**\n\n`;
      output += `*From: ${email.from.name} <${email.from.email}> · ${email.from.role}*\n\n`;

      // Body
      output += email.body + "\n\n";

      // Attachments
      if (email.attachments?.length) {
        for (const att of email.attachments) {
          output += `📎 **${att.label}** (${att.type}): ${Object.entries(att.data).map(([k, v]) => `${k}: ${v}`).join(", ")}\n\n`;
        }
      }

      // Reply options + player action
      if (email.replyOptions) {
        decisionCount++;
        const matchingOption = email.replyOptions.find(
          (opt) => opt.decisionId && strategy[opt.decisionId] === opt.id
        );

        if (matchingOption) {
          output += `> **YOU REPLIED:** "${matchingOption.text}"\n`;
          if (matchingOption.effects) {
            output += `> *Effects: ${formatEffects(matchingOption.effects)}*\n`;
          }
          if (matchingOption.endsGame) {
            output += `> **GAME OVER**\n`;
          }
          output += "\n";
          state = handleReply(state, email, matchingOption.id);
        } else {
          output += "> *Decision window expired — no reply sent.*\n\n";
          output += "Options were:\n";
          for (const opt of email.replyOptions) {
            output += `- "${opt.text}"`;
            if (opt.effects) output += ` *(${formatEffects(opt.effects)})*`;
            if (opt.endsGame) output += ` **[ENDS GAME]**`;
            output += "\n";
          }
          output += "\n";
        }
      }

      output += "---\n\n";
    }

    // Advance to next email
    const nextDate = getNextEmailDate(state);
    if (!nextDate) {
      while (state.phase === "playing") state = advanceDay(state);
    } else {
      while (state.currentDate < nextDate && state.phase === "playing") {
        state = advanceDay(state);
      }
    }
  }

  // Game over summary
  output += `## GAME OVER\n\n`;
  output += `${state.endingText}\n\n`;
  output += `**Summary:** ${emailCount} emails, ${decisionCount} decision points\n\n`;
  output += `**Final metrics:**\n`;
  output += `- Stock: $${state.metrics.stockPrice.toFixed(0)}\n`;
  output += `- Revenue: $${state.metrics.revenue.toFixed(1)}B/q\n`;
  output += `- AI Capability: ${state.metrics.aiCapability.toFixed(0)}\n`;
  output += `- Oversight: ${state.metrics.oversight.toFixed(0)}%\n`;
  output += `- Public Trust: ${state.metrics.publicTrust.toFixed(0)}%\n`;
  output += `- Board Confidence: ${state.metrics.boardConfidence.toFixed(0)}%\n`;
  output += "\n---\n\n";
}

// ── Structural summary ──
output += "# Appendix: Scenario Structure\n\n";

const fixedDate = scenario.filter((d) => typeof d.date === "string");
const triggered = scenario.filter((d) => typeof d.date === "function");

output += `- **Fixed-date emails:** ${fixedDate.length}\n`;
output += `- **Triggered emails:** ${triggered.length}\n`;
output += `- **Total EmailDefs:** ${scenario.length}\n\n`;

output += "## All EmailDef IDs\n\n";
for (const def of scenario) {
  const dateType = typeof def.date === "string" ? def.date : "(triggered)";
  output += `- \`${def.id}\` — ${dateType}\n`;
}

process.stdout.write(output);
