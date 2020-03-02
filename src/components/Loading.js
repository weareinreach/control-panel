import React from 'react';
import {Box, CircularProgress} from '@chakra-ui/core';

const Loading = () => {
  return (
    <Box color="white" isOpen>
      <CircularProgress isIndeterminate color="gray"></CircularProgress>
    </Box>
  );
};

export default Loading;
