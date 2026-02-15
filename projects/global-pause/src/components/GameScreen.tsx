import { useCallback, useState } from "react";
import type { GameSpeed, GameState, RegionId, ResponseType } from "../engine/types";
import WorldMap from "./WorldMap";
import NewsTicker from "./NewsTicker";
import SafetyProgressBar from "./SafetyProgressBar";
import SpeedControls from "./SpeedControls";
import StatusOverlay from "./StatusOverlay";
import EventModal from "./EventModal";
import RegionOverlay from "./RegionOverlay";

interface Props {
  state: GameState;
  onRespond: (eventId: string, responseType: ResponseType) => void;
  onPopEvent: (eventId: string) => void;
  onDeployInspector: (regionId: RegionId) => void;
  onRecallInspector: (regionId: RegionId) => void;
  onSetSpeed: (speed: GameSpeed) => void;
  onSetFunding: (level: number) => void;
}

export default function GameScreen({
  state,
  onRespond,
  onPopEvent,
  onDeployInspector,
  onRecallInspector,
  onSetSpeed,
  onSetFunding,
}: Props) {
  const [selectedRegion, setSelectedRegion] = useState<RegionId | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [speedBeforeModal, setSpeedBeforeModal] = useState<GameSpeed>(1);

  // Only show modal for events that still exist and are unresolved
  const selectedEvent = selectedEventId
    ? state.activeEvents.find((e) => e.id === selectedEventId && !e.resolved) ?? null
    : null;

  const openModal = useCallback((eventId: string) => {
    setSpeedBeforeModal(state.speed || 1);
    onSetSpeed(0);
    setSelectedEventId(eventId);
  }, [state.speed, onSetSpeed]);

  const closeModal = useCallback(() => {
    setSelectedEventId(null);
    onSetSpeed(speedBeforeModal);
  }, [speedBeforeModal, onSetSpeed]);

  // Events for selected region
  const regionEvents = selectedRegion
    ? state.activeEvents.filter((e) => e.region === selectedRegion && !e.resolved)
    : [];

  return (
    <div className="h-dvh flex flex-col bg-isia-bg overflow-hidden touch-manipulation">
      {/* News ticker */}
      <NewsTicker events={state.activeEvents} eventLog={state.eventLog} />

      {/* Map area with floating overlays */}
      <div className="flex-1 relative min-h-0">
        <WorldMap
          state={state}
          onSelectRegion={(id) => setSelectedRegion((prev) => prev === id ? null : id)}
          onPopEvent={onPopEvent}
          onOpenEvent={openModal}
        />

        {/* Floating status overlay — top right */}
        <div className="absolute top-2 right-2">
          <StatusOverlay state={state} onChangeFunding={onSetFunding} />
        </div>

        {/* Floating speed controls — bottom left */}
        <div className="absolute bottom-2 left-2">
          <SpeedControls speed={state.speed} onSetSpeed={onSetSpeed} />
        </div>
      </div>

      {/* Safety progress bar */}
      <SafetyProgressBar state={state} />

      {/* Region bottom-sheet */}
      {selectedRegion && (
        <RegionOverlay
          regionId={selectedRegion}
          state={state}
          events={regionEvents}
          onDeploy={onDeployInspector}
          onRecall={onRecallInspector}
          onClose={() => setSelectedRegion(null)}
          onOpenEvent={openModal}
        />
      )}

      {/* Event decision modal */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          state={state}
          onRespond={onRespond}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
