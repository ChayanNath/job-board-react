export type JobStatus =
  | "all"
  | "applied"
  | "interviewing"
  | "offer"
  | "rejected";

export interface Job {
  id: string;
  company: string;
  role: string;
  status: JobStatus;
  appliedOn: string;
  description: string;
}
