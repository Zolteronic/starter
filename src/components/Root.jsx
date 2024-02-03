import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import { EventsProvider } from "./EventsProvider";
import { useState } from "react";
import { NavigationContext } from "./NavigationContext";
import { EventContext } from "./EventContext";

export const Root = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [event, setEvent] = useState();
  const [events, setEvents] = useState();
  return (
    <NavigationContext.Provider value={{ showSidebar, setShowSidebar }}>
      <EventsProvider>
        <EventContext.Provider
          value={{
            event,
            setEvent,
            events,
            setEvents,
          }}
        >
          <Box>
            <Navigation />
            <Outlet />
          </Box>
        </EventContext.Provider>
      </EventsProvider>
    </NavigationContext.Provider>
  );
};
