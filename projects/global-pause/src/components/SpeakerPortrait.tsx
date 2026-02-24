/**
 * Geometric character portraits for card speakers.
 * Each speaker has a unique silhouette shape + large distinctive accessory.
 * Inspired by Reigns' flat-shaded Tom Whalen-esque character illustrations.
 */

import type { ReactNode } from "react";

type BodyType = "suit" | "military" | "casual" | "lab" | "robes" | "hood";
type Expression = "neutral" | "smile" | "stern" | "smirk";

interface PortraitData {
  bg: string;
  skin: string;
  accent: string;
  bodyType: BodyType;
  headWidth: number;  // varies 18-24 for distinct silhouettes
  expression: Expression;
  accessory: (accent: string) => ReactNode;
}

// Large, prominent accessories — the main visual identifier per speaker
const accessories = {
  largeTie: (a: string) => (
    <>
      <rect x="58" y="60" width="12" height="22" rx="2" fill={a} />
      <polygon points="64,82 54,96 74,96" fill={a} />
    </>
  ),
  largeGlasses: (a: string) => (
    <>
      <circle cx="52" cy="40" r="11" fill="none" stroke={a} strokeWidth="3.5" />
      <circle cx="76" cy="40" r="11" fill="none" stroke={a} strokeWidth="3.5" />
      <line x1="63" y1="40" x2="65" y2="40" stroke={a} strokeWidth="3" />
      <line x1="41" y1="38" x2="36" y2="34" stroke={a} strokeWidth="2.5" />
      <line x1="87" y1="38" x2="92" y2="34" stroke={a} strokeWidth="2.5" />
    </>
  ),
  largeMic: (a: string) => (
    <>
      <circle cx="44" cy="50" r="9" fill={a} />
      <rect x="42" y="59" width="4" height="20" rx="2" fill={a} />
      <circle cx="44" cy="82" r="6" fill="none" stroke={a} strokeWidth="2.5" />
    </>
  ),
  largeBadge: () => (
    <>
      <polygon points="64,62 52,72 56,86 64,80 72,86 76,72" fill="#FFD700" />
      <circle cx="64" cy="72" r="5" fill="#B8860B" />
      <circle cx="64" cy="72" r="2" fill="#FFD700" />
    </>
  ),
  largeHood: () => (
    <path
      d="M34,34 Q34,8 64,4 Q94,8 94,34 L90,52 Q78,44 64,44 Q50,44 38,52 Z"
      fill="#1A1A24"
      opacity="0.85"
    />
  ),
  largeGlobe: (a: string) => (
    <>
      <circle cx="84" cy="64" r="16" fill="none" stroke={a} strokeWidth="2.5" />
      <ellipse cx="84" cy="64" rx="8" ry="16" fill="none" stroke={a} strokeWidth="2" />
      <line x1="68" y1="64" x2="100" y2="64" stroke={a} strokeWidth="2" />
      <line x1="68" y1="56" x2="100" y2="56" stroke={a} strokeWidth="1.5" opacity="0.5" />
      <line x1="68" y1="72" x2="100" y2="72" stroke={a} strokeWidth="1.5" opacity="0.5" />
    </>
  ),
  largeBeaker: (a: string) => (
    <>
      <path d="M74,50 L74,68 L66,90 L94,90 L86,68 L86,50 Z" fill="none" stroke={a} strokeWidth="2.5" />
      <line x1="74" y1="50" x2="86" y2="50" stroke={a} strokeWidth="2.5" />
      <rect x="70" y="72" width="20" height="12" rx="2" fill={a} opacity="0.25" />
      <circle cx="78" cy="78" r="3" fill={a} opacity="0.4" />
    </>
  ),
  largePen: (a: string) => (
    <>
      <rect x="80" y="44" width="6" height="38" rx="2" fill={a} transform="rotate(12, 83, 63)" />
      <polygon points="83,84 79,92 87,92" fill={a} transform="rotate(12, 83, 88)" />
      <rect x="78" y="42" width="10" height="4" rx="1" fill={a} opacity="0.6" transform="rotate(12, 83, 44)" />
    </>
  ),
  largeEye: (a: string) => (
    <>
      <ellipse cx="64" cy="38" rx="22" ry="12" fill="none" stroke={a} strokeWidth="3" />
      <circle cx="64" cy="38" r="8" fill={a} />
      <circle cx="64" cy="38" r="3" fill="white" opacity="0.6" />
    </>
  ),
  largeFist: (a: string) => (
    <>
      <rect x="34" y="52" width="18" height="28" rx="6" fill={a} />
      <rect x="34" y="48" width="18" height="8" rx="3" fill={a} opacity="0.8" />
      <line x1="38" y1="60" x2="48" y2="60" stroke="white" strokeWidth="1" opacity="0.3" />
      <line x1="38" y1="66" x2="48" y2="66" stroke="white" strokeWidth="1" opacity="0.3" />
    </>
  ),
  largeCap: (a: string) => (
    <>
      <path d="M38,30 L90,30 L94,24 Q64,10 34,24 Z" fill={a} />
      <rect x="36" y="28" width="56" height="5" rx="1" fill={a} opacity="0.7" />
      <ellipse cx="64" cy="20" rx="8" ry="4" fill={a} opacity="0.5" />
    </>
  ),
  largeClip: (a: string) => (
    <>
      <rect x="76" y="48" width="22" height="30" rx="3" fill={a} opacity="0.85" />
      <line x1="80" y1="56" x2="94" y2="56" stroke="white" strokeWidth="2" opacity="0.5" />
      <line x1="80" y1="62" x2="94" y2="62" stroke="white" strokeWidth="2" opacity="0.5" />
      <line x1="80" y1="68" x2="90" y2="68" stroke="white" strokeWidth="2" opacity="0.5" />
      <rect x="82" y="44" width="4" height="8" rx="1" fill={a} opacity="0.6" />
    </>
  ),
  largeScales: (a: string) => (
    <>
      <line x1="64" y1="52" x2="64" y2="90" stroke={a} strokeWidth="2.5" />
      <line x1="44" y1="62" x2="84" y2="62" stroke={a} strokeWidth="2.5" />
      <path d="M44,62 L38,76 L50,76 Z" fill="none" stroke={a} strokeWidth="2" />
      <path d="M84,62 L78,76 L90,76 Z" fill="none" stroke={a} strokeWidth="2" />
      <rect x="58" y="86" width="12" height="6" rx="2" fill={a} />
    </>
  ),
};

