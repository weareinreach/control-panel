import { delete as httpDelete, patch, post } from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { Box, Button, Grid, Text } from '@chakra-ui/react';

import { ContextFormModal } from './ContextFormModal';
import FiltersUsers from './FiltersUsers';
import Loading from './Loading';
import Pagination from './Pagination';
import Table from './Table';
import { Container, SectionTitle, Title } from './styles';
import { adminFields, adminFieldsView } from '../data/fields.json';
import {
  CATALOG_API_URL,
  USER_TYPE_ADMIN_DM,
  USER_TYPE_DM,
  USER_TYPE_LAWYER,
  USER_TYPE_PROVIDER,
  USER_TYPE_SEEKER,
  getUserQueryUrls
} from '../utils';
import { useAPIGet } from '../utils/hooks';

const initialQuery = { page: 1, name: '', properties: '' };
const initialUrls = getUserQueryUrls(initialQuery);

const AdminPanelUsers = (props) => {
  const users = useAPIGet(initialUrls.users);
  const count = useAPIGet(initialUrls.count);
  const { closeModal, openModal } = useContext(ContextFormModal);
  const [query, setQuery] = useState(initialQuery);
  const loading = count?.loading || users?.loading;
  const getLastPage = () => {
    setQuery({ ...query, page: query.page - 1 });
  };
  const getNextPage = () => {
    setQuery({ ...query, page: query.page + 1 });
  };
  const newQuery = (params) => {
    setQuery({ page: 1, ...params });
  };
  const openCreateModal = () =>
    openModal({
      form: { fields: adminFields },
      header: 'New Data Manager',
      onClose: closeModal,
      onConfirm: ({ setLoading, setSuccess, setError, values }) => {
        const url = `${CATALOG_API_URL}/users`;
        const user = { ...values, isDataManager: true, password: 'ac123' };

        setLoading();
        post(url, user)
          .then(() => {
            window.location.reload();
            setSuccess();
          })
          .catch((err) => {
            console.error('An error occured while creating users');
            console.error(err);
            setError();
          });
      },
    });
  const openViewModal = (selectedManager) =>
    openModal({
      form: {
        fields: adminFieldsView,
        initialValues: {
          name: selectedManager?.name,
          email: selectedManager?.email,
          location: selectedManager?.currentLocation,
          age: selectedManager?.age,
          country: selectedManager?.countryOfOrigin,
          ethnicity: selectedManager?.ethnicityRace,
          'LGBTQ+ identity': selectedManager?.sogIdentity,
          'immigration status': selectedManager?.immigrationStatus,
          isAdminDataManager: selectedManager?.isAdminDataManager,
          isDataManager: selectedManager?.isDataManager,
        },
      },
      header: 'View Data Manager',
      onClose: closeModal,
      includeFooter: false
    });
  const openEditModal = (selectedManager) =>
    openModal({
      form: {
        fields: adminFields,
        initialValues: {
          name: selectedManager?.name,
          email: selectedManager?.email,
          isAdminDataManager: selectedManager?.isAdminDataManager,
        },
      },
      header: 'Edit Data Manager',
      onClose: closeModal,
      onConfirm: ({ setLoading, setSuccess, setError, values }) => {
        const url = `${CATALOG_API_URL}/users/${selectedManager._id}`;

        setLoading();
        patch(url, values)
          .then(() => {
            window.location.reload();
            setSuccess();
          })
          .catch((err) => {
            console.error('An error occured while editing users');
            console.error(err);
            setError();
          });
      },
    });
  const openDeleteModal = (selectedUser) =>
    openModal({
      header: `Delete User: ${selectedUser?.name || selectedUser?.email}`,
      isAlert: true,
      onClose: closeModal,
      onConfirm: ({ setLoading, setSuccess, setError }) => {
        const url = `${CATALOG_API_URL}/users/${selectedUser._id}`;

        setLoading();
        httpDelete(url)
          .then(() => {
            window.location.reload();
            setSuccess();
          })
          .catch((err) => {
            console.error('An error occured while deleting the user');
            console.error(err);
            setError();
          });
      },
    });
  const openRemoveModal = (selectedManager) =>
    openModal({
      header: 'Remove Data Manager',
      isAlert: true,
      onClose: closeModal,
      onConfirm: ({ setLoading, setSuccess, setError }) => {
        const url = `${CATALOG_API_URL}/users/${selectedManager._id}`;

        setLoading();
        patch(url, { isDataManager: false, isAdminDataManager: false })
          .then(() => {
            window.location.reload();
            setSuccess();
          })
          .catch((err) => {
            console.error('An error occured while updating the users');
            console.error(err);
            setError();
          });
      },
    });
  const queryType = query?.type;
  const tableActions = [
    ...(queryType === USER_TYPE_ADMIN_DM || queryType === USER_TYPE_DM
      ? [
        { label: 'View', onClick: openViewModal },
        { label: 'Edit', onClick: openEditModal },
        { label: 'Revoke', onClick: openRemoveModal },
      ]
      : []),
    ...(queryType === USER_TYPE_LAWYER ? [] : []),
    ...(queryType === USER_TYPE_PROVIDER ? [] : []),
    ...(queryType === USER_TYPE_SEEKER ? [] : []),
    { label: 'Delete', onClick: openDeleteModal },
  ];
  const tableHeaders = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'age', label: 'Age' },
    { key: 'countryOfOrigin', label: 'Country' },
    { key: 'immigrationStatus', label: 'Immigration' },
    ...(queryType === USER_TYPE_ADMIN_DM || queryType === USER_TYPE_DM
      ? [
        {
          key: 'isAdminDataManager',
          label: 'Is Admin',
          type: 'boolean',
        },
      ]
      : []),
    ...(queryType === USER_TYPE_LAWYER ? [] : []),
    ...(queryType === USER_TYPE_PROVIDER ? [] : []),
    ...(queryType === USER_TYPE_SEEKER ? [] : []),
  ];

  console.log('render query', query);

  useEffect(() => {
    const urls = getUserQueryUrls(query);

    console.log('useEffect query', query);

    console.log('useEffect urls', urls);

    users.fetchUrl(urls.users);
    count.fetchUrl(urls.count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  if (!users?.data && loading) {
    return <Loading />;
  }

  return (
    <>
      <Box float="right">
        <Button data-test-id="admin-users-new-manager"onClick={openCreateModal}>New Manager</Button>
      </Box>
      <Title data-test-id="admin-users-title">Data Managers</Title>
      <Grid minwidth={'500px'} templateColumns="1fr 350px" gap={4}>
        <Box>
          {loading ? (
            <Loading />
          ) : (
              <>
                <Container>
                  <Box>
                    {users?.data?.users?.length > 0 ? (
                      <Table 
                        actions={tableActions}
                        headers={tableHeaders}
                        rows={users?.data?.users}
                      />
                    ) : (
                        <Box textAlign="center" padding={4}>
                          <SectionTitle data-test-id="admin-search-not-found-title">No results found.</SectionTitle>
                          <Text data-test-id="admin-search-not-found-body">Please refine your search</Text>
                        </Box>
                      )}
                  </Box>
                </Container>
                <Pagination
                  currentPage={query?.page}
                  getLastPage={getLastPage}
                  getNextPage={getNextPage}
                  totalPages={count?.data?.pages}
                />
              </>
            )}
        </Box>
        <Container height="fit-content">
          <FiltersUsers query={query} updateQuery={newQuery} />
        </Container>
      </Grid>
    </>
  );
};

export default AdminPanelUsers;
