'use client';

import { ReactNode } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const JobListingsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Flex
      direction={{ base: 'column', lg: 'row' }} // Mobilde dikey, büyük ekranda yatay düzen
      flex="1"
    >
      {/* Main Content */}
      <Box
        w={{ base: '100%', lg: '66.67%' }}
        display="flex"
        flexDirection="column"
        flex="1"
      >
        <Header />
        <Box flex="1" p={4}>
          {children}
        </Box>
      </Box>

      {/* Sidebar */}
      <Box
        w={{ base: '100%', lg: '33.33%' }}
        h={{ base: 'auto', lg: '100vh' }}
        border={{ base: 'none', lg: '1px' }}
        borderColor="gray.200"
        p={4}
        position={{ base: 'static', lg: 'sticky' }} // Mobilde statik, büyük ekranda sabit
        top="0"
      >
        <Sidebar />
      </Box>
    </Flex>
  );
};

export default JobListingsLayout;
