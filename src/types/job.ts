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
  status: "applied" | "interviewing" | "offer" | "rejected";
  appliedOn: string;
  description: string;
}
