'use client';

import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/navigation'; // Next.js 13 API'si
import { useSearchParams, usePathname } from 'next/navigation'; // Next.js 13 API'si
import JobFilters from './JobFilters';
import JobList from './JobList';
import PaginationControls from './PaginationControls';
import { getJobs } from '../services/jobService';
import { Job } from '../../types/jobTypes';

interface JobResponse {
  data: Job[];
  meta: {
    total: number;
    page: number;
    perPage: number;
  };
}

const JobListings = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [field, setField] = useState<string>('companyName');
  const [search, setSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [jobsPerPage, setJobsPerPage] = useState<number>(20);
  const router = useRouter();
  const searchParams = useSearchParams();  // Query parametrelerini almak için kullanıyoruz
  const pathname = usePathname(); // Sayfa yolunu almak için kullanıyoruz

  // URL query parametrelerini okuma
  useEffect(() => {
    if (!searchParams) return; // searchParams null olma durumunu kontrol et

    const querySearch = searchParams.get('search');
    const queryField = searchParams.get('field');

    if (querySearch) {
      setSearch(querySearch);
    }
    if (queryField) {
      setField(queryField);
    }
  }, [searchParams]);

  // Token kontrolü
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/login');
    }
  }, [router]);

  // Jobs veri çekme fonksiyonu
  const fetchJobs = async (): Promise<JobResponse> => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  // Query parametreleriyle sorgu oluşturuluyor
  const queryKey = ['jobs', currentPage, search, jobsPerPage];

  const { data } = useQuery<JobResponse>({
    queryKey,
    queryFn: fetchJobs,
    staleTime: 5000,
    refetchOnWindowFocus: false,
  });

  const jobs = data?.data || [];
  const totalJobs = data?.meta?.total || 0;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  // URL'yi filtrelerle güncelleme
  const updateQueryParams = (newSearch: string, newField: string) => {
    // searchParams.entries() ile mevcut query parametrelerini alıyoruz
    const updatedParams = new URLSearchParams(searchParams as any); // searchParams'ı URLSearchParams'e çeviriyoruz
    updatedParams.set('search', newSearch);
    updatedParams.set('field', newField);

    // URL'yi güncelliyoruz
    router.push(`${pathname}?${updatedParams.toString()}`, undefined, { shallow: true });
  };

  return (
    <Box className="flex flex-col h-full lg:flex-row w-full">
      <Box className="flex-1 p-4">
        <JobFilters
          field={field}
          setField={setField}
          setSearch={(value) => {
            setSearch(value);
            setCurrentPage(1); // Arama yapıldığında sayfa numarasını 1 yap
            updateQueryParams(value, field); // URL'yi güncelle (sayfa 1'e sıfırlanır)
          }}
        />
        {isLoading ? (
          <Spinner size="lg" />
        ) : (
          <JobList jobs={jobs} />
        )}
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={(page) => {
            setCurrentPage(page);
            updateQueryParams(search, field); // Sayfa numarasını URL'ye ekle
          }}
          jobsPerPage={jobsPerPage}
          setJobsPerPage={setJobsPerPage}
        />
      </Box>
    </Box>
  );
};

export default JobListings;
