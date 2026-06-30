import React from "react";
import { getEvents } from "../data";

const formatEventDate = (value) => {
  if (!value) return "TBD";

  const date = new Date(value);
  const today = new Date();
  const midnight = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const diffDays = Math.round((midnight(date) - midnight(today)) / 86_400_000);
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);

  if (diffDays === 1) return `Tomorrow, ${time}`;
  if (diffDays === 0) return `Today, ${time}`;

  const dayLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);

  return `${dayLabel}, ${time}`;
};

const EventCardItem = ({ event }) => {
  const dateText = formatEventDate(event.start_at);
  const address =
    event.address || event.venue || "Location details coming soon";
  const city =
    event.city ||
    (event.location_type === "online" ? "Online" : "Various locations");

  return (
    <article className="flex overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg sm:flex-row">
      <div className="relative w-full overflow-hidden sm:w-32 shrink-0">
        <img
          src={event.cover_url}
          alt={event.name}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-3 p-2 sm:p-3">
        <div>
          <p className="text-md  text-slate-500">{dateText}</p>
          <h2 className="mt-2 text-base font-semibold text-slate-900 line-clamp-2">
            {event.name}
          </h2>
          <p className="mt-1 max-w-xl text-sm leading-6 text-slate-600">
            {address}
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-900">{city}</p>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{event.rsvp_count || 0} attending</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
            {event.ticket_type === "free"
              ? "Free"
              : event.ticket_type === "paid"
                ? "Paid"
                : "Ticketed"}
          </span>
        </div>
      </div>
    </article>
  );
};

const EventCards = ({ limit = 6 }) => {
  const { events = [] } = getEvents(limit);
  const displayedEvents = events.slice(0, limit);
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
      {displayedEvents.map((event) => (
        <EventCardItem key={event.api_id} event={event} />
      ))}
    </div>
  );
};

export default EventCards;
