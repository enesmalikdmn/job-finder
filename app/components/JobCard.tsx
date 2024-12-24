import { Box, Text, Button, Tag, HStack, useToast } from '@chakra-ui/react';
import { TfiBag } from 'react-icons/tfi';
import { useDisclosure } from '@chakra-ui/react';
import { DetailModal } from '../components/DetailModal';
import { useMutation } from '@tanstack/react-query';
import { applyToJob, withdrawFromJob } from '../services/jobService';

export const JobCard = ({ job }: { job: any }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const applyMutation = useMutation({
    mutationFn: applyToJob,
    onSuccess: () => {
      toast({
        title: 'Application Successful',
        description: `You have successfully applied to job: ${job.name}.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    },
    onError: (error) => {
      toast({
        title: 'Application Failed',
        description: `Could not apply to job: ${job.name}. Please try again.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    },
  });

  const withdrawMutation = useMutation({
    mutationFn: withdrawFromJob,
    onSuccess: () => {
      toast({
        title: 'Withdraw Successful',
        description: `You have successfully withdrawn from job: ${job.name}.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    },
    onError: (error) => {
      toast({
        title: 'Withdraw Failed',
        description: `Could not withdraw from job: ${job.name}. Please try again.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
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
        >
          Withdraw
        </Button>
      </Box>

      <DetailModal isOpen={isOpen} onClose={onClose} job={job} onApply={handleApply} />
    </Box>
  );
};
