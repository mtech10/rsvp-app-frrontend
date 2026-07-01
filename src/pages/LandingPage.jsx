import React from "react";
import { useRSVP } from "../context/RSVPContext";
import { formatDateParts } from "../utility/dateUtility";
import { MapPin } from "lucide-react";

const LandingPage = () => {
  const { rsvpEvents } = useRSVP();

  return (
    <section className="mx-auto max-w-6xl px-20 py-5">
      <div className="flex mb-8 items-center justify-between">
        <p className="text-2xl font-semibold text-slate-800">Events</p>

        <div className="p-2 bg-slate-200 font-semibold text-md text-slate-600 rounded-xl">
          <button className="p-1 rounded-xl mr-2">Upcoming</button>
          <button className="p-1 rounded-xl">Past</button>
        </div>
      </div>

      {rsvpEvents.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-white text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            Get started with your first RSVP
          </h2>
          <p className="mt-4 text-slate-600">
            Discover events, RSVP, and your saved events will appear here.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-6">
              <p className="font-semibold text-slate-900">
                Find events that match your interests.
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-6">
              <p className="font-semibold text-slate-900">
                One-click RSVP keeps your schedule fresh.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 px-20">
          {rsvpEvents.map((event) => {
            const date = formatDateParts(event.start_at);
            const endDate = formatDateParts(event.end_at);
            return (
              <article
                key={event.api_id}
                className="flex gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col px-4 shrink-0">
                  <span className="text-base font-semibold text-slate-900">
                    {date.month} {date.day}
                  </span>
                  <span className="mt-1 text-sm  text-slate-600">
                    {date.weekday}
                  </span>
                </div>
                <div className="w-px bg-slate-300 self-stretch my-1"></div>
                <div className="flex flex-col gap-2 flex-1">
                  <span className=" text-lg font-semibold  text-slate-600">
                    {date.time}
                  </span>
                  <h2 className="text-xl font-semibold text-slate-900">
                    {event.name}
                  </h2>
                  <span className="mt-2 text-sm text-slate-600">
                    {event.hosts[0]?.name}
                  </span>
                  <div className="flex gap-2 items-center">
                    <MapPin size={16} />
                    <p className="text-sm text-slate-600">{event.venue}</p>
                  </div>
                </div>
                <div className="relative overflow-hidden w-24 sm:w-32 shrink-0 rounded-2xl">
                  <img
                    src={event.cover_url}
                    alt={event.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default LandingPage;
