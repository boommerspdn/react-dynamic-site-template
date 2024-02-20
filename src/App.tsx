import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "@/App.css";

import NotFoundPage from "@/not-found";
import ErrorBoundary from "@/error";
import Layout from "@/layout";
import AboutPage from "@/routes/about-us/page";
import HomePage from "@/routes/root/page";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "about-us",
        Component: AboutPage,
      },
    ],
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
