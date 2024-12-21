import './globals.css';
import { ReactNode } from 'react';
import ReactQueryProvider from './ReactQueryProvider';

export const metadata = {
  title: 'Job Finder',
  description: 'Find your dream job!',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
