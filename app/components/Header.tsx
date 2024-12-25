'use client';

import { Flex, Heading, Button, Box, Menu, MenuButton, MenuList, MenuItem, IconButton, Avatar, Text } from '@chakra-ui/react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '../../store/useAuthStore';

const Header = ({ short }: { short?: boolean }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const { user } = useUserStore();

  // Token kontrolü
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    router.push('/login');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('appliedJobs');
    setIsLoggedIn(false);
  };

  return (
    <Flex
      as="header"
      bg="gray.100"
      color="black"
      p={short ? 2 : 4}
      align="center"
      justify="space-between"
      position="sticky"
      top={0}
      zIndex={10}
      boxShadow="sm"
    >
      {/* Logo */}
      <Heading
        className="cursor-pointer"
        size={short ? 'md' : 'lg'}
        onClick={() => router.push('/')}
      >
        Job Finder
      </Heading>

      {/* Menü */}
      {!short && (
        <Box display={{ base: 'none', md: 'flex' }} alignItems="center">
          {isLoggedIn ? (
            <Flex alignItems="center" gap={6}>
               <div className='flex items-center gap-6 font-bold'>
                <Text className='cursor-pointer underline text-[#3B82F6]' onClick={() => router.push('/job-listings')}>
                  Job Listings
                </Text>
                <Text className='cursor-pointer underline' onClick={handleLogout}>
                  Logout
                </Text>
              </div>
              <Flex alignItems="center" gap={3}>
                <p className="font-bold">{user.email}</p>
                <Avatar
                  name={user.email}
                  src={user.profileImage || '/default-profile.png'}
                  size="md"
                />
              </Flex>
            </Flex>
          ) : (
            <Flex gap={4}>
              <Button
                colorScheme="blue"
                variant="outline"
                onClick={() => router.push('/login')}
              >
                Login
              </Button>
              <Button
                colorScheme="blue"
                variant="solid"
                onClick={() => router.push('/register')}
              >
                Register
              </Button>
            </Flex>
          )}
        </Box>
      )}

      {/* Mobil Menü */}
      {!short && (
        <Box display={{ base: 'flex', md: 'none' }}>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<RxHamburgerMenu />}
              variant="outline"
              aria-label="Options"
            />
            <MenuList>
              {isLoggedIn ? (
                <>
                  <MenuItem onClick={() => router.push('/job-listings')}>Job Listings</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  <MenuItem>
                    <Flex alignItems="center" gap={3}>
                      <Avatar
                        name={user.email}
                        src={user.profileImage || '/default-profile.png'}
                        size="sm"
                      />
                      <p>{user.email}</p>
                    </Flex>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={() => router.push('/login')}>Login</MenuItem>
                  <MenuItem onClick={() => router.push('/register')}>Register</MenuItem>
                </>
              )}
            </MenuList>
          </Menu>
        </Box>
      )}
    </Flex>
  );
};

export default Header;
