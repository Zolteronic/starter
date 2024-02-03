import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Link,
  Flex,
  Spacer,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { NavigationContext } from "./NavigationContext";
import { useContext } from "react";
import { useEvents } from "../components/EventsProvider";

export const Navigation = () => {
  const { selectedEvent, setSelectedEvent } = useEvents();
  const { showSidebar } = useContext(NavigationContext);
  const { events, setEvents } = useEvents(); // Use event from EventContext
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const navigate = useNavigate();

  const handleDelete = () => {
    if (!selectedEvent) {
      console.error("No event selected");
      return;
    }

    fetch(`http://localhost:3000/events/${selectedEvent.id}`, {
      method: "DELETE",
    })
      .then(() => {
        // Update the local state
        setEvents(events.filter((event) => event.id !== selectedEvent.id));
        navigate("/");
        onClose();
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation: ", error);
      });
  };

  const handleEdit = () => {
    console.log("edit", selectedEvent);
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
              as={Link}
              to="/"
              onClick={onOpen}
              colorScheme="teal"
              width={"100px"}
              mt={8}
            >
              Delete
            </Button>
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete Event
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button colorScheme="red" onClick={handleDelete} ml={3}>
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
            <Button
              onClick={handleEdit}
              colorScheme="teal"
              width={"100px"}
              mt={8}
            >
              Edit
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
};
