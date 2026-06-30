import React from "react";
import EventCards from "../components/EventCards";

const DiscoverEvents = () => {
  return (
    <section className="mx-auto max-w-5xl px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
            Popular Events
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Lagos</h1>
        </div>
        <button className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50">
          View All →
        </button>
      </div>
      <EventCards />
    </section>
  );
};

export default DiscoverEvents;