const PORTRAITS: Record<string, PortraitData> = {
  "Chief Financial Officer":  { bg: "#B8860B", skin: "#F5E6C8", accent: "#6B4E0A", bodyType: "suit", headWidth: 20, expression: "stern", accessory: accessories.largeTie },
  "Communications Director":  { bg: "#3B78B2", skin: "#D4E4F0", accent: "#1A3D5C", bodyType: "casual", headWidth: 19, expression: "smile", accessory: accessories.largeMic },
  "Head of Human Resources":  { bg: "#8B6344", skin: "#E8D5C4", accent: "#4A3428", bodyType: "casual", headWidth: 22, expression: "smile", accessory: accessories.largeClip },
  "Political Advisor":        { bg: "#6B4E8B", skin: "#DDD4ED", accent: "#2E2444", bodyType: "suit", headWidth: 18, expression: "smirk", accessory: accessories.largeTie },
  "Press Secretary":          { bg: "#A04848", skin: "#EDD4D4", accent: "#5A2020", bodyType: "casual", headWidth: 20, expression: "smile", accessory: accessories.largeMic },
  "Intelligence Analyst":     { bg: "#3B7A64", skin: "#C4E0D5", accent: "#1A3D30", bodyType: "suit", headWidth: 19, expression: "stern", accessory: accessories.largeGlasses },
  "Junior Analyst":           { bg: "#728B48", skin: "#D8E0C4", accent: "#3D4A28", bodyType: "casual", headWidth: 17, expression: "neutral", accessory: accessories.largeGlasses },
  "Customs Liaison":          { bg: "#8B7248", skin: "#E0D5C4", accent: "#4A3D28", bodyType: "military", headWidth: 21, expression: "stern", accessory: accessories.largeBadge },
  "Anonymous Source":         { bg: "#4A4A5E", skin: "#9A9AA8", accent: "#252530", bodyType: "hood", headWidth: 20, expression: "neutral", accessory: accessories.largeHood },
  "Diplomatic Attaché":       { bg: "#4A7A8B", skin: "#C4D5E0", accent: "#1A3D4A", bodyType: "robes", headWidth: 20, expression: "smile", accessory: accessories.largeGlobe },
  "Legal Counsel":            { bg: "#7A4A7A", skin: "#DBC4DB", accent: "#3A203A", bodyType: "robes", headWidth: 19, expression: "stern", accessory: accessories.largeScales },
  "Civil Liberties Advocate": { bg: "#A0604A", skin: "#E0C4B8", accent: "#5A2E20", bodyType: "casual", headWidth: 21, expression: "stern", accessory: accessories.largeFist },
  "UN Secretary-General":     { bg: "#3B6490", skin: "#C4D0E0", accent: "#1A3050", bodyType: "robes", headWidth: 22, expression: "neutral", accessory: accessories.largeGlobe },
  "Ethics Watchdog":          { bg: "#607A48", skin: "#D0D8C4", accent: "#2E3A20", bodyType: "casual", headWidth: 20, expression: "stern", accessory: accessories.largeEye },
  "Finance Director":         { bg: "#B89B1A", skin: "#F0E8C4", accent: "#6B5A0A", bodyType: "suit", headWidth: 22, expression: "smirk", accessory: accessories.largeTie },
  "Enforcement Chief":        { bg: "#5E4A78", skin: "#C4C4DB", accent: "#2E2040", bodyType: "military", headWidth: 23, expression: "stern", accessory: accessories.largeBadge },
  "Investigative Journalist": { bg: "#8B6048", skin: "#E0D0C4", accent: "#4A3020", bodyType: "casual", headWidth: 18, expression: "smirk", accessory: accessories.largePen },
  "NATO Liaison":             { bg: "#487848", skin: "#C4DBC4", accent: "#204020", bodyType: "military", headWidth: 21, expression: "stern", accessory: accessories.largeCap },
  "Chief Scientist":          { bg: "#4A6090", skin: "#C4D0E0", accent: "#202E4A", bodyType: "lab", headWidth: 19, expression: "smile", accessory: accessories.largeBeaker },
  "Deputy Director":          { bg: "#786048", skin: "#DCD0C4", accent: "#3A3020", bodyType: "suit", headWidth: 20, expression: "neutral", accessory: accessories.largeTie },
  "Executive Assistant":      { bg: "#4A8B6A", skin: "#D0E0D5", accent: "#2E4A3A", bodyType: "casual", headWidth: 18, expression: "smile", accessory: accessories.largeClip },
};

