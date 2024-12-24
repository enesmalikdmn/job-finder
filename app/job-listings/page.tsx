'use client';

import { useState } from "react";
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

const JobListings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [field, setField] = useState("companyName");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [jobsPerPage, setJobsPerPage] = useState(20);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const data = await getJobs({
        page: currentPage,
        perPage: jobsPerPage,
        orderBy: {},
        search: search ? { field: field, query: search } : {},
      });
      return data;
    } catch (error) {
      console.error("Error fetching jobs:", error);
      return { data: [], meta: { total: 0 } };
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
  const totalJobs = data?.meta?.total || 0;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  return (
    <Box
      display="flex"
      flexDirection={{ base: "column", lg: "row" }}
      height="100vh"
      width="100%"
    >
      <Box flex="1" p={{ base: 2, sm: 4 }}>
        <Flex
          direction={{ base: "column", sm: "row" }}
          gap={4}
          align={{ base: "flex-start", sm: "center" }}
          mb={4}
        >
          <Text fontSize="lg" minWidth="8rem">
            Basic Filter
          </Text>
          <Select
            placeholder="Select a Field"
            value={field}
            onChange={(e) => setField(e.target.value)}
            flex={{ base: "1", sm: "none" }}
            maxWidth="300px"
          >
            <option value="companyName">Company Name</option>
            <option value="name">Job Name</option>
            <option value="location">Location</option>
          </Select>
          <Input
            placeholder="Search"
            borderColor="gray.300"
            _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
            onKeyDown={(e) => e.key === "Enter" && setSearch(e.target.value)}
            flex="1"
          />
        </Flex>


        {isLoading ? (
          <Flex justify="center" align="center" height="300px">
            <Spinner size="lg" />
          </Flex>
        ) : (
          <Box
            overflowY="auto"
            maxHeight="calc(100vh - 300px)"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            p={4}
            className="space-y-4"
          >
            {jobs.length === 0 ? (
              <Text>No jobs found. Try adjusting your search or filters.</Text>
            ) : (
              jobs.map((job: any) => <JobCard key={job.id} job={job} />)
            )}
          </Box>
        )}

        {/* Sayfa Kontrolleri */}
        <Flex
          justifyContent="space-between"
          alignItems="center"
          mt={4}
          direction={{ base: "column", sm: "row" }}
          gap={4}
        >
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            isDisabled={currentPage === 1}
            colorScheme="blue"
            variant="outline"
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
          >
            Next Page
          </Button>

          <Select
            value={jobsPerPage}
            onChange={(e) => setJobsPerPage(Number(e.target.value))}
            maxWidth="100px"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </Select>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobListings;
