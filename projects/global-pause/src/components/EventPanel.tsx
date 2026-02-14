import { useState } from "react";
import type { GameState, RegionId, ResponseType } from "../engine/types";
import EventCard from "./EventCard";
import EventDetail from "./EventDetail";

interface Props {
  state: GameState;
  selectedRegion: RegionId | null;
  onRespond: (eventId: string, responseType: ResponseType) => void;
}

export default function EventPanel({
  state,
  selectedRegion,
  onRespond,
}: Props) {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Filter events by selected region, or show all
  const events = state.activeEvents
    .filter((e) => !e.resolved)
    .filter((e) => !selectedRegion || e.region === selectedRegion)
    .sort((a, b) => {
      // Sort by urgency (red first), then by deadline
      const urgencyOrder = { red: 0, orange: 1, yellow: 2 };
      const urgDiff = urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
      if (urgDiff !== 0) return urgDiff;
      return a.deadlineWeek - b.deadlineWeek;
    });

  const selectedEvent = selectedEventId
    ? state.activeEvents.find((e) => e.id === selectedEventId)
    : null;

  const handleRespond = (eventId: string, responseType: ResponseType) => {
    onRespond(eventId, responseType);
    setSelectedEventId(null);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 border-b border-isia-border">
        <h2 className="text-xs font-bold uppercase tracking-wider text-isia-muted">
          {selectedRegion
            ? `Events — ${state.regions[selectedRegion].name}`
            : "All Events"}
        </h2>
        <span className="text-xs text-isia-muted">
          {events.length} active
        </span>
      </div>

      {selectedEvent && !selectedEvent.resolved ? (
        <div className="p-3 overflow-y-auto event-scroll flex-1">
          <EventDetail
            event={selectedEvent}
            state={state}
            onRespond={handleRespond}
            onClose={() => setSelectedEventId(null)}
          />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto event-scroll p-2 space-y-1">
          {events.length === 0 ? (
            <div className="text-center text-isia-muted text-sm py-8">
              {selectedRegion
                ? "No active events in this region."
                : "No active events. Time is passing..."}
            </div>
          ) : (
            events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isSelected={event.id === selectedEventId}
                onClick={() => setSelectedEventId(event.id)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
