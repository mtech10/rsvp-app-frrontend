import { MapPin } from "lucide-react";
import React from "react";
import { formatDateParts } from "../utility/dateUtility";

const EventCardOpened = ({ event, onRsvp }) => {
  if (!event) return null;

  const date = formatDateParts(event.start_at);
  const endDate = formatDateParts(event.end_at);
  const addressLabel =
    event.address || event.venue || "Location details coming soon";
  const cityLabel =
    event.city ||
    (event.location_type === "online" ? "Online" : "Various locations");
  const priceLabel =
    event.ticket_type === "free"
      ? "Free"
      : event.price
        ? `$${event.price}`
        : "Paid";

  return (
    <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_-25px_rgba(15,23,42,0.35)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_70px_-25px_rgba(15,23,42,0.4)]">
      <div className="relative h-44 overflow-hidden sm:h-52">
        <img
          src={event.cover_url}
          alt={`${event.name} event cover`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-3xl font-bold text-slate-900">{event.name}</h3>
          </div>
          <div className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
            {priceLabel}
          </div>
        </div>

        <div className="mt-6 flex gap-4 sm:items-center rounded-3xl bg-slate-50">
          <div className="rounded-sm p-1 bg-slate-100  border border-slate-200 text-center shadow-sm backdrop-blur-sm">
            <span className="block text-xs font-semibold uppercase tracking-[0.28em] text-slate-600 ">
              {date.month}
            </span>
            <span className="mt-1 text-xl font-bold tracking-tight text-slate-800">
              {date.day}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold text-slate-900">
              {date.weekday}, {date.month} {date.day}
            </span>
            <span className="mt-1 text-sm  text-slate-600">
              {date.time} - {endDate.time}
            </span>
          </div>

          <div className="flex gap-2 items-center rounded-3xl bg-slate-50 p-5">
            <MapPin size={30} />
            <div className="flex flex-col">
              <span className="mt-2 text-sm text-slate-900 font-semibold">
                {addressLabel}
              </span>
              <span className="mt-1 text-base  text-slate-600">
                {cityLabel}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-slate-600 text-md">About Event</p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-900">
            {event.description}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            {event.rsvp_count || 0} people going
          </p>
          <button
            type="button"
            onClick={onRsvp}
            className="rounded-full bg-slate-900 px-5 py-2 text-sm font-bold text-white transition hover:bg-slate-700"
          >
            One-Click RSVP
          </button>
        </div>
      </div>
    </article>
  );
};

export default EventCardOpened;
