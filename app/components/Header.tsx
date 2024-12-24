'use client';

import { Box, Flex, Heading, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Next.js'in `useRouter` hook'u

const Header = ({ short }: { short?: boolean }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter(); // Router nesnesini alın

  // Token kontrolü
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    router.push('/login');
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };

  return (
    <Flex 
      as="header" 
      bg="gray.200"
      color="black" 
      p={short ? 2 : 4} 
      align="center" 
      justify="space-between"
    >
      <Heading size={short ? 'md' : 'lg'}>Job Finder</Heading>
      {!short && (
        <Flex>
          {isLoggedIn ? (
            <>
              <Button colorScheme="blue" variant="outlined" onClick={() => router.push('/job-listings')}>
                Job Listings
              </Button>
              <Button colorScheme="red" variant="outlined" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button colorScheme="blue" variant="outline" mr={4} onClick={() => router.push('/login')}>
                Login
              </Button>
              <Button colorScheme="blue" variant="solid" onClick={() => router.push('/register')}>
                Register
              </Button>
            </>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default Header;
