import { useJob } from "@/hooks/useJobs";
import { createContext, useContext } from "react";

type JobsContextType = ReturnType<typeof useJob>;

const JobsContext = createContext<JobsContextType | null>(null);

export const JobsProvider = ({ children }: { children: React.ReactNode }) => {
  const jobStore = useJob();

  return (
    <JobsContext.Provider value={jobStore}>{children}</JobsContext.Provider>
  );
};

export function useJobsContext() {
  const context = useContext(JobsContext);
  if (!context)
    throw new Error("useJobsContext must be used within JobsProvider");
  return context;
}
