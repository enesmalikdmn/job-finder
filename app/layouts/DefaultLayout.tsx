'use client';

import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <Box as="main" flex="1" p={4}>
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default DefaultLayout;
