import React, { useEffect, useContext } from "react";
import { useEvents } from "../components/EventsProvider";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Box, Heading, Image, Flex, Text } from "@chakra-ui/react";
import { NavigationContext } from "../components/NavigationContext";

export const EventPage = () => {
  const { setSelectedEvent } = useEvents();
  const { eventId } = useParams();
  const {
    events,
    getListEvents,
    getCategories,
    getUsers,
    users,
    categories,
    isLoading,
    error,
  } = useEvents();
  const [event, setEvent] = useState(null);
  const { setShowSidebar, setCurrentEventId } = useContext(NavigationContext);

  useEffect(() => {
    setCurrentEventId(eventId);
  }, [eventId, setCurrentEventId]);

  useEffect(() => {
    if (events) {
      const foundEvent = events.find((event) => event.id === Number(eventId));
      setEvent(foundEvent);
      setSelectedEvent(foundEvent);
    }
  }, [events, eventId]);

  useEffect(() => {
    setShowSidebar(true);
    return () => {
      setShowSidebar(false);
    };
  }, []);

  const formattedDate = (date) => {
    if (!date) {
      return "";
    }
    const parts = date.split("T");
    if (parts.length < 2) {
      return date;
    }
    const [datePart, timePart] = parts;
    const [year, month, day] = datePart.split("-");
    const [hour, minute] = timePart.split(":");
    return `${day}-${month}-${year} ${hour}:${minute}`;
  };

  useEffect(() => {
    if (typeof getListEvents === "function") {
      getListEvents();
    }
    if (typeof getCategories === "function") {
      getCategories();
    }
    if (typeof getUsers === "function") {
      getUsers();
    }
  }, []);

  useEffect(() => {
    console.log("Events:", events);
    console.log("ID:", eventId);
    if (events) {
      const foundEvent = events.find((event) => event.id === Number(eventId));
      console.log("Found event:", foundEvent);
      setEvent(foundEvent);
    }
  }, [events, eventId]);

  if (
    isLoading ||
    !categories ||
    !event ||
    !events ||
    (event && (!event.image || !event.title))
  ) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }
  console.log("users:", users);

  const createdByUser = users.find((user) => user.id === event.createdBy);

  return (
    <>
      <Flex justifyContent={"center"} display={"flex"}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          p={4}
          m={4}
          border={"1px"}
          borderColor={"gray.200"}
          width={"1000px"}
          justifyContent={"center"}
        >
          <Flex justifyContent={"center"}>
            <Heading>{event.title}</Heading>
          </Flex>
          <Flex justifyContent={"center"} m={4}>
            <Text fontSize={"lg"} style={{ fontStyle: "italic" }}>
              {event.description}
            </Text>
          </Flex>
          <Image src={event.image} width={"1000px"}></Image>
          <Text style={{ fontWeight: "bold" }} mt={4}>
            Start time: {formattedDate(event.startTime)}
          </Text>
          <Text style={{ fontWeight: "bold" }} mt={4}>
            End Time: {formattedDate(event.endTime)}
          </Text>
          {event.categoryIds &&
            event.categoryIds.map((categoryId) => {
              const category = categories.find(
                (category) => category.id === categoryId
              );
              return (
                category && (
                  <Text mt={2} key={categoryId}>
                    {category.name}
                  </Text>
                )
              );
            })}
          {createdByUser && (
            <>
              <Text mt={4}>Created by: {createdByUser.name}</Text>
              <Image mt={4} src={createdByUser.image} width={"150px"}></Image>
            </>
          )}
        </Box>
      </Flex>
    </>
  );
};
