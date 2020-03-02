import React from 'react';
import {Box, Flex, Heading, Text} from '@chakra-ui/core';

const NotFound = () => {
  return (
    <Flex align="center" justify="center" padding={4}>
      <Box flex="1" padding={5} rounded="md" borderWidth="1px" maxWidth="400px">
        <Heading fontSize="xl">Not Found</Heading>
        <Text>This page could not be found. Please return home.</Text>
      </Box>
    </Flex>
  );
};

export default NotFound;
