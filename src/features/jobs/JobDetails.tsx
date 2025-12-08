import { useJob } from "@/hooks/useJobs";
import type { Job } from "@/types/job";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const JobDetails = () => {
  const [error, setError] = useState<string>("");
  const [currentJob, setCurrentJob] = useState<Job | null>();
  const { id } = useParams();

  const { jobs } = useJob();

  const fetchJob = (id: string | undefined) => {
    setError("");
    if (!id) return;
    console.log(jobs);
    const job = jobs.find((j) => String(j.id) === String(id));
    console.log(job);
    if (!job) {
      setError("Job not found");
    }

    return job;
  };

  useEffect(() => {
    setCurrentJob(fetchJob(id));
  }, [id, jobs]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>{currentJob?.company}</h2>
      <p>Description: {currentJob?.description}</p>
    </div>
  );
};
