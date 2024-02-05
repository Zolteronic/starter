import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import { FormDataContext } from "../components/FormDataContext";

import { NavigationContext } from "../components/NavigationContext";

export const NewPage = () => {
  const { setShowSidebar } = useContext(NavigationContext);
  const { formData, setFormData, categories, setCategories, initialFormData } =
    useContext(FormDataContext);

  useEffect(() => {
    setShowSidebar(false);
    return () => {
      setShowSidebar(false);
    };
  }, []);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3000/users");
      const data = await response.json();
      setUsers(data);
    };

    const fetchCategories = async () => {
      const response = await fetch("http://localhost:3000/categories");
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
    fetchUsers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let createdBy = formData.createdBy;
    const existingUser = users.find((user) => user.name === createdBy);

    if (!existingUser) {
      // Create new user if they don't exist
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: createdBy,
          image:
            "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg",
        }),
      });
      const newUser = await response.json();
      createdBy = newUser.id;
    } else {
      createdBy = existingUser.id;
    }

    // Create new event
    await fetch("http://localhost:3000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        createdBy,
      }),
    });

    setFormData(initialFormData);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "categoryIds") {
      setFormData((prev) => ({
        ...prev,
        [name]: [...prev.categoryIds, Number(value)],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCategoryChange = (event) => {
    const selectedCategoryId = Number(event.target.value);
    setFormData((prev) => ({
      ...prev,
      categoryIds: [selectedCategoryId],
    }));
  };
  return (
    <Box maxW="1000" m="30px">
      <Box as="form" onSubmit={handleSubmit} maxW="1000" m="30px">
        <FormControl id="createdBy">
          <FormLabel mt={"20px"}>Created By</FormLabel>
          <Input name="createdBy" onChange={handleChange} />
        </FormControl>
        <FormControl id="title">
          <FormLabel mt={"20px"}>Title</FormLabel>
          <Input name="title" onChange={handleChange} />
        </FormControl>
        <FormControl id="description">
          <FormLabel mt={"20px"}>Description</FormLabel>
          <Textarea name="description" onChange={handleChange} />
        </FormControl>
        <FormControl id="Start time">
          <FormLabel mt={"20px"}>Start time</FormLabel>
          <Input
            type="datetime-local"
            name="startTime"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="End time">
          <FormLabel mt={"20px"}>End time</FormLabel>
          <Input type="datetime-local" name="endTime" onChange={handleChange} />
        </FormControl>
        <FormControl id="categoryIds">
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
        <Button mt={4} colorScheme="teal" type="submit">
          Submit
        </Button>
      </Box>
    </Box>
  );
};
