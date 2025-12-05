import type { Job } from "@/types/job";
import { JobCard } from "./JobCard";

interface JobListProps {
  filteredJobList: Job[];
  editHandler: (job: Job) => void;
}

export const JobList = ({ filteredJobList, editHandler }: JobListProps) => {
  return (
    <div className="min-h-[200px]">
      {filteredJobList.length === 0 ? (
        <p className="text-sm text-muted-foreground">No jobs found.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredJobList.map((job) => (
            <li key={job.id}>
              <JobCard editHandler={editHandler} job={job} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
