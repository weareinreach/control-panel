import React from 'react';
import {Box, CircularProgress, Flex} from '@chakra-ui/core';

const Loading = () => {
  return (
    <Flex align="center" justify="center" padding={4}>
      <Box color="white" isOpen>
        <CircularProgress isIndeterminate color="gray"></CircularProgress>
      </Box>
    </Flex>
  );
};

export default Loading;
