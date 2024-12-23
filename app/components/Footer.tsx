'use client';

import { Box, Divider, Text, Flex } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box 
      as="footer" 
      bg="gray.100" 
      color="black" 
      p={8} 
      textAlign="center" 
      className="h-[33vh] flex flex-col justify-between"
    >
      {/* İçerik bölümü */}
      <Flex className="h-full items-center justify-between">
        {/* Sol taraf */}
        <Box className="w-1/2 pr-4">
          <Flex>
            <Text className="text-lg font-bold mb-2">Job Finder</Text>
            <Box className="w-3/4 ml-4 text-left">
              <Text className="text-md font-semibold">Ready to get started?</Text>
              <Text className="mt-2 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Text>
            </Box>
          </Flex>
        </Box>

        {/* Dik çizgi */}
        <Divider orientation="vertical" borderColor="gray.400" h="75%" mx={4} />

        {/* Sağ taraf */}
        <Box className="w-1/2 h-2/3 pl-4 flex gap-2 items-end text-left">
          <Text className="text-sm">© 2010 — 2024</Text>
          <Text className="text-sm mt-2">Privacy — Terms</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
