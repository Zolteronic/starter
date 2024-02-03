import { Flex, Input } from "@chakra-ui/react";

import { useEffect, useState } from "react";

export const SearchFunction = ({ events, onFilter, categories }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(events);

  useEffect(() => {
    const filtered = events.filter(
      (event) =>
        (event.title &&
          event.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (event.categoryIds &&
          event.categoryIds.some((id) =>
            categories.some(
              (category) =>
                category.id === id &&
                category.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
          ))
    );
    setFilteredEvents(filtered);
    onFilter(filtered);
  }, [searchTerm, events, onFilter, categories]);

  return (
    <>
      <Flex justifyContent={"center"} display={"flex"}>
        <Input
          width={`50rem`}
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Flex>
    </>
  );
};
