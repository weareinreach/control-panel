import React from 'react';
import {Box, Button} from '@chakra-ui/core';

import ButtonLink from '../components/ButtonLink';
import Loading from '../components/Loading';
import {Container, Flex, Title} from '../components/styles';
import {useFetch} from '../utils/hooks';

const Organization = props => {
  const orgId = props?.match?.params?.id;
  const orgPath = `/organization/${orgId}`;
  const {data, loading} = useFetch(orgPath);
  const {name} = data?.organization || {};

  return (
    <Flex>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Box float="right">
            <ButtonLink marginRight={2} to={`${orgPath}/duplicate`}>
              Duplicate
            </ButtonLink>
            <ButtonLink marginRight={2} to={`${orgPath}/edit`}>
              Edit
            </ButtonLink>
            <Button>Delete</Button>
          </Box>
          <Title>{name}</Title>
          <Container>{JSON.stringify(data)}</Container>
        </>
      )}
    </Flex>
  );
};

export default Organization;
