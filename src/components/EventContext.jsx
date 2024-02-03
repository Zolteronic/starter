import React, { createContext, useState } from "react";

export const EventContext = createContext();

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState(); // of een andere initiële staat
  const [event, setEvent] = useState();

  return (
    <EventContext.Provider value={{ events, setEvents, event, setEvent }}>
      {children}
    </EventContext.Provider>
  );
};
