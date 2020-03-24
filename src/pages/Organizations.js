import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Box, Button, Grid, Text} from '@chakra-ui/core';

import Filters from '../components/Filters';
import Helmet from '../components/Helmet';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import Table from '../components/Table';
import {Container, SectionTitle, Title} from '../components/styles';
import {useMultipleAPIGet} from '../utils/hooks';

const headers = [
  {key: 'name', label: 'Name'},
  {key: 'updated_at', label: 'Last Updated'}
];

const getQueryUrls = query => {
  const {name, page, properties} = query;
  let queryParam = '?';

  if (name) {
    queryParam += `&name=${name}`;
  }

  if (page) {
    queryParam += `&page=${page}`;
  }

  if (properties) {
    queryParam += `&properties=${properties}`;
  }

  return {
    organizations: `/organizations${queryParam}`,
    count: `/organizations/count${queryParam}`
  };
};

const initialQuery = {page: 0, name: '', properties: ''};

const Organizations = () => {
  const {data, loading, fetchUrls} = useMultipleAPIGet(
    getQueryUrls(initialQuery)
  );
  const {count, organizations} = data || {};
  const [query, setQuery] = useState(initialQuery);
  const getLastPage = () => {
    setQuery({...query, page: (query.page || 1) - 1});
  };
  const getNextPage = () => {
    setQuery({...query, page: (query.page || 1) + 1});
  };

  useEffect(() => {
    fetchUrls(getQueryUrls(query));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

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
      <Grid minwidth={'500px'} templateColumns="1fr 350px" gap={4}>
        <Box>
          {loading ? (
            <Loading />
          ) : (
            <>
              <Container>
                <Box>
                  {organizations?.organizations?.length > 0 ? (
                    <Table
                      getRowLink={org => `/organizations/${org._id}`}
                      headers={headers}
                      rows={organizations?.organizations}
                    />
                  ) : (
                    <Box textAlign="center" padding={4}>
                      <SectionTitle>No results found.</SectionTitle>
                      <Text>Please refine your search</Text>
                    </Box>
                  )}
                </Box>
              </Container>
              <Pagination
                getLastPage={query.page > 1 ? getLastPage : null}
                getNextPage={count?.pages > query.page ? getNextPage : null}
              />
            </>
          )}
        </Box>
        <Container height="fit-content">
          <Filters query={query} updateQuery={setQuery} />
        </Container>
      </Grid>
    </>
  );
};

export default Organizations;
