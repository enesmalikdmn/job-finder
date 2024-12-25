'use client';

import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import JobFilters from './JobFilters';
import JobList from './JobList';
import PaginationControls from './PaginationControls';
import { getJobs } from '../services/jobService';
import { Job } from '../../types/jobTypes';

const JobListings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [field, setField] = useState("companyName");
  const [search, setSearch] = useState("");
  const [jobsPerPage, setJobsPerPage] = useState(20);
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/login");
    }
  }, [router]);

  const fetchJobs = async (): Promise<{ data: Job[]; meta: { total: number; page: number; perPage: number } }> => {
    try {
      const data = await getJobs({
        page: currentPage,
        perPage: jobsPerPage,
        search: search ? { field, query: search } : {},
      });
      return data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return { data: [], meta: { total: 0, page: 0, perPage: 0 } };
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ['jobs', currentPage, search, jobsPerPage],
    queryFn: fetchJobs,
    staleTime: 5000,
  });

  const jobs = data?.data || [];
  const totalJobs = data?.meta?.total || 0;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  return (
    <Box className="flex flex-col h-full lg:flex-row w-full">
      <Box className="flex-1 p-4">
        <JobFilters
          field={field}
          setField={setField}
          setSearch={setSearch}
        />
        {isLoading ? (
          <Spinner size="lg" />
        ) : (
          <JobList jobs={jobs} />
        )}
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          jobsPerPage={jobsPerPage}
          setJobsPerPage={setJobsPerPage}
        />
      </Box>
    </Box>
  );
};

export default JobListings;
