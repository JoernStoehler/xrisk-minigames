import type {
  ChoicePreview,
  Resources,
  ResourceKey,
} from "../engine/types";
import { ResourceBar } from "./ResourceBar";
import type { TiltDirection } from "../hooks/useSwipe";

const RESOURCE_KEYS: ResourceKey[] = [
  "trust",
  "funding",
  "intel",
  "leverage",
];

interface ResourceDisplayProps {
  resources: Resources;
  tiltDirection: TiltDirection;
  leftPreviews: ChoicePreview[];
  rightPreviews: ChoicePreview[];
}

export function ResourceDisplay({
  resources,
  tiltDirection,
  leftPreviews,
  rightPreviews,
}: ResourceDisplayProps) {
  const activePreviews =
    tiltDirection === "left"
      ? leftPreviews
      : tiltDirection === "right"
        ? rightPreviews
        : [];

  const previewMap = new Map<ResourceKey, ChoicePreview>();
  for (const p of activePreviews) {
    previewMap.set(p.resource, p);
  }

  return (
    <div className="flex justify-center gap-3 py-2 border-b border-isia-border bg-isia-bg">
      {RESOURCE_KEYS.map((key) => (
        <ResourceBar
          key={key}
          resource={key}
          value={resources[key]}
          preview={previewMap.get(key) ?? null}
        />
      ))}
    </div>
  );
}
