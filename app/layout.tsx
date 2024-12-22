'use client';

import './globals.css';
import { ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import ReactQueryProvider from './ReactQueryProvider';


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
