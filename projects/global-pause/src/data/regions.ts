import type { RegionId, RegionState } from "../engine/types";

export interface RegionInfo {
  id: RegionId;
  name: string;
  shortName: string;
  // Approximate center for map positioning (percentage of SVG viewBox)
  mapX: number;
  mapY: number;
}

export const REGION_INFO: Record<RegionId, RegionInfo> = {
  us: { id: "us", name: "United States", shortName: "US", mapX: 22, mapY: 38 },
  eu: { id: "eu", name: "European Union", shortName: "EU", mapX: 50, mapY: 32 },
  china: {
    id: "china",
    name: "China",
    shortName: "CN",
    mapX: 75,
    mapY: 40,
  },
  russia: {
    id: "russia",
    name: "Russia",
    shortName: "RU",
    mapX: 65,
    mapY: 25,
  },
  row: {
    id: "row",
    name: "Rest of World",
    shortName: "RoW",
    mapX: 55,
    mapY: 65,
  },
};

export const REGION_IDS: RegionId[] = ["us", "china", "eu", "russia", "row"];

export function createRegionStates(
  cooperation: number,
  intelligence: number,
): Record<RegionId, RegionState> {
  const regions: Partial<Record<RegionId, RegionState>> = {};
  for (const info of Object.values(REGION_INFO)) {
    regions[info.id] = {
      id: info.id,
      name: info.name,
      cooperation,
      intelligenceCoverage: intelligence,
      inspectorDeployed: false,
    };
  }
  return regions as Record<RegionId, RegionState>;
}
