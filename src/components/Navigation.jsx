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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { NavigationContext } from "./NavigationContext";
import { useContext } from "react";
import { useEvents } from "../components/EventsProvider";
import { FormDataContext } from "../components/FormDataContext";

export const Navigation = () => {
  const { selectedEvent } = useEvents();
  const { showSidebar } = useContext(NavigationContext);
  const {
    events,

    categories,
    setEvents,
  } = useEvents();
  const { eventId } = useContext(NavigationContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const deleteDisclosure = useDisclosure();
  const editDisclosure = useDisclosure();
  const { formData, setFormData, initialFormData } =
    useContext(FormDataContext);

  const navigate = useNavigate();
  const toast = useToast();

  const handleCategoryChange = (event) => {
    const selectedCategoryId = Number(event.target.value);
    setFormData((prev) => ({
      ...prev,
      categoryIds: [selectedCategoryId],
    }));
  };

  console.log("event id in navigation", eventId);

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

  const handleEdit = async () => {
    console.log("edit", selectedEvent);
    editDisclosure.onOpen();

    // Populate the form with the selected event data
    setFormData(selectedEvent);
  };
  const handleToast = () => {
    toast({
      title: "Event saved.",
      description: "Your changes have been successfully saved.",
      status: "success",
      duration: 7000,
      isClosable: true,
    });
  };
  const handleFormSubmit = async (event) => {
    editDisclosure.onOpen();
    event.preventDefault();

    const response = await fetch(`http://localhost:3000/events/${eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const updatedEvent = await response.json();

      // Update the local state
      setEvents(
        events.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event
        )
      );

      // Reset the formData to the initial values
      setFormData(initialFormData);
      handleToast();
      editDisclosure.onClose();
    } else {
      console.error("Er is iets misgegaan bij het bijwerken van het evenement");
    }
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
                    Are you sure? You can&apos;t undo this action afterwards.
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
            <Modal
              isOpen={editDisclosure.isOpen}
              onClose={editDisclosure.onClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit Event</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl>
                    <FormLabel>Event Name</FormLabel>
                    <Input
                      placeholder="Event Name"
                      value={formData.title || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                    <FormLabel>Event Description</FormLabel>
                    <Input
                      placeholder="Event Description"
                      value={formData.description || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                    <FormLabel mt={"20px"}>Start time</FormLabel>
                    <Input
                      type="datetime-local"
                      name="startTime"
                      value={formData.startTime || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, startTime: e.target.value })
                      }
                    />
                    <FormLabel mt={"20px"}>End time</FormLabel>
                    <Input
                      type="datetime-local"
                      name="endTime"
                      value={formData.endTime || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, endTime: e.target.value })
                      }
                    />
                    <FormLabel mt={"20px"}>Category</FormLabel>
                    <Select
                      name="categoryIds"
                      value={formData.categoryIds[0] || ""}
                      onChange={handleCategoryChange}
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {categories.map((category) => (
                        <option value={category.id} key={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={handleFormSubmit}>
                    Save
                  </Button>
                  <Button variant="ghost" onClick={editDisclosure.onClose}>
                    Cancel
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Flex>
        </Box>
      )}
    </Box>
  );
};
