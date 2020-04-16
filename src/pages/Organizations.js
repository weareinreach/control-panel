import {post} from 'axios';
import _reduce from 'lodash/reduce';
import React, {useContext, useEffect, useState} from 'react';
import {Box, Button, Grid, Text} from '@chakra-ui/core';

import {ContextFormModal} from '../components/ContextFormModal';
import Filters from '../components/Filters';
import Helmet from '../components/Helmet';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import Table from '../components/Table';
import {Container, SectionTitle, Title} from '../components/styles';
import {CATALOG_API_URL} from '../utils';
import {formatOrgInput} from '../utils/forms';
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
  const {closeModal, openModal} = useContext(ContextFormModal);
  const [query, setQuery] = useState(initialQuery);
  const {count, organizations} = data || {};
  const goToOrgPage = (org) => {
    window.location = `/organizations/${org._id}`;
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
  const openNewOrg = () =>
    openModal({
      form: {fields: [{key: 'name', label: 'Organization Name'}]},
      header: 'New Organization Name',
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError, values}) => {
        const newOrg = formatOrgInput(values);
        const url = `${CATALOG_API_URL}/organizations`;

        console.log('POST:', url);

        setLoading();
        post(url, newOrg)
          .then(({data}) => {
            setSuccess();

            window.location = `/organizations/${data?.organization?._id}`;
          })
          .catch((err) => {
            setError();
            console.error(err);
          });
      },
    });

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
        <Button onClick={openNewOrg}>New Organization</Button>
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
                      actions={[{label: 'View', onClick: goToOrgPage}]}
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
