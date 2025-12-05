import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Job } from "@/types/job";
import { Edit } from "lucide-react";

interface JobCardProps {
  job: Job;
  editHandler: (job: Job) => void;
}

export const JobCard = ({ job, editHandler }: JobCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{job.company}</CardTitle>
        <CardDescription>{job.description}</CardDescription>
        <Edit onClick={() => editHandler(job)} />
      </CardHeader>
      <CardContent>
        <div>Role: {job.role}</div>
        <div>Status: {job.status}</div>
        {job.appliedOn && <div>Applied On: {job.appliedOn}</div>}
      </CardContent>
    </Card>
  );
};
