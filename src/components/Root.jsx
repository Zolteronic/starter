import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import { EventsProvider } from "./EventsProvider";
import { useState } from "react";
import { NavigationProvider } from "./NavigationContext";
import { EventContext } from "./EventContext";
import { FormDataProvider } from "./FormDataContext";

export const Root = () => {
  const [event, setEvent] = useState();
  const [events, setEvents] = useState();
  return (
    <EventsProvider>
      <EventContext.Provider
        value={{
          event,
          setEvent,
          events,
          setEvents,
        }}
      >
        <NavigationProvider>
          <FormDataProvider>
            <Box>
              <Navigation />
              <Outlet />
            </Box>
          </FormDataProvider>
        </NavigationProvider>
      </EventContext.Provider>
    </EventsProvider>
  );
};
