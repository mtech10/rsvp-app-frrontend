import React from "react";
import {
  Cpu,
  Coffee,
  Palette,
  Leaf,
  Activity,
  Tag,
  Zap,
  Star,
  Music,
  Film,
} from "lucide-react";
import { getEvents } from "../data";

const icons = [
  Cpu,
  Coffee,
  Palette,
  Leaf,
  Activity,
  Tag,
  Zap,
  Star,
  Music,
  Film,
];

const hashString = (s) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
  return Math.abs(h);
};

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
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onSelect?.(cat)}
          className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition hover:border-slate-300 hover:bg-slate-50 ${
            selectedCategory === cat ? "border-indigo-500 bg-slate-50" : "border-slate-100 bg-white"
          }`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-700">
            {React.createElement(icons[hashString(cat) % icons.length] || Tag, { size: 25 })}
          </div>
          <div>
            <div className="text-lg font-semibold text-slate-900">{titleize(cat)}</div>
            <div className="mt-1 text-sm text-slate-500">{formatCount(counts[cat])}</div>
          </div>
        </button>
      ))}
    </section>
  );
};

export default Category;
