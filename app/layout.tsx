'use client';

import './globals.css';
import { ReactNode } from 'react';
import { ChakraProvider, Box, Flex } from '@chakra-ui/react';
import ReactQueryProvider from './ReactQueryProvider';
import Header from './components/Header';
import Footer from './components/Footer';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isJobListings = pathname === '/job-listings';

  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <ReactQueryProvider>
            <Box minH="100vh" display="flex" flexDirection="column">
              {isJobListings ? (
                // Job Listings özel layout
                <Flex direction="column" flex="1">
                  <Flex>
                    {/* Header 2/3 genişlik */}
                    <Box w="66.67%">
                      <Header/>
                    </Box>

                    {/* Sidebar 1/3 genişlik */}
                    <Box w="33.33%" bg="gray.100" p={4}>
                      <p>Sidebar content goes here</p>
                    </Box>
                  </Flex>
                  {/* Sayfa içeriği */}
                  <Box p={4}>{children}</Box>
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
