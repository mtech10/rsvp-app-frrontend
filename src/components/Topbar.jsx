import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { navLinks, utilityActions, logoConfig } from "../data";

const topbar = () => {
  const [timeString, setTimeString] = useState(() => {
    if (typeof window !== "undefined") {
      return new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: false,
        timeZoneName: "shortOffset",
      });
    }
    return;
  });
  const [active, setActive] = useState(navLinks.id === 1);

  useEffect(() => {
    const updateTime = () => {
      setTimeString(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: false,
          timeZoneName: "shortOffset",
        }),
      );
    };

    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);
  const LogoIcon = logoConfig.icon;

  return (
    <div className="sticky top-0 z-50 flex p-4 items-center justify-between">
      <div className="text-slate-500">
        <LogoIcon size={20} />
      </div>
      <div className="flex gap-6 items-center text-slate-500">
        {navLinks.map((link) => {
          const IconComponent = link.icon;
          return (
            <NavLink
              key={link.id}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-2 transition-colors hover:text-slate-900 ${
                  isActive ? "text-slate-500 font-semibold" : "text-slate-900"
                }`
              }
            >
              <IconComponent size={18} className="shrink-0" />
              <span className="leading-none">{link.name}</span>
            </NavLink>
          );
        })}
      </div>
      <div className="flex gap-4 items-center text-slate-500">
        <span className="text-sm font-medium mr-2">{timeString}</span>
        <button className="hover:text-slate-900 font-medium text-sm transition-colors cursor-pointer">
          Create Event
        </button>

        {utilityActions.map((action) => {
          const ActionIcon = action.icon;
          return (
            <button
              key={action.id}
              title={action.name}
              className="hover:text-slate-900 transition-colors p-1 rounded-full hover:bg-slate-50 cursor-pointer"
            >
              <ActionIcon size={action.size} />
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default topbar;
