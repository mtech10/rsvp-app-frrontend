import React, { useEffect, useMemo, useState } from "react";
import { getEvents } from "../data";
import EventCardOpened from "../pages/EventCardOpened";
import EventCardItem from "./EventCardItem";
import { useRSVP } from "../context/RSVPContext";

const EventCards = ({ category = null }) => {
  const { events = [] } = getEvents({ limit: 12, category });
  const [selectedId, setSelectedId] = useState(events[0]?.api_id || null);
  const { addRsvp } = useRSVP();

  useEffect(() => {
    if (!events.some((event) => event.api_id === selectedId)) {
      setSelectedId(events[0]?.api_id || null);
    }
  }, [events, selectedId]);

  const selectedEvent = useMemo(
    () =>
      events.find((event) => event.api_id === selectedId) || events[0] || null,
    [events, selectedId],
  );

  const handleSelect = (id) => setSelectedId(id);
  const handleRsvp = () => {
    if (selectedEvent) addRsvp(selectedEvent.api_id);
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
      {events.map((event) => (
        <EventCardItem
          key={event.api_id}
          event={event}
          selected={event.api_id === selectedId}
          onClick={() => handleSelect(event.api_id)}
        />
      ))}
      {/* <div className="sticky top-24">
        <EventCardOpened event={selectedEvent} onRsvp={handleRsvp} />
      </div> */}
    </div>
  );
};

export default EventCards;
