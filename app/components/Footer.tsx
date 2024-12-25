'use client';

import { Box, Divider, Text, Flex } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box 
      as="footer" 
      bg="gray.100" 
      color="black" 
      p={8} 
      h="33vh" 
      textAlign="center" 
      className="flex flex-col justify-between"
    >
      {/* İçerik bölümü */}
      <Flex
        direction={{ base: 'column', lg: 'row' }} // Mobilde dikey, büyük ekranda yatay
        className="h-full items-center justify-between"
      >
        {/* Sol taraf */}
        <Box
          className="w-full lg:w-1/2 pr-4" 
          mb={{ base: 6, lg: 0 }} // Mobilde alt boşluk ekleyip büyük ekranlarda kaldırıyoruz
        >
          <Flex>
            <Text className="text-lg font-bold mb-2" w="25%">Job Finder</Text>
            <Box w="75%" ml={4} textAlign="left">
              <Text fontSize="md" fontWeight="semibold">
                Ready to get started?
              </Text>
              <Text mt={2} fontSize="sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Text>
            </Box>
          </Flex>
        </Box>

        <Divider
          orientation='vertical'
          borderColor="gray.400"
          h={{ base: 'auto', lg: '75%' }}
          mx={4}
          mb={{ base: 4, lg: 0 }} // Mobilde alt boşluk ekliyoruz
        />

        <Box
          className="w-full lg:w-1/2 h-2/3 pl-4 flex gap-2 items-end text-left"
          textAlign={{ base: 'center', lg: 'left' }} // Mobilde merkez, büyük ekranda sola hizala
        >
          <Text className="text-sm">© 2010 — 2024</Text>
          <Text className="text-sm mt-2">Privacy — Terms</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
