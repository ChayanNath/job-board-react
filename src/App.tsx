import { Layout } from "./components/layout/Layout";
import { ThemeProvider } from "./components/theme-provider";
import { JobsProvider } from "./context/JobsContext";
import { JobDashboard } from "./features/jobs/JobDashboard";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <JobsProvider>
        <Layout>
          <JobDashboard />
        </Layout>
        <Toaster />
      </JobsProvider>
    </ThemeProvider>
  );
}

export default App;
