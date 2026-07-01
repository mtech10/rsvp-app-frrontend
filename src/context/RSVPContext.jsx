// import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
// import { getEventById } from "../data";

// const RSVPContext = createContext(null);

// export const RSVPProvider = ({ children }) => {
//   const [rsvpIds, setRsvpIds] = useState(() => {
//     if (typeof window === "undefined") return [];
//     try {
//       return JSON.parse(window.localStorage.getItem("rsvpIds")) || [];
//     } catch {
//       return [];
//     }
//   });

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       window.localStorage.setItem("rsvpIds", JSON.stringify(rsvpIds));
//     }
//   }, [rsvpIds]);

//   const addRsvp = (eventId) => {
//     setRsvpIds((current) => {
//       if (current.includes(eventId)) return current;
//       return [...current, eventId];
//     });
//   };

//   const rsvpEvents = useMemo(
//     () => rsvpIds.map((id) => getEventById(id)).filter(Boolean),
//     [rsvpIds],
//   );

//   return (
//     <RSVPContext.Provider value={{ rsvpIds, rsvpEvents, addRsvp }}>
//       {children}
//     </RSVPContext.Provider>
//   );
// };

// export const useRSVP = () => {
//   const ctx = useContext(RSVPContext);
//   if (!ctx) throw new Error("useRSVP must be used inside RSVPProvider");
//   return ctx;
// };

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getEventById } from "../data";

const RSVPContext = createContext(null);

export const RSVPProvider = ({ children }) => {
  // Now storing an array of objects: { api_id, status, tickets }
  const [registrations, setRegistrations] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(window.localStorage.getItem("rsvpRegistrations")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "rsvpRegistrations",
        JSON.stringify(registrations),
      );
    }
  }, [registrations]);

  // Update addRsvp to accept the full registration object
  const addRsvp = (registrationData) => {
    setRegistrations((current) => {
      // Prevent duplicates
      if (current.find((r) => r.api_id === registrationData.api_id))
        return current;
      return [...current, registrationData];
    });
  };

  // Merge registration status with the event details from data.js
  const rsvpEvents = useMemo(() => {
    return registrations
      .map((reg) => {
        const eventData = getEventById(reg.api_id);
        if (!eventData) return null;
        return { ...eventData, ...reg }; // Combines event info + status/tickets
      })
      .filter(Boolean);
  }, [registrations]);

  return (
    <RSVPContext.Provider value={{ rsvpEvents, addRsvp }}>
      {children}
    </RSVPContext.Provider>
  );
};

export const useRSVP = () => {
  const ctx = useContext(RSVPContext);
  if (!ctx) throw new Error("useRSVP must be used inside RSVPProvider");
  return ctx;
};
