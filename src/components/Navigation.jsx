import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Link, Flex, Spacer, Button } from "@chakra-ui/react";
import { NavigationContext } from "./NavigationContext";
import { useContext } from "react";
import { EventContext } from "./EventContext";
import { useEvents } from "../components/EventsProvider";

export const Navigation = () => {
  const { showSidebar } = useContext(NavigationContext);
  const { events, setEvents } = useContext(EventContext); // Use event from EventContext
  const {
    events: eventsData,
    categories,
    users,
    getUsers,
    getCategories,
    getListEvents,
  } = useEvents();

  const handleDelete = () => {
    if (!events) {
      console.error("No event selected" + events);
      return;
    }

    fetch(`http://localhost:3000/events/${events.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete event");
        }
        setEvents(null);
        window.location.reload();
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };

  const handleEdit = () => {
    console.log("edit", event);
  };
  return (
    <Box
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Box
        bg="teal.500"
        p={4}
        color="white"
        style={{ position: "sticky", width: "100%" }}
      >
        <Flex>
          <Link as={RouterLink} to="/" mr={4}>
            <Button colorScheme="teal">Events</Button>
          </Link>
          <Spacer />
          <Link as={RouterLink} to="/event/1">
            <Button colorScheme="teal">Event</Button>
          </Link>
        </Flex>
      </Box>
      {showSidebar && (
        <Box
          position="fixed"
          width="200px"
          backgroundColor="gray.200"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          minHeight="100vh"
        >
          <Flex flexDirection={"column"}>
            <Button
              onClick={handleDelete}
              colorScheme="teal"
              width={"100px"}
              mt={8}
            >
              Delete
            </Button>
            <Button colorScheme="teal" width={"100px"} mt={8}>
              Edit
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
};
