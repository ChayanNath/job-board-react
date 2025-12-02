import { mockJobs } from "@/mockData/mock-jobs";
import { JobCard } from "./JobCard";
import { JobFilters } from "./JobFilters";
import { useMemo, useState } from "react";
import type { JobStatus } from "@/types/job";
import { useDebounce } from "@/hooks/useDebounce";

export const JobDashboard = () => {
  const [jobStatus, setJobStatus] = useState<JobStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const filteredResult = useMemo(() => {
    return mockJobs
      .filter((job) => jobStatus === "all" || job.status === jobStatus)
      .filter((job) => {
        const q = debouncedSearchTerm.toLowerCase();
        return (
          job.company.toLowerCase().includes(q) ||
          job.role.toLowerCase().includes(q)
        );
      });
  }, [jobStatus, debouncedSearchTerm]);

  return (
    <section className="p-4">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-xl font-semibold tracking-tight">
          Job Applications
        </h2>
        <JobFilters
          jobStatus={jobStatus}
          onStatusChange={setJobStatus}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <span className="text-sm text-muted-foreground">
          {mockJobs.length} total
        </span>
      </div>

      <div className="min-h-[200px]">
        {filteredResult.length === 0 ? (
          <p className="text-sm text-muted-foreground">No jobs found.</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredResult.map((job) => (
              <li key={job.id}>
                <JobCard job={job} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
