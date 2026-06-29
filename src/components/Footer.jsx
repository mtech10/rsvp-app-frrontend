import React from "react";
import { NavLink } from "react-router-dom";
import { navLinks, logoConfig, footerLinks } from "../data";

const Footer = () => {
  const LogoIcon = logoConfig.icon;

  return (
    <footer className="border-t border-slate-300 py-4 px-6">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="text-slate-500">
            <LogoIcon size={20} />
          </div>

          <div className="flex gap-6 items-center text-sm font-medium">
            {navLinks.map((link) => (
              <NavLink
                key={link.id}
                to={link.path}
                className={({ isActive }) =>
                  `transition-colors hover:text-slate-600 ${
                    isActive ? "text-slate-600 font-semibold" : "text-slate-400"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex gap-4 text-slate-500">
            {footerLinks.map((action) => {
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

          <button className="px-4 py-1.5 border border-slate-300 rounded-full text-sm font-medium text-slate-400 hover:text-slate-600 hover:border-slate-400 transition-all bg-white">
            Get the App
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
