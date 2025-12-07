import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Job } from "@/types/job";
import { Edit, Trash } from "lucide-react";

interface JobCardProps {
  job: Job;
  editHandler: (job: Job) => void;
  deleteHandler: (jobId: string) => void;
}

export const JobCard = ({ job, editHandler, deleteHandler }: JobCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          {job.company}
          <div className="flex gap-2">
            <Edit onClick={() => editHandler(job)} />{" "}
            <Trash onClick={() => deleteHandler(job.id)} />
          </div>
        </CardTitle>
        <CardDescription>{job.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>Role: {job.role}</div>
        <div>Status: {job.status}</div>
        {job.appliedOn && <div>Applied On: {job.appliedOn}</div>}
      </CardContent>
    </Card>
  );
};
