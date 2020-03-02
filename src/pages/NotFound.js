import React from 'react';
import {Box, Heading, Text} from '@chakra-ui/core';

const NotFound = () => {
  return (
    <Box flex="1" padding={5} rounded="md" borderWidth="1px" maxWidth="400px">
      <Heading fontSize="xl">Not Found</Heading>
      <Text>This page could not be found. Please return home.</Text>
    </Box>
  );
};

export default NotFound;
