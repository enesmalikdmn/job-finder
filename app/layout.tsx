'use client';

import './globals.css';
import { ReactNode } from 'react';
import { ChakraProvider, Box, Flex } from '@chakra-ui/react';
import ReactQueryProvider from './ReactQueryProvider';
import Header from './components/Header';
import Footer from './components/Footer';
import { usePathname } from 'next/navigation';
import { Sidebar } from './components/Sidebar';
import theme from '../theme';

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
                // Job Listings özel layout
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
              ) : (
                // Diğer sayfalar için varsayılan layout
                <>
                  <Header />
                  <Box as="main" flex="1">
                    {children}
                  </Box>
                  <Footer />
                </>
              )}
            </Box>
          </ReactQueryProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
