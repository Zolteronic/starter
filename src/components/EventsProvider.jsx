import React, { createContext, useContext, useState } from "react";

const EventsContext = createContext();

export const useEvents = () => useContext(EventsContext);

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const getListEvents = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/events");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const getCategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <EventsContext.Provider
      value={{
        getCategories,
        getListEvents,
        events,
        setEvents,
        categories,
        users,
        getUsers,
        selectedEvent,
        setSelectedEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
