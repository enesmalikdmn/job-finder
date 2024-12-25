'use client';

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "../services/jobService";
import { JobCard } from "../components/JobCard";
import {
  Spinner,
  Box,
  Text,
  Button,
  Flex,
  Select,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useRouter } from 'next/navigation';
import { Job } from "../../types/jobTypes";


const JobListings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [field, setField] = useState("companyName");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [jobsPerPage, setJobsPerPage] = useState(20);
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/login"); // Redirect to login page if no accessToken
    }
  }, [router]);

  const fetchJobs = async (): Promise<{ data: Job[]; meta: { total: number, page: number, perPage: number } }> => {
    setIsLoading(true);
    try {
      const data = await getJobs({
        page: currentPage,
        perPage: jobsPerPage,
        // orderBy sıralama yapmadığı için eklemedim.
        orderBy: {},
        search: search ? { field: field, query: search } : {},
      });
      return data;
    } catch (error) {
      console.error("Error fetching jobs:", error);
      return { data: [], meta: { total: 0, page: 0, perPage: 0 } }; // Return empty data on error
    } finally {
      setIsLoading(false);
    }
  };

  const { data } = useQuery({
    queryKey: ["jobs", currentPage, search, jobsPerPage],
    queryFn: fetchJobs,
    staleTime: 5000,
  });

  const jobs = data?.data || [];
  console.log(jobs);
  
  const totalJobs = data?.meta?.total || 0;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  return (
    <Box className="flex flex-col h-full lg:flex-row w-full">
      <Box className="flex-1 p-4">
        <Box className="mb-4 flex items-center gap-4">
          <Text fontSize="lg" w="10rem">
            Basic Filter
          </Text>
          <Select
            placeholder="Select a Field"
            width="20rem"
            value={field}
            onChange={(e) => setField(e.target.value)}
          >
            <option value="companyName">Company Name</option>
            <option value="name">Job Name</option>
            <option value="location">Location</option>
          </Select>
          <Input
            placeholder="Search"
            className="w-full lg:w-1/2"
            borderColor="gray.300"
            _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
            onKeyDown={(e) => e.key === "Enter" && setSearch(e.target.value)}
          />
        </Box>

        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            overflowY="auto"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            p="4"
          >
            <Spinner size="lg" />
          </Box>
        ) : (
          <Box
            className="space-y-4"
            overflowY="auto"
            maxHeight="calc(100vh - 300px)"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            p="4"
          >
            {jobs.length === 0 ? (
              <Text>No jobs found. Try adjusting your search or filters.</Text>
            ) : (
              jobs.map((job: Job) => <JobCard key={job.id} job={job} />)
            )}
          </Box>
        )}
        <div className="flex items-center mt-4 w-full">
          <Flex
            className="flex w-full"
            justifyContent="center"
            alignItems="center"
            gap={4}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              isDisabled={currentPage === 1}
              colorScheme="blue"
              variant="outline"
              _hover={{ bg: "blue.100" }}
            >
              Previous Page
            </Button>

            <Flex alignItems="center" gap={2}>
              <InputGroup size="sm">
                <Input
                  type="number"
                  value={currentPage}
                  onChange={(event) => {
                    const value = parseInt(event.target.value, 10);
                    if (!isNaN(value)) setCurrentPage(value);
                  }}
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
              onClick={() => setCurrentPage((prev) => prev + 1)}
              isDisabled={currentPage === totalPages}
              colorScheme="blue"
              variant="solid"
              _hover={{ bg: "blue.600" }}
            >
              Next Page
            </Button>
          </Flex>
          <Select
            value={jobsPerPage}
            onChange={(e) => setJobsPerPage(Number(e.target.value))}
            width="6rem"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </Select>
        </div>
      </Box>
    </Box>
  );
};

export default JobListings;
