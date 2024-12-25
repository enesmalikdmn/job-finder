import { Box, Text } from "@chakra-ui/react";
import { Job } from "../../types/jobTypes";
import JobCard from "../components/JobCard";

interface JobListProps {
  jobs: Job[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  if (jobs.length === 0) {
    return <Text>No jobs found. Try adjusting your search or filters.</Text>;
  }

  return (
    <Box
      className="space-y-4"
      overflowY="auto"
      maxHeight="calc(100vh - 300px)"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      p="4"
    >
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </Box>
  );
};

export default JobList;
