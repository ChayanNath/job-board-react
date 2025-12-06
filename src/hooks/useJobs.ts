import type { JobFormValues } from "@/features/forms/JobForm";
import type { Job } from "@/types/job";
import axios from "axios";
import { useState } from "react";

const API_PATH = "http://localhost:3000/api/v1/jobs";

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

  const fetchJobs = async () => {
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
  };

  const addJob = async (values: JobFormValues) => {
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
    } catch (error) {
      console.error(error);
      setError("Failed to add a new job");
    } finally {
      setLoading(false);
    }
  };

  const updateJob = async (id: string, values: JobFormValues) => {
    if (!id) return;
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
      const { message, job } = response.data;
      setJobs((prev) => prev.map((j) => (j.id === id ? job : j)));
    } catch (error) {
      console.error(error);
      setError("Failed while updating job");
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id: string) => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      await axios.delete(`${API_PATH}/${id}`);
      setJobs((prev) => prev.filter((job) => job.id !== id));
    } catch {
      console.error(error);
      setError("Failed while deleting job");
    } finally {
      setLoading(false);
    }
  };

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
