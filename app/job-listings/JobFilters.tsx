import { Box, Select, Input, Text } from '@chakra-ui/react';

interface JobFiltersProps {
  field: string;
  setField: (value: string) => void;
  setSearch: (value: string) => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({ field, setField, setSearch }) => {
  return (
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
        onKeyDown={(e) => e.key === 'Enter' && setSearch(e.currentTarget.value)}
      />
    </Box>
  );
};

export default JobFilters;
