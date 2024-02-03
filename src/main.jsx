import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage } from "./pages/EventPage";
import { EventsPage } from "./pages/EventsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import { NewPage } from "./pages/NewPage";
import { EventsProvider } from "./components/EventsProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
      },
      {
        path: "/event/new",
        element: <NewPage />,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <EventsProvider>
        <RouterProvider router={router} />
      </EventsProvider>
    </ChakraProvider>
  </React.StrictMode>
);
