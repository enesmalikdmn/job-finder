'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getJobs } from '../services/jobService';
import { JobCard } from '../components/JobCard';
import { Select, Input, Box, Text } from '@chakra-ui/react';

const JobListings = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          router.push('/login');
          return;
        }

        const jobList = await getJobs();
        setJobs(jobList.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [router]);

  return (
    <Box className="flex flex-col lg:flex-row w-full">
      {/* Main Job Listings */}
      <Box className="flex-1 p-4">
        <Box className="mb-4 flex items-center gap-4">
          <Text fontSize="md" className='w-full lg:w-1/2'>
            Basic Filter
          </Text>
          <Select placeholder="Select Filter" width="350px">
            <option value="title">Title</option>
            <option value="location">Location</option>
          </Select>
          <Input
            placeholder="Search"
            className="w-full lg:w-1/2"
            borderColor="gray.300"
            _focus={{ borderColor: 'blue.500', boxShadow: 'outline' }}
          />
        </Box>
        {jobs.length > 0 ? (
          <Box className="space-y-4">
            {jobs.map((job: any) => (
              <JobCard key={job.id} job={job} />
            ))}
          </Box>
        ) : (
          <Text>Loading jobs...</Text>
        )}
      </Box>
    </Box>
  );
};

export default JobListings;
