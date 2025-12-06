import { JobFilters } from "./JobFilters";
import { useMemo, useState } from "react";
import type { Job, JobStatus } from "@/types/job";
import { useDebounce } from "@/hooks/useDebounce";
import { JobList } from "./JobList";
import { Button } from "@/components/ui/button";
import { JobForm, type JobFormValues } from "../forms/JobForm";
import { toast } from "sonner";
import { useJob } from "@/hooks/useJobs";

export const JobDashboard = () => {
  const [jobStatus, setJobStatus] = useState<JobStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleEditClick = (job: Job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const { jobs, loading, error, addJob, updateJob, deleteJob } = useJob();

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

  const handleAddJob = async (values: JobFormValues) => {
    try {
      await addJob(values);
      toast("Job added successfully");
      setShowForm(false);
    } catch {
      toast("Failed to add job");
    }
  };

  const handleUpdateJob = async (values: JobFormValues) => {
    try {
      if (!editingJob?.id) return;
      await updateJob(editingJob?.id, values);
      toast("Job updated successfully");
      setEditingJob(null);
      setShowForm(false);
    } catch {
      toast("Failed to updated job");
    }
  };

  const handleDeleteJob = async (id: string) => {
    try {
      if (!id) return;
      await deleteJob(id);
      toast("Job deleted successfully");
    } catch {
      toast("Failed to remove job");
    }
  };

  if (loading && jobs.length === 0) {
    return <div>Loading...</div>;
  }

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
          {jobs?.length} total jobs
        </span>
        <Button
          onClick={() => {
            setShowForm((prev) => !prev);
            if (showForm) {
              setEditingJob(null);
            }
          }}
        >
          {showForm ? "Close" : "Add Job"}
        </Button>
      </div>

      {showForm && (
        <JobForm
          mode={editingJob ? "edit" : "create"}
          initialValues={
            editingJob
              ? {
                  company: editingJob.company,
                  role: editingJob.role,
                  description: editingJob.description,
                  status: editingJob.status,
                  appliedOn: new Date(editingJob.appliedOn),
                }
              : undefined
          }
          onSubmit={editingJob ? handleUpdateJob : handleAddJob}
        />
      )}
      <JobList
        filteredJobList={filteredJobList}
        editHandler={handleEditClick}
      />
    </section>
  );
};
