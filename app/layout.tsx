'use client';

import './globals.css';
import { ReactNode } from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import ReactQueryProvider from './ReactQueryProvider';
import JobListingsLayout from './layouts/JobListingsLayout';
import DefaultLayout from './layouts/DefaultLayout';
import theme from '../theme';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isJobListings = pathname === '/job-listings';

  return (
    <html lang="en">
      <body>
        <ChakraProvider theme={theme}>
          <ReactQueryProvider>
            <Box minH="100vh" display="flex" flexDirection="column">
              {isJobListings ? (
                <JobListingsLayout>{children}</JobListingsLayout>
              ) : (
                <DefaultLayout>{children}</DefaultLayout>
              )}
            </Box>
          </ReactQueryProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
