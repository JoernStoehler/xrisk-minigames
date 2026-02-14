import { useState } from "react";
import type { GameSpeed, GameState, RegionId, ResponseType } from "../engine/types";
import TopBar from "./TopBar";
import WorldMap from "./WorldMap";
import EventPanel from "./EventPanel";
import RegionPanel from "./RegionPanel";
import TimeBar from "./TimeBar";

interface Props {
  state: GameState;
  onRespond: (eventId: string, responseType: ResponseType) => void;
  onDeployInspector: (regionId: RegionId) => void;
  onRecallInspector: (regionId: RegionId) => void;
  onSetSpeed: (speed: GameSpeed) => void;
  onSetFunding: (level: number) => void;
}

export default function GameScreen({
  state,
  onRespond,
  onDeployInspector,
  onRecallInspector,
  onSetSpeed,
  onSetFunding,
}: Props) {
  const [selectedRegion, setSelectedRegion] = useState<RegionId | null>(null);

  const handleSelectRegion = (regionId: RegionId) => {
    setSelectedRegion((prev) => (prev === regionId ? null : regionId));
  };

  return (
    <div className="h-screen flex flex-col bg-isia-bg">
      {/* Top bar: resources */}
      <TopBar state={state} onChangeFunding={onSetFunding} />

      {/* Main area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Region panel */}
        <div className="w-48 border-r border-isia-border flex-shrink-0">
          <RegionPanel
            state={state}
            selectedRegion={selectedRegion}
            onSelectRegion={handleSelectRegion}
            onDeployInspector={onDeployInspector}
            onRecallInspector={onRecallInspector}
          />
        </div>

        {/* Center: World map */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 p-2">
            <WorldMap
              state={state}
              onSelectRegion={handleSelectRegion}
              selectedRegion={selectedRegion}
            />
          </div>
        </div>

        {/* Right: Event panel */}
        <div className="w-80 border-l border-isia-border flex-shrink-0">
          <EventPanel
            state={state}
            selectedRegion={selectedRegion}
            onRespond={onRespond}
          />
        </div>
      </div>

      {/* Bottom bar: time controls */}
      <TimeBar state={state} onSetSpeed={onSetSpeed} />
    </div>
  );
}
