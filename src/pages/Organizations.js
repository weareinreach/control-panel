import _reduce from 'lodash/reduce';
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
  {key: 'updated_at', label: 'Last Updated'},
];

// TODO: test this util
const getQueryUrls = (query) => {
  const {name, page, properties} = query;
  let queryParam = '?';

  if (name) {
    queryParam += `&name=${name}`;
  }

  if (page) {
    queryParam += `&page=${page}`;
  }

  if (properties && Object.keys(properties).length > 0) {
    const propString = _reduce(
      properties,
      (result, value, key) => {
        if (key && value) {
          result += `${key}=${value},`;
        }

        return result;
      },
      ''
    );

    if (propString) {
      queryParam += `&properties=${propString}`;
    }
  }

  return {
    organizations: `/organizations${queryParam}`,
    count: `/organizations/count${queryParam}`,
  };
};

const initialQuery = {page: 1, name: '', properties: ''};

const Organizations = () => {
  const {data, loading, fetchUrls} = useMultipleAPIGet(
    getQueryUrls(initialQuery)
  );
  const {count, organizations} = data || {};
  const [query, setQuery] = useState(initialQuery);
  const goToOrgPage = (org) => {
    window.location = `/organizations/${org._id}`;
  };
  const goToOrgEditPage = (org) => {
    window.location = `/organizations/${org._id}/edit`;
  };
  const getLastPage = () => {
    setQuery({...query, page: query.page - 1});
  };
  const getNextPage = () => {
    setQuery({...query, page: query.page + 1});
  };
  const newQuery = (params) => {
    setQuery({page: 1, ...params});
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
                      actions={[
                        {label: 'View', onClick: goToOrgPage},
                        {label: 'Edit', onClick: goToOrgEditPage},
                      ]}
                      getRowLink={(org) => `/organizations/${org._id}`}
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
                currentPage={query?.page}
                getLastPage={getLastPage}
                getNextPage={getNextPage}
                totalPages={count?.pages}
              />
            </>
          )}
        </Box>
        <Container height="fit-content">
          <Filters query={query} updateQuery={newQuery} />
        </Container>
      </Grid>
    </>
  );
};

export default Organizations;
