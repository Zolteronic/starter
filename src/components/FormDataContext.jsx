import { createContext, useState } from "react";

export const FormDataContext = createContext();

export const FormDataProvider = ({ children }) => {
  const [eventId, setEventId] = useState(null);
  const initialFormData = {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg",
    createdBy: "",
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    categoryIds: [],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [categories, setCategories] = useState([]);

  return (
    <FormDataContext.Provider
      value={{
        formData,
        setFormData,
        categories,
        setCategories,
        initialFormData,
        eventId,
        setEventId,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
};
