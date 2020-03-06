import React from 'react';
import {Link} from 'react-router-dom';
import {Box, Button} from '@chakra-ui/core';

import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import {Container, Title} from '../components/styles';
import {useAPIGet} from '../utils/hooks';

const Admin = props => {
  // TODO: use endpoint
  // const {data, loading} = useAPIGet(`/users`);
  const {data, loading} = {};

  return (
    <Box padding={4}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Box float="right">
            <Link to="/users/create">
              <Button>New Manager</Button>
            </Link>
          </Box>
          <Title>Data Managers</Title>
          <Container>
            {data?.opportunities?.map((service, key) => {
              const servicePath = `/services/${service.id}`;

              return (
                <div key={key}>
                  <Link to={servicePath}>
                    <p>{service.name}</p>
                  </Link>
                  <Link to={`${servicePath}/edit`}>
                    <p>edit</p>
                  </Link>
                  <Link to={`${servicePath}/delete`}>
                    <p>delete</p>
                  </Link>
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

export default Admin;
