import React from 'react';
import {Box} from '@chakra-ui/core';

import Loading from '../components/Loading';
import Table from '../components/Table';
import {Container, Title} from '../components/styles';
import {useAPIGet} from '../utils/hooks';

const headers = [
  {key: 'name', label: 'Name'},
  {key: 'organizationName', label: 'Organization'},
  {key: 'updated_at', label: 'Last Updated'}
];

const Services = props => {
  const {data, loading} = useAPIGet(`/services`);

  return (
    <Box padding={4}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Title>Services</Title>
          <Container>
            <Table
              headers={headers}
              rowLink={service => `/services/${service?.id}`}
              rows={data?.services}
            />
          </Container>
        </>
      )}
    </Box>
  );
};

export default Services;
