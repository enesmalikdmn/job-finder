import { Box, Text, Button, Tag, HStack } from '@chakra-ui/react';
import { TfiBag } from 'react-icons/tfi';
import { useDisclosure } from '@chakra-ui/react';
import { DetailModal } from '../components/DetailModal';
import { useMutation } from '@tanstack/react-query';
import { applyToJob, withdrawFromJob } from '../services/jobService';

export const JobCard = ({ job }: { job: any }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Apply Mutation
  const applyMutation = useMutation({
    mutationFn: applyToJob,
    onSuccess: () => {
      console.log(`Successfully applied to job: ${job.id}`);
    },
    onError: (error) => {
      console.error('Error applying to job:', error);
    },
  });

  // Withdraw Mutation
  const withdrawMutation = useMutation({
    mutationFn: withdrawFromJob,
    onSuccess: () => {
      console.log(`Successfully withdrew from job: ${job.id}`);
    },
    onError: (error) => {
      console.error('Error withdrawing from job:', error);
    },
  });

  const handleApply = (jobId: string) => {
    applyMutation.mutate(jobId);
  };

  const handleWithdraw = (jobId: string) => {
    withdrawMutation.mutate(jobId);
  };

  return (
    <Box className="flex flex-col lg:flex-row border rounded-lg p-6 shadow-md gap-6">
      <Box className="flex flex-col lg:flex-shrink-0">
        <TfiBag size={36} />
      </Box>
      <Box className="flex flex-col lg:flex-1">
        <Box className="flex items-center gap-2">
          <Text fontWeight="bold" fontSize="lg">
            {job.companyName} - {job.name}
          </Text>
        </Box>
        <Text className="text-gray-600 mt-2">{job.description}</Text>
        <Text className="text-sm text-gray-500 mt-2">Location: {job.location}</Text>
        <Text className="text-sm text-gray-500">Salary: {job.salary}$</Text>
        <HStack spacing={2} className="mt-2">
          {job.keywords?.map((tag: string, index: number) => (
            <Tag key={index} colorScheme="blue">
              {tag}
            </Tag>
          ))}
        </HStack>
      </Box>
      <Box className="flex flex-col lg:items-end lg:flex-shrink-0 gap-2">
        <Button colorScheme="blue" size="sm" w="full" onClick={onOpen}>
          Detail
        </Button>
        <Button
          colorScheme="red"
          size="sm"
          variant="outline"
          w="full"
          onClick={() => handleWithdraw(job.id)}
          isLoading={withdrawMutation.isLoading}
        >
          Withdraw
        </Button>
      </Box>

      <DetailModal isOpen={isOpen} onClose={onClose} job={job} onApply={handleApply} />
    </Box>
  );
};
