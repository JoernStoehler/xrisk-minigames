/**
 * Scenario reference exporter — generates an annotated summary of every email
 * in the scenario, organized by narrative phase.
 *
 * Usage: npx tsx scripts/scenario-reference.ts > scenario-reference.md
 *
 * Output is a concise reference for content review:
 * - Each email: date, sender, subject, one-line summary, role in narrative
 * - Each decision: options, effects, what it triggers
 * - Gaps and questions flagged for domain expert review
 *
 * Intended audience: Jörn (domain expert) reviewing/annotating the scenario.
 * NOT for code — for content discussion.
 */
import { scenario } from "../src/data/scenario";
import type { NarrativeContext, Email, EmailDef } from "../src/engine/types";

const INITIAL_METRICS = {
  aiCapability: 35,
  publicTrust: 72,
  boardConfidence: 80,
  oversight: 60,
  stockPrice: 148,
  revenue: 4.2,
};

function emptyCtx(date: string): NarrativeContext {
  return { currentDate: date, decisions: [], metrics: INITIAL_METRICS };
}

function describeTrigger(def: EmailDef): string | null {
  // Parse the date function source to describe the trigger condition
  if (typeof def.date === "string") return null;

  const src = def.date.toString();

  // Extract decisionId from decisionDate(ctx, "xxx") calls
  const decMatch = src.match(/decisionDate\(ctx,\s*"([^"]+)"\)/);
  const choseMatch = src.match(/chose\(ctx,\s*"([^"]+)",\s*"([^"]+)"\)/);
  const daysMatch = src.match(/addDays\(d,\s*(\d+)\)/);

  if (choseMatch && daysMatch) {
    return `Triggered ${daysMatch[1]} days after choosing "${choseMatch[2]}" on decision "${choseMatch[1]}"`;
  }
  if (decMatch && daysMatch) {
    return `Triggered ${daysMatch[1]} days after decision "${decMatch[1]}"`;
  }
  return "(computed date — see source)";
}

function tryGenerate(def: EmailDef): Email | null {
  if (typeof def.date === "string") {
    return def.generate(emptyCtx(def.date), def.date);
  }
  // For triggered emails, try with a far-future date so ctx.currentDate works
  // We can't generate without the right decisions, so return null
  return null;
}

// ── Build reference ──

let out = `# Scenario Reference — AI CEO Game

*For content review and domain expert annotation.*
*Generated from scenario.ts. Not code — for discussion.*

---

## How to use this document

Each email below shows: date, sender, subject, tags, and whether it has decisions.
For triggered emails, the trigger condition is shown.

**Annotation guide** — for each email, consider:
- **Concept:** What x-risk concept does this teach the player?
- **Player emotion:** What should the player feel reading this?
- **Plausibility:** Is this realistic for a CEO inbox?
- **Patch notes:** What should change? (wording, timing, new content, cut entirely?)

---

## Timeline Overview

`;

// Fixed-date emails in order
const fixed = scenario
  .filter((d) => typeof d.date === "string")
  .sort((a, b) => (a.date as string).localeCompare(b.date as string));

const triggered = scenario.filter((d) => typeof d.date === "function");

// Group fixed-date emails by month
const months = new Map<string, typeof fixed>();
for (const def of fixed) {
  const date = def.date as string;
  const month = date.slice(0, 7); // "2026-10"
  if (!months.has(month)) months.set(month, []);
  months.get(month)!.push(def);
}

for (const [month, defs] of months) {
  const d = new Date(month + "-15");
  const label = d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  out += `### ${label}\n\n`;

  for (const def of defs) {
    const email = tryGenerate(def);
    if (!email) continue;

    const tags = email.tags?.length ? ` \`[${email.tags.join(", ")}]\`` : "";
    const hasDecision = email.replyOptions ? " **[DECISION]**" : "";
    out += `**${def.date}** — ${email.from.name}: *${email.subject}*${tags}${hasDecision}\n`;

    // Brief summary (first 150 chars of body)
    const summary = email.body.replace(/\n/g, " ").trim().slice(0, 150);
    out += `> ${summary}...\n`;

    if (email.replyOptions) {
      out += `>\n`;
      for (const opt of email.replyOptions) {
        const effects = opt.effects
          ? ` → ${opt.effects.map((e) => `${e.key} ${e.delta > 0 ? "+" : ""}${e.delta}`).join(", ")}`
          : "";
        const ends = opt.endsGame ? " **[ENDS GAME]**" : "";
        out += `> - Option \`${opt.id}\`: "${opt.text.slice(0, 80)}${opt.text.length > 80 ? "..." : ""}"${effects}${ends}\n`;
      }
      if (email.replyExpiresOn) {
        out += `> - *Expires: ${email.replyExpiresOn}*\n`;
      }
      if (email.defaultReplyId) {
        out += `> - *Default (if ignored): \`${email.defaultReplyId}\`*\n`;
      }
    }

    out += `>\n> **Concept:** *(to be filled in)*\n`;
    out += `> **Player emotion:** *(to be filled in)*\n`;
    out += `> **Patch notes:** *(to be filled in)*\n\n`;
  }
}

