import { createContext, useState } from "react";

export const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [eventId, setCurrentEventId] = useState(null);

  return (
    <NavigationContext.Provider
      value={{ showSidebar, setShowSidebar, eventId, setCurrentEventId }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
