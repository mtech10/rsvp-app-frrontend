import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getEventById } from "../data";

const RSVPContext = createContext(null);

export const RSVPProvider = ({ children }) => {
  const [rsvpIds, setRsvpIds] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(window.localStorage.getItem("rsvpIds")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("rsvpIds", JSON.stringify(rsvpIds));
    }
  }, [rsvpIds]);

  const addRsvp = (eventId) => {
    setRsvpIds((current) => {
      if (current.includes(eventId)) return current;
      return [...current, eventId];
    });
  };

  const rsvpEvents = useMemo(
    () => rsvpIds.map((id) => getEventById(id)).filter(Boolean),
    [rsvpIds],
  );

  return (
    <RSVPContext.Provider value={{ rsvpIds, rsvpEvents, addRsvp }}>
      {children}
    </RSVPContext.Provider>
  );
};

export const useRSVP = () => {
  const ctx = useContext(RSVPContext);
  if (!ctx) throw new Error("useRSVP must be used inside RSVPProvider");
  return ctx;
};
