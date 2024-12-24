'use client';

import { Flex, Heading, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Next.js'in `useRouter` hook'u
import { useUserStore } from '../../store/useAuthStore';

const Header = ({ short }: { short?: boolean }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter(); // Router nesnesini alın
  const { user } = useUserStore();

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
      <Heading className='cursor-pointer' size={short ? 'md' : 'lg'} onClick={() => router.push('/')}>Job Finder</Heading>
      {!short && (
        <Flex>
          {isLoggedIn ? (
            <div className='flex gap-12'>
              <div className='flex items-center'>
                <Button colorScheme="blue" variant="outlined" onClick={() => router.push('/job-listings')}>
                  Job Listings
                </Button>
                <Button colorScheme="red" variant="outlined" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
              <div className='flex items-center gap-3'>
                <p className="font-bold text-gray-500">{user.email}</p>
                <div className="w-12 h-12 rounded-full bg-gray-400">
                  <img
                    src={user.profileImage || '/default-profile.png'} 
                    alt="Profile"
                    className="w-full h-full rounded-full"
                    width={36} 
                    height={36} 
                  />
                </div>
              </div>
            </div>
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
