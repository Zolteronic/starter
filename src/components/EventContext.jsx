import React, { createContext, useState } from "react";

export const EventContext = createContext();

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState(); // of een andere initiële staat
  const [selectedEvent, setSelectedEvent] = useState();

  return (
    <EventContext.Provider
      value={{ events, setEvents, selectedEvent, setSelectedEvent }}
    >
      {children}
    </EventContext.Provider>
  );
};
