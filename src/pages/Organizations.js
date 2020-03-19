import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Box, Button} from '@chakra-ui/core';

import Helmet from '../components/Helmet';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import Table from '../components/Table';
import {Container, Title} from '../components/styles';
import {getAPIUrl} from '../utils';
import {useAPIGet} from '../utils/hooks';

const headers = [
  {key: 'name', label: 'Name'},
  {key: 'updated_at', label: 'Last Updated'}
];

const Organizations = () => {
  const {data, loading, fetchMore} = useAPIGet(`/organizations`);
  const [page, setPage] = useState(1);
  const lastUrl = `${getAPIUrl()}/organizations?page=${page - 1}`;
  const nextUrl = `${getAPIUrl()}/organizations?page=${page + 1}`;
  const getLastPage = () => {
    fetchMore(lastUrl);
    setPage(page - 1);
  };
  const getNextPage = () => {
    fetchMore(nextUrl);
    setPage(page + 1);
  };

  if (!data && loading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet title="Organizations" />
      <Box float="right">
        <Link to="/organizations/new">
          <Button>New Organization</Button>
        </Link>
      </Box>
      <Title>Organizations</Title>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Container>
            <Table
              getRowLink={org => `/organizations/${org._id}`}
              headers={headers}
              rows={data?.organizations}
            />
          </Container>
          <Pagination getLastPage={getLastPage} getNextPage={getNextPage} />
        </>
      )}
    </>
  );
};

export default Organizations;
