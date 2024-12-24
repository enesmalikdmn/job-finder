'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getJobs } from '../services/jobService';
import { JobCard } from '../components/JobCard';
import {
  Select,
  Input,
  Box,
  Text,
  Spinner,
  Button,
  Flex,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

const JobListings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  const jobsPerPage = 20;

  // Fetch jobs using react-query (object form)
  const { data, isLoading, isError } = useQuery({
    queryKey: ['jobs', currentPage, filter, search], // queryKey is an array of dependencies
    queryFn: () =>
      getJobs({
        page: currentPage,
        perPage: jobsPerPage,
        orderBy: filter ? { field: filter, direction: 'asc' } : {},
        search: search ? { field: 'title', query: search } : {},
      }),
    staleTime: 5000,
  });

  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handlePageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) setCurrentPage(value);
  };

  if (isLoading) return <Spinner size="lg" />;

  if (isError)
    return (
      <Text color="red.500" textAlign="center">
        Error fetching jobs. Please try again.
      </Text>
    );

  const jobs = data?.data || [];
  const totalJobs = data?.meta?.total || 0;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  return (
    <Box className="flex flex-col h-full lg:flex-row w-full">
      {/* Main Job Listings */}
      <Box className="flex-1 p-4">
        <Box className="mb-4 flex items-center gap-4">
          <Text fontSize="lg" className="font-bold">
            Basic Filter
          </Text>
          <Select
            placeholder="Select Filter"
            width="350px"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="title">Title</option>
            <option value="location">Location</option>
          </Select>
          <Input
            placeholder="Search"
            className="w-full lg:w-1/2"
            borderColor="gray.300"
            _focus={{ borderColor: 'blue.500', boxShadow: 'outline' }}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>

        {/* Job List */}
        <Box
          className="space-y-4"
          overflowY="auto"
          maxHeight="calc(100vh - 300px)"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          p="4"
        >
          {jobs.length > 0 ? (
            jobs.map((job: any) => <JobCard key={job.id} job={job} />)
          ) : (
            <Text>No jobs found.</Text>
          )}
        </Box>

        {/* Pagination */}
        <Flex
          justifyContent="center"
          alignItems="center"
          gap={4}
          mt={6}
          direction={{ base: 'column', sm: 'row' }}
        >
          <Button
            onClick={handlePrevPage}
            isDisabled={currentPage === 1}
            colorScheme="blue"
          >
            Previous Page
          </Button>

          <Flex alignItems="center" gap={2}>
            <InputGroup size="sm">
              <Input
                type="number"
                value={currentPage}
                onChange={handlePageChange}
                max={totalPages}
                min={1}
                width="75px"
              />
              <InputRightElement pointerEvents="none">
                / {totalPages}
              </InputRightElement>
            </InputGroup>
          </Flex>

          <Button
            onClick={handleNextPage}
            isDisabled={currentPage === totalPages}
            colorScheme="blue"
          >
            Next Page
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobListings;
