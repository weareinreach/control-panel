import React from 'react';

import Loading from '../components/Loading';
import Table from '../components/Table';
import {Container, Title} from '../components/styles';
import {useAPIGet} from '../utils/hooks';

const headers = [
  {key: 'name', label: 'Name'},
  {key: 'organizationName', label: 'Organization'},
  {key: 'updated_at', label: 'Last Updated'}
];

const Services = () => {
  const {data, loading} = useAPIGet(`/services`);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Title>Services</Title>
      <Container>
        <Table
          getRowLink={service => `/services/${service?.id}`}
          headers={headers}
          rows={data?.services}
        />
      </Container>
    </>
  );
};

export default Services;
