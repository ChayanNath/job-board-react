import { Layout } from "./components/layout/Layout";
import { ThemeProvider } from "./components/theme-provider";
import { JobDashboard } from "./features/jobs/JobDashboard";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <JobDashboard />
      </Layout>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
