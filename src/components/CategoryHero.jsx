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

const CategoryHero = ({ category }) => {
  const Icon = icons[hashString(category) % icons.length] || Tag;

  return (
    <div className="mb-12 flex justify-between p-6 ">
      <div className="flex flex-col">
        <h1 className="text-4xl font-extrabold capitalize text-slate-900 border-b border-slate-600 pb-5">
          {category} Events
        </h1>

        <p className="mt-4 max-w-lg text-slate-600">
          Explore the best upcoming {category} events. Connect, learn, and grow
          with our community.
        </p>
      </div>
      <div className="mb-6 flex items-center justify-center rounded-3xl text-slate-700">
        <Icon size={200} />
      </div>
    </div>
  );
};

export default CategoryHero;
