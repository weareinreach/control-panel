import React from 'react';
import {Link} from 'react-router-dom';
import {Box, Button} from '@chakra-ui/core';

import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import {Container, Flex, Title} from '../components/styles';
import {useFetch} from '../utils/hooks';

const ServiceList = props => {
  const {data, loading} = useFetch(`/services`);

  return (
    <Flex>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Box float="right">
            <Button>New Service</Button>
          </Box>
          <Title>Services</Title>
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
    </Flex>
  );
};

export default ServiceList;
