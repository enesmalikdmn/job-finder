import { Box, Text, Button, Tag, HStack } from '@chakra-ui/react';
export const JobCard = ({ job }: { job: any }) => {
  return (
    <Box className="flex flex-col lg:flex-row border rounded-lg p-4 shadow-md gap-4">
      <Box className="flex flex-col lg:flex-shrink-0">
        <span>icon</span>
      </Box>
      <Box className="flex flex-col lg:flex-1">
        <Box className="flex items-center gap-2">
          <Text fontWeight="bold" fontSize="lg">
            {job.companyName} - {job.jobName}
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
        <Button colorScheme="blue" size="sm" w="full">
          Detail
        </Button>
        <Button colorScheme="red" size="sm" variant="outline" w="full">
          Withdraw
        </Button>
      </Box>
    </Box>
  );
};
