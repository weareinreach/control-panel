import React from 'react';
import {Link} from 'react-router-dom';
import {Box, Button} from '@chakra-ui/core';

import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import {Container, Flex, Title} from '../components/styles';
import {useFetch} from '../utils/hooks';

const OrganizationList = props => {
  const {data, loading} = useFetch(`/organizations`);

  return (
    <Flex>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Box float="right">
            <Button link>New Organization</Button>
          </Box>
          <Title>Organizations</Title>
          <Container>
            {data?.organization?.map((org, key) => {
              const orgPath = `/organizations/${org.id}`;
              return (
                <div key={key}>
                  <Link to={orgPath}>
                    <p>{org.name}</p>
                  </Link>
                  <Link to={`${orgPath}/edit`}>
                    <p>edit</p>
                  </Link>
                  <Link to={`${orgPath}/delete`}>
                    <p>delete</p>
                  </Link>
                </div>
              );
            })}
          </Container>
          <Pagination />
        </>
      )}
    </Flex>
  );
};

export default OrganizationList;
