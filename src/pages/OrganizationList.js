import React from 'react';
import {Link} from 'react-router-dom';
import {Box, Button, Heading, Text} from '@chakra-ui/core';

import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import {Container, Title} from '../components/styles';
import {useFetch, useToggle} from '../utils/hooks';

const OrganizationList = props => {
  const {data, loading} = useFetch(`/organizations`);

  return (
    <Box padding={4}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Box float="right">
            <Link to="/organizations/create">
              <Button link>New Organization</Button>
            </Link>
          </Box>
          <Title>Organizations</Title>
          <Container>
            {data?.organization?.map((org, key) => {
              const orgPath = `/organizations/${org.id}`;

              console.log('orgPath', orgPath, `${orgPath}/edit`);

              return (
                <div key={key}>
                  <Link to={orgPath}>
                    <Heading fontSize="l">{org.name}</Heading>
                  </Link>
                  <Text>Last Updated {org.updated_at}</Text>
                </div>
              );
            })}
          </Container>
          <Pagination />
        </>
      )}
    </Box>
  );
};

export default OrganizationList;
