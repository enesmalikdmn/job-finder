import { Button, Flex, Select, InputGroup, Input, InputRightElement } from '@chakra-ui/react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (value: number) => void;
  jobsPerPage: number;
  setJobsPerPage: (value: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
  jobsPerPage,
  setJobsPerPage,
}) => {
  return (
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
  );
};

export default PaginationControls;
