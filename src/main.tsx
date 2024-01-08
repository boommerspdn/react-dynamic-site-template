import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  Router,
  Route,
  RootRoute,
} from "@tanstack/react-router";
import App from "./App";
import HomePage from "./routes/root/page";
import AboutPage from "./routes/about-page/page";

const rootRoute = new RootRoute({
  component: () => <App />,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <HomePage />,
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/about-us",
  component: () => <AboutPage />,
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
