import { Layout } from "./components/layout/Layout";
import { ThemeProvider } from "./components/theme-provider";
import { JobsProvider } from "./context/JobsContext";
import { JobDashboard } from "./features/jobs/JobDashboard";
import { Toaster } from "@/components/ui/sonner";
import { createBrowserRouter, RouterProvider } from "react-router";
import { SettingsLanding } from "./features/settings/SettingsLanding";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <JobDashboard />
      </Layout>
    ),
  },
  {
    path: "/settings",
    element: (
      <Layout>
        <SettingsLanding />
      </Layout>
    ),
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
