import React from "react";
import { Tag } from "lucide-react";
import { getEvents } from "../data";
import { Link } from "react-router-dom";
import { getCategoryIcon } from "../utility/categoryUtility";

const formatCount = (n) => {
  if (!n) return "0 Events";
  if (n >= 1000000) return `${Math.round(n / 100000) / 10}M Events`;
  if (n >= 1000) return `${Math.round(n / 1000)}K Events`;
  return `${n} Events`;
};

const titleize = (slug) =>
  String(slug)
    .replace(/[-_]/g, " ")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const CategoryCard = ({ category, count }) => {
  const Icon = icons[hashString(category) % icons.length] || Tag;

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-700">
        <Icon size={25} />
      </div>
      <div>
        <div className="text-lg font-semibold text-slate-900">
          {titleize(category)}
        </div>
        <div className="mt-1 text-sm text-slate-500">{formatCount(count)}</div>
      </div>
    </div>
  );
};

const Category = ({ limit = 1000, selectedCategory, onSelect }) => {
  const { events = [] } = getEvents({ limit });

  const counts = events.reduce((acc, ev) => {
    const key = ev.category || "uncategorized";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const categories = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((cat) => {
        const CategoryIcon = getCategoryIcon(cat) || Tag;
        return (
          <Link
            key={cat}
            to={`/category/${cat}`}
            onClick={() => onSelect?.(cat)}
            className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition hover:border-slate-300 hover:bg-slate-50 ${
              selectedCategory === cat
                ? "border-indigo-500 bg-slate-50"
                : "border-slate-100 bg-white"
            }`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-700">
              <CategoryIcon size={25} />
            </div>
            <div>
              <div className="text-lg font-semibold text-slate-900">
                {titleize(cat)}
              </div>
              <div className="mt-1 text-sm text-slate-500">
                {formatCount(counts[cat])}
              </div>
            </div>
          </Link>
        );
      })}
    </section>
  );
};

export default Category;
