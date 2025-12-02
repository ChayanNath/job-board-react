import type { JobStatus } from "@/types/job";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";

const JOB_STATES: { value: JobStatus; label: string }[] = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "applied",
    label: "Applied",
  },
  {
    value: "interviewing",
    label: "Interviewing",
  },
  {
    value: "offer",
    label: "Offer",
  },
  {
    value: "rejected",
    label: "Rejected",
  },
];

type JobFilterProps = {
  jobStatus: JobStatus;
  onStatusChange: (status: JobStatus) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

export const JobFilters = ({
  jobStatus,
  onStatusChange,
  searchTerm,
  onSearchChange,
}: JobFilterProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-2">
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {jobStatus
              ? JOB_STATES.find((status) => status.value === jobStatus)?.label
              : "Select status..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search status..." className="h-9" />
            <CommandList>
              <CommandEmpty>No status found.</CommandEmpty>
              <CommandGroup>
                {JOB_STATES.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(currentValue) => {
                      onStatusChange(currentValue as JobStatus);
                      setOpen(false);
                    }}
                  >
                    {status.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        jobStatus === status.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
