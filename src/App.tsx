import { Layout } from "./components/layout/Layout";
import { ThemeProvider } from "./components/theme-provider";
import { JobsProvider } from "./context/JobsContext";
import { JobDashboard } from "./features/jobs/JobDashboard";
import { Toaster } from "@/components/ui/sonner";
import { createBrowserRouter, RouterProvider } from "react-router";
import { SettingsLanding } from "./features/settings/SettingsLanding";
import { JobDetails } from "./features/jobs/JobDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <JobDashboard />,
      },
      {
        path: "job/:id",
        element: <JobDetails />,
      },
      {
        path: "settings",
        element: <SettingsLanding />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <JobsProvider>
        <RouterProvider router={router} />
        <Toaster />
      </JobsProvider>
    </ThemeProvider>
  );
}

export default App;