// Triggered emails
out += `---\n\n## Triggered Emails (appear based on decisions)\n\n`;

for (const def of triggered) {
  const trigger = describeTrigger(def);

  // Try to generate with various contexts to get subject/sender
  // We'll try common decision paths
  const paths = [
    { "safety-anomaly": "investigate-safety" },
    { "safety-anomaly": "dismiss-safety" },
    { "training-incident": "shutdown-ai", "shutdown-response": "keep-shutdown" },
    { "training-incident": "shutdown-ai", "shutdown-response": "keep-shutdown", "board-pressure": "comply-board" },
    { "training-incident": "note-for-review" },
    { "expert-warning": "respond-expert" },
    { "expert-warning": "dismiss-expert" },
    { "gpt7-proposal": "greenlight-gpt7" },
    { "gpt7-proposal": "review-gpt7" },
    { "safety-evals": "disclose-metrics" },
    { "safety-evals": "quiet-fix-metrics" },
  ];

  let email: Email | null = null;
  for (const path of paths) {
    const decisions = Object.entries(path).map(([decId, choice]) => ({
      id: decId,
      choice,
      choiceText: "",
      date: "2026-10-22",
      emailId: "",
      emailSubject: "",
    }));
    const ctx: NarrativeContext = {
      currentDate: "2029-01-01",
      decisions,
      metrics: INITIAL_METRICS,
    };
    const resolvedDate = typeof def.date === "function" ? def.date(ctx) : null;
    if (resolvedDate) {
      email = def.generate(ctx, resolvedDate);
      if (email) break;
    }
  }

  if (email) {
    const hasDecision = email.replyOptions ? " **[DECISION]**" : "";
    out += `**\`${def.id}\`** — ${email.from.name}: *${email.subject}*${hasDecision}\n`;
    out += `> *Trigger:* ${trigger}\n`;

    if (email.replyOptions) {
      for (const opt of email.replyOptions) {
        const effects = opt.effects
          ? ` → ${opt.effects.map((e) => `${e.key} ${e.delta > 0 ? "+" : ""}${e.delta}`).join(", ")}`
          : "";
        const ends = opt.endsGame ? " **[ENDS GAME]**" : "";
        out += `> - Option \`${opt.id}\`: "${opt.text.slice(0, 80)}${opt.text.length > 80 ? "..." : ""}"${effects}${ends}\n`;
      }
    }

    out += `>\n> **Concept:** *(to be filled in)*\n`;
    out += `> **Patch notes:** *(to be filled in)*\n\n`;
  } else {
    out += `**\`${def.id}\`** — *(could not generate preview)*\n`;
    out += `> *Trigger:* ${trigger ?? "(unknown)"}\n\n`;
  }
}

// Summary stats
out += `---\n\n## Summary\n\n`;
out += `- Fixed-date emails: ${fixed.length}\n`;
out += `- Triggered emails: ${triggered.length}\n`;
out += `- Total EmailDefs: ${scenario.length}\n`;

const decisions = fixed.filter((d) => {
  const email = tryGenerate(d);
  return email?.replyOptions;
});
out += `- Fixed-date decisions: ${decisions.length}\n`;
out += `- Triggered emails with decisions: ${triggered.filter((d) => {
  // approximate
  return ["shutdown-engineering-impact", "board-pressure", "expert-followup", "expert-goes-public"].includes(d.id);
}).length}\n`;
out += `- Game end date: September 15, 2028\n`;
out += `- Alternative ending: Fired by board (refuse-board)\n`;

process.stdout.write(out);
