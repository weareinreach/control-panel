import { post } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Grid, Text } from '@chakra-ui/react';

import { ContextFormModal } from '../components/ContextFormModal';
import Filters from '../components/FiltersOrganizations';
import Helmet from '../components/Helmet';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import Table from '../components/Table';
import { Container, SectionTitle, Title } from '../components/styles';
import { CATALOG_API_URL, getOrgQueryUrls } from '../utils';
import { formatOrgInput } from '../utils/forms';
import { useAPIGet } from '../utils/hooks';

const headers = [
  { key: 'name', label: 'Name' },
  { key: 'updated_at', label: 'Last Updated' },
];

const initialQuery = { page: 1, name: '', properties: '' };
const initialUrls = getOrgQueryUrls(initialQuery);

const Organizations = () => {
  const totalCount = useAPIGet(initialUrls.count);
  const organizations = useAPIGet(initialUrls.organizations);
  const count = useAPIGet(initialUrls.count);
  const { closeModal, openModal } = useContext(ContextFormModal);
  const [query, setQuery] = useState(initialQuery);
  const loading =
    count?.loading || organizations?.loading || totalCount?.loading;
  const goToOrgPage = (org) => {
    window.location = `/organizations/${org._id}`;
  };
  const getLastPage = () => {
    setQuery({ ...query, page: query.page - 1 });
  };
  const getNextPage = () => {
    setQuery({ ...query, page: query.page + 1 });
  };
  const newQuery = (params) => {
    setQuery({ page: 1, ...params });
  };
  const openNewOrg = () =>
    openModal({
      form: { fields: [{ key: 'name', label: 'Organization Name' }] },
      header: 'New Organization Name',
      onClose: closeModal,
      onConfirm: ({ setLoading, setSuccess, setError, values }) => {
        const newOrg = formatOrgInput(values);
        const url = `${CATALOG_API_URL}/organizations`;

        console.log('POST:', url);

        setLoading();
        post(url, newOrg)
          .then(({ data }) => {
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
    const urls = getOrgQueryUrls(query);

    organizations.fetchUrl(urls.organizations);
    count.fetchUrl(urls.count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  if (!organizations?.data && loading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet title="Organizations" />
      <Box float="right">
        <Button data-test-id="organization-new-button" onClick={openNewOrg}>New Organization</Button>
      </Box>
      <Title data-test-id="organization-title">Organizations</Title>
      <Grid minwidth={'500px'} templateColumns="1fr 350px" gap={4}>
        <Box>
          {loading ? (
            <Loading />
          ) : (
              <>
                <Container>
                  <Box>
                    {organizations?.data?.organizations?.length > 0 ? (
                      <Table
                        actions={[{ label: 'View', onClick: goToOrgPage }]}
                        getRowLink={(org) => `/organizations/${org._id}`}
                        headers={headers}
                        rows={organizations.data.organizations}
                        tableDataTestId="dashboard-table"
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
                  renderAdditionalStats={() => (
                    <Text display="inline" marginLeft={2}>
                      {count?.data?.count} of {totalCount?.data?.count}{' '}
                    organizations.
                    </Text>
                  )}
                  totalPages={count?.data?.pages}
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
