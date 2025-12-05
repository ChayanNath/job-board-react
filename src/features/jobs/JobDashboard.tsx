import { JobFilters } from "./JobFilters";
import { useEffect, useMemo, useState } from "react";
import type { Job, JobStatus } from "@/types/job";
import { useDebounce } from "@/hooks/useDebounce";
import { JobList } from "./JobList";
import { Button } from "@/components/ui/button";
import { JobForm, type JobFormValues } from "../forms/JobForm";
import axios from "axios";
import { toast } from "sonner";

const API_PATH = "http://localhost:3000/api/v1/jobs";

export const JobDashboard = () => {
  const [jobStatus, setJobStatus] = useState<JobStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>();
  const [loading, setLoading] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleEditClick = (job: Job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const response = await axios.get(API_PATH);
      const responseData = response?.data?.jobs;
      setJobs(responseData);
      setLoading(false);
    };
    fetchJobs();
  }, []);

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
    const newJob = {
      company: values.company,
      role: values.role,
      status: values.status,
      description: values.description,
      appliedOn: values.appliedOn.toISOString(),
    };

    try {
      const response = await axios.post(API_PATH, newJob);
      const editResponse = response.data.job;
      setJobs((prev) => [editResponse, ...prev]);
      toast(editResponse.message);
    } catch (error) {
      console.error(error);
      toast("Failed to add job! Please try again later.");
    }

    setShowForm(false);
  };

  const handleUpdateJob = async (values: JobFormValues) => {
    if (!editingJob) return;
    try {
      const payload = {
        company: values.company,
        role: values.role,
        status: values.status,
        description: values.description,
        appliedOn: values.appliedOn.toISOString(),
      };
      const response = await axios.patch(
        `${API_PATH}/${editingJob.id}`,
        payload
      );
      const { message, job } = response.data;
      setJobs((prev) => prev.map((j) => (j.id === editingJob.id ? job : j)));
      toast(message);
      setEditingJob(null);
      setShowForm(false);
    } catch (error) {
      console.error(error);
      toast("Failed to add job! Please try again later.");
    }
  };

  if (loading) {
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
        <Button onClick={() => setShowForm((prev) => !prev)}>
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
