import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Job } from "@/types/job";

interface JobCardProps {
  job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{job.company}</CardTitle>
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
