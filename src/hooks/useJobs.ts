import type { JobFormValues } from "@/features/forms/JobForm";
import type { Job } from "@/types/job";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const API_PATH = "http://localhost:3000/api/v1/jobs";

type UseJobResult = {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  addJob: (values: JobFormValues) => Promise<void>;
  updateJob: (id: string, values: JobFormValues) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
};

export const useJob = (): UseJobResult => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(API_PATH);
      const responseData = response?.data?.jobs;
      setJobs(responseData);
    } catch (error) {
      console.error(error);
      setError("Failed to load Jobs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchJobs();
  }, [fetchJobs]);

  const addJob = useCallback(async (values: JobFormValues) => {
    try {
      setLoading(true);
      setError(null);
      const newJob = {
        company: values.company,
        role: values.role,
        status: values.status,
        description: values.description,
        appliedOn: values.appliedOn.toISOString(),
      };
      const response = await axios.post(API_PATH, newJob);
      const editResponse = response.data.job;
      setJobs((prev) => [editResponse, ...prev]);
    } catch (err) {
      console.error(err);
      setError("Failed to add a new job");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateJob = useCallback(async (id: string, values: JobFormValues) => {
    try {
      setLoading(true);
      setError(null);
      const payload = {
        company: values.company,
        role: values.role,
        status: values.status,
        description: values.description,
        appliedOn: values.appliedOn.toISOString(),
      };
      const response = await axios.patch(`${API_PATH}/${id}`, payload);
      const { job } = response.data;
      setJobs((prev) => prev.map((j) => (j.id === id ? job : j)));
    } catch (err) {
      console.error(err);
      setError("Failed while updating job");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteJob = useCallback(async (id: string) => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      await axios.delete(`${API_PATH}/${id}`);
      setJobs((prev) => prev.filter((job) => job.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed while deleting job");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    jobs,
    loading,
    error,
    refresh: fetchJobs,
    addJob,
    updateJob,
    deleteJob,
  };
};