const DEFAULT_PORTRAIT: PortraitData = {
  bg: "#5A5A5A", skin: "#D0D0D0", accent: "#3A3A3A", bodyType: "suit", headWidth: 20, expression: "neutral", accessory: accessories.largeTie,
};

function BodyShape({ type, skin }: { type: BodyType; skin: string }) {
  switch (type) {
    case "suit":
      return (
        <>
          <ellipse cx="64" cy="102" rx="32" ry="22" fill={skin} />
          <rect x="56" y="54" width="16" height="16" rx="4" fill={skin} />
        </>
      );
    case "military":
      return (
        <>
          <rect x="28" y="82" width="72" height="30" rx="8" fill={skin} />
          <rect x="32" y="78" width="8" height="10" rx="2" fill={skin} opacity="0.7" />
          <rect x="88" y="78" width="8" height="10" rx="2" fill={skin} opacity="0.7" />
          <rect x="56" y="54" width="16" height="16" rx="4" fill={skin} />
        </>
      );
    case "casual":
      return (
        <>
          <ellipse cx="64" cy="100" rx="28" ry="20" fill={skin} />
          <rect x="57" y="54" width="14" height="14" rx="4" fill={skin} />
        </>
      );
    case "lab":
      return (
        <>
          <path d="M32,86 Q32,70 48,68 L56,56 L72,56 L80,68 Q96,70 96,86 L96,110 L32,110 Z" fill={skin} />
        </>
      );
    case "robes":
      return (
        <>
          <path d="M30,84 Q30,66 50,62 L56,54 L72,54 L78,62 Q98,66 98,84 L100,112 L28,112 Z" fill={skin} />
        </>
      );
    case "hood":
      return (
        <>
          <ellipse cx="64" cy="100" rx="28" ry="20" fill={skin} />
          <rect x="57" y="54" width="14" height="14" rx="4" fill={skin} />
        </>
      );
  }
}

function FaceExpression({ expression, accent, headWidth }: { expression: Expression; accent: string; headWidth: number }) {
  const eyeSpread = headWidth * 0.75;
  const leftEyeX = 64 - eyeSpread / 2;
  const rightEyeX = 64 + eyeSpread / 2;

  return (
    <>
      {/* Eyes — larger for readability */}
      <circle cx={leftEyeX} cy="36" r="3.5" fill={accent} />
      <circle cx={rightEyeX} cy="36" r="3.5" fill={accent} />
      {/* Eye highlights */}
      <circle cx={leftEyeX + 1} cy="35" r="1.2" fill="white" opacity="0.5" />
      <circle cx={rightEyeX + 1} cy="35" r="1.2" fill="white" opacity="0.5" />

      {/* Expression — larger, bolder */}
      {expression === "neutral" && (
        <line x1="56" y1="48" x2="72" y2="48" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
      )}
      {expression === "smile" && (
        <path d="M54,46 Q64,56 74,46" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
      )}
      {expression === "stern" && (
        <line x1="54" y1="48" x2="74" y2="48" stroke={accent} strokeWidth="3" strokeLinecap="round" />
      )}
      {expression === "smirk" && (
        <path d="M56,47 Q66,54 74,46" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
      )}
    </>
  );
}

interface SpeakerPortraitProps {
  speaker: string;
  size?: number;
}

export function SpeakerPortrait({ speaker, size = 128 }: SpeakerPortraitProps) {
  const data = PORTRAITS[speaker] || DEFAULT_PORTRAIT;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block"
    >
      {/* No background circle — card color shows through */}

      {/* Body shape — varies by type */}
      <BodyShape type={data.bodyType} skin={data.skin} />

      {/* Head — size varies per speaker */}
      <circle cx="64" cy="38" r={data.headWidth} fill={data.skin} />

      {/* Face expression */}
      <FaceExpression expression={data.expression} accent={data.accent} headWidth={data.headWidth} />

      {/* Large accessory — dark for contrast on bold card bg */}
      {data.accessory(data.accent)}
    </svg>
  );
}
