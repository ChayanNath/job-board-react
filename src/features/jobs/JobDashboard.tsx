import { mockJobs } from "@/mockData/mock-jobs";
import { JobFilters } from "./JobFilters";
import { useMemo, useState } from "react";
import type { Job, JobStatus } from "@/types/job";
import { useDebounce } from "@/hooks/useDebounce";
import { JobList } from "./JobList";
import { Button } from "@/components/ui/button";
import { AddJobForm, type AddJobFormValues } from "../forms/AddJobForm";

export const JobDashboard = () => {
  const [jobStatus, setJobStatus] = useState<JobStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [jobs, setJobs] = useState<Job[]>(mockJobs);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredJobList = useMemo(() => {
    return jobs
      .filter((job) => jobStatus === "all" || job.status === jobStatus)
      .filter((job) => {
        const q = debouncedSearchTerm.toLowerCase();
        return (
          job.company.toLowerCase().includes(q) ||
          job.role.toLowerCase().includes(q)
        );
      });
  }, [jobs, jobStatus, debouncedSearchTerm]);

  const handleAddJob = (values: AddJobFormValues) => {
    const newJob: Job = {
      id: crypto.randomUUID(),
      company: values.company,
      role: values.role,
      status: values.status,
      description: values.description,
      appliedOn: values.appliedOn.toISOString(),
    };

    setJobs((prev) => [newJob, ...prev]);
  };

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
          {mockJobs.length} total jobs
        </span>
        <Button onClick={() => setShowForm((prev) => !prev)}>
          {showForm ? "Close" : "Add Job"}
        </Button>
      </div>

      {showForm && <AddJobForm onSubmit={handleAddJob} />}
      <JobList filteredJobList={filteredJobList} />
    </section>
  );
};
