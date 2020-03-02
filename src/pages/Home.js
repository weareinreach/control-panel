import React from 'react';
import {SimpleGrid} from '@chakra-ui/core';

import {Container, Flex, Heading} from '../components/styles';

const Home = () => {
  return (
    <Flex>
      <SimpleGrid columns={2} spacing={10} width="100%">
        <Container>
          <Heading>Recent Organizations</Heading>
        </Container>
        <Container>
          <Heading>Recent Services</Heading>
        </Container>
      </SimpleGrid>
    </Flex>
  );
};

export default Home;
