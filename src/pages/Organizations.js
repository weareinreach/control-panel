import React from 'react';
import {Link} from 'react-router-dom';
import {Box, Button} from '@chakra-ui/core';

import Loading from '../components/Loading';
import Table from '../components/Table';
import {Container, Title} from '../components/styles';
import {useAPIGet} from '../utils/hooks';

const headers = [
  {key: 'name', label: 'Name'},
  {key: 'opportunity_count', label: 'Services'},
  {key: 'updated_at', label: 'Last Updated'}
];

const Organizations = () => {
  const {data, loading} = useAPIGet(`/organizations`);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Box float="right">
        <Link to="/organizations/new">
          <Button>New Organization</Button>
        </Link>
      </Box>
      <Title>Organizations</Title>
      <Container>
        <Table
          getRowLink={org => `/organizations/${org._id}`}
          headers={headers}
          rows={data?.organizations}
        />
      </Container>
    </>
  );
};

export default Organizations;
