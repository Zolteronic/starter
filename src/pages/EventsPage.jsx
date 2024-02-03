import React from "react";
import { useState, useEffect, useContext } from "react";
import { Heading, Image, Box, Flex, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { SearchFunction } from "../components/SearchFunction";
import { NavigationContext } from "../components/NavigationContext";

export const EventsPage = () => {
  const [events, setEvents] = useState(null);
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState(events);

  const { setShowSidebar } = useContext(NavigationContext);

  useEffect(() => {
    setShowSidebar(false);
    return () => {
      setShowSidebar(true);
    };
  }, []);

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

  useEffect(() => {
    getListEvents();
    getCategories();
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

  if (isLoading || categories === null || events === null) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  return (
    <>
      <Button as={Link} to="/event/new" colorScheme="teal" size="lg" m="1rem">
        Add new event yourself!
      </Button>
      <Heading
        mt={-10}
        size={"lg"}
        mb="1rem"
        display="flex"
        justifyContent={"center"}
      >
        Welcome to the events list!
      </Heading>
      <SearchFunction
        events={events}
        categories={categories}
        onFilter={setFilteredEvents}
      />

      <Flex
        display="flex"
        direction="row"
        wrap={"wrap"}
        justifyContent="center"
      >
        {filteredEvents &&
          filteredEvents.map((event) => (
            <Link to={`/event/${event.id}`} key={event.id}>
              <Box maxWidth="400px" position="relative">
                <Box
                  key={event.id}
                  maxWidth="400px"
                  m="1rem"
                  p="20px"
                  border="1px solid "
                  shadow="lg"
                  _hover={{
                    bg: "gray.100",
                    transformOrigin: "center",
                    boxSizing: "border-box",
                    transform: "scale(1.015)",
                    cursor: "pointer",
                    transition: "all 0.15s ease-in-out",
                    shadow: "xl",
                    textDecoration: "none",
                    color: "black",
                    border: "2px solid black",
                  }}
                  borderRadius="2%"
                  textAlign="center"
                  minHeight="460px"
                >
                  <div>
                    <Heading mb={"0.5rem"} size={"md"}>
                      {event.title}
                    </Heading>
                    <p style={{ marginBottom: "0.1rem" }}>
                      {event.description}
                    </p>
                    <Image
                      src={event.image}
                      height={"200px"}
                      width={"350px"}
                      alt={event.name}
                      borderRadius="md"
                      objectFit="cover"
                      mb="1rem"
                    ></Image>
                    <p>Start time: {formattedDate(event.startTime)}</p>
                    <p>End time: {formattedDate(event.endTime)}</p>
                    <br></br>
                    {event.categoryIds && event.categoryIds.length > 0 && (
                      <>
                        <p>Category:</p>
                        <Flex wrap={"wrap"} justifyContent={"center"}>
                          {event.categoryIds &&
                            event.categoryIds.map((categoryId) => {
                              const category = categories.find(
                                (category) => category.id === categoryId
                              );
                              return (
                                category && (
                                  <Text mr="2" key={categoryId}>
                                    <Button
                                      colorScheme="teal"
                                      size="md"
                                      m="0.5rem"
                                    >
                                      {category.name}
                                    </Button>
                                  </Text>
                                )
                              );
                            })}
                        </Flex>
                      </>
                    )}
                  </div>
                </Box>
              </Box>
            </Link>
          ))}
      </Flex>
    </>
  );
};
