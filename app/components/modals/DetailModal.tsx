import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  Box,
  Text,
  Button,
  HStack,
  Tag,
  Divider,
} from "@chakra-ui/react";
import { Job } from "../../../types/jobTypes";

export const DetailModal = ({
  isOpen,
  onClose,
  job,
  onApply,
}: {
  isOpen: boolean;
  onClose: () => void;
  job: Job;
  onApply: (jobId: string) => void;
}) => {
  const handleApply = () => {
    onApply(job.id); // Apply butonuna basıldığında JobCard'a emit ediyoruz.
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Apply Job</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="start" spacing={4}>
            <Box>
              <Text fontWeight="bold">Company Name:</Text>
              <Text>{job.companyName}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Job Name:</Text>
              <Text>{job.name}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Location:</Text>
              <Text>{job.location}</Text>
            </Box>
            <VStack align="start" spacing={2}>
              <Text fontWeight="bold">Keywords:</Text>
              <HStack spacing={2}>
                {job.keywords?.map((tag: string, index: number) => (
                  <Tag
                    key={index}
                    colorScheme="teal"
                    borderRadius="full"
                    _hover={{
                      bg: "teal.500",
                      color: "white",
                    }}
                  >
                    {tag}
                  </Tag>
                ))}
              </HStack>
            </VStack>
            <Box>
              <Text fontWeight="bold">Salary:</Text>
              <Text>{job.salary}$</Text>
            </Box>
            <Divider />
            <Box>
              <Text fontWeight="bold">Job Description:</Text>
              <Box
                border="1px solid"
                borderColor="gray.300"
                p="4"
                borderRadius="md"
                mt="2"
                backgroundColor="gray.50"
              >
                <Text>{job.description}</Text>
              </Box>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="green" onClick={handleApply}>
            Apply
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
