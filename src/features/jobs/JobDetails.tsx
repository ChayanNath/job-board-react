import { API_PATH } from "@/hooks/useJobs";
import type { Job } from "@/types/job";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const JobDetails = () => {
  const [error, setError] = useState<string>("");
  const [currentJob, setCurrentJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams<{ id: string }>();

  const fetchJob = async (id: string | undefined) => {
    setError("");
    setIsLoading(true);

    try {
      if (!id) {
        setError("Job id not provided");
        return;
      }

      const response = await axios.get(`${API_PATH}/${id}`);
      const job = response.data.job as Job;
      setCurrentJob(job);
    } catch (err) {
      setError("Job not found or failed to fetch from server");
      setCurrentJob(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJob(id);
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (isLoading && !currentJob) {
    return <div>Loading job details...</div>;
  }

  if (!currentJob) {
    return <div>No job data</div>;
  }

  return (
    <div>
      <h2>{currentJob.company}</h2>
      <p>Description: {currentJob.description}</p>
    </div>
  );
};
