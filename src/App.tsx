import { Layout } from "./components/layout/Layout";
import { ThemeProvider } from "./components/theme-provider";
import { JobDashboard } from "./features/jobs/JobDashboard";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <JobDashboard />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
