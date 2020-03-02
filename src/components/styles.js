import React from 'react';
import {
  Box as ChakraBox,
  Flex as ChakraFlex,
  Heading as ChakraHeading
} from '@chakra-ui/core';

export const Container = ({children}) => (
  <ChakraBox padding={5} rounded="md" borderWidth="1px">
    {children}
  </ChakraBox>
);

export const Flex = ({children}) => (
  <ChakraBox padding={4}>{children}</ChakraBox>
);

export const alt_Flex = ({children}) => (
  <ChakraFlex align="center" justify="center" padding={4}>
    {children}
  </ChakraFlex>
);

export const Heading = ({children}) => (
  <ChakraHeading fontSize="xl">{children}</ChakraHeading>
);

export const Title = ({children}) => (
  <ChakraHeading fontSize="2xl" marginBottom={4}>
    {children}
  </ChakraHeading>
);
