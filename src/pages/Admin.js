import {patch, post} from 'axios';
import React, {useContext} from 'react';
import {
  Box,
  Button,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from '@chakra-ui/core';

import {ContextApp} from '../components/ContextApp';
import {ContextFormModal} from '../components/ContextFormModal';
import Helmet from '../components/Helmet';
import Loading from '../components/Loading';
import Table from '../components/Table';
import UnauthorizedPage from '../components/UnauthorizedPage';
import {Container, SectionTitle, Title} from '../components/styles';
import {CATALOG_API_URL} from '../utils';
import {useAPIGet} from '../utils/hooks';

const createAdminForm = {
  name: {
    label: 'Name',
    placeholder: "Enter the manager's name",
    type: 'text',
  },
  email: {
    label: 'Email',
    placeholder: "Enter the manager's email",
    type: 'text',
  },
  isAdminDataManager: {
    label: 'Admin Data Manager',
    type: 'checkbox',
  },
};

const AdminPanelManagers = (props) => {
  const {closeModal, openModal} = useContext(ContextFormModal);
  const {data, loading} = useAPIGet(`/users?isDataManager=true`);
  const openCreateModal = () =>
    openModal({
      form: createAdminForm,
      header: 'New Data Manager',
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError, values}) => {
        const url = `${CATALOG_API_URL}/users`;
        const user = {...values, isDataManager: true, password: 'ac123'};

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
  const openEditModal = (selectedManager) => {
    const form = {
      name: {
        ...createAdminForm.name,
        initialValue: selectedManager?.name,
      },
      email: {
        ...createAdminForm.email,
        initialValue: selectedManager?.email,
      },
      isAdminDataManager: {
        ...createAdminForm.isAdminDataManager,
        initialValue: selectedManager?.isAdminDataManager,
      },
    };

    return openModal({
      form,
      header: 'Edit Data Manager',
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError, values}) => {
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
  };
  const openRemoveModal = (selectedManager) => {
    return openModal({
      header: 'Remove Data Manager',
      isAlert: true,
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError}) => {
        const url = `${CATALOG_API_URL}/users/${selectedManager._id}`;

        setLoading();
        patch(url, {isDataManager: false, isAdminDataManager: false})
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
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Box float="right">
        <Button onClick={openCreateModal}>New Manager</Button>
      </Box>
      <Title>Data Managers</Title>
      <Container>
        <Table
          actions={[
            {label: 'Edit', onClick: openEditModal},
            {label: 'Remove', onClick: openRemoveModal},
          ]}
          headers={[
            {key: 'email', label: 'Email'},
            {key: 'name', label: 'Name'},
            {
              key: 'isAdminDataManager',
              label: 'Is Admin',
              type: 'boolean',
            },
          ]}
          rows={data?.users}
        />
      </Container>
    </>
  );
};

const AdminPanelSuggestions = (props) => {
  const {data, loading} = useAPIGet(`/organizations?pending=true`);
  const openOrganization = (organization) => {
    window.location = `/organizations/${organization._id}`;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Title>Suggestions</Title>
      <Stack spacing={4}>
        <Container>
          <SectionTitle>Organizations</SectionTitle>
          {data?.organizations?.length > 0 ? (
            <Table
              actions={[{label: 'View', onClick: openOrganization}]}
              headers={[{key: 'name', label: 'Name'}]}
              rows={data?.organizations}
            />
          ) : (
            <Text>No suggested organizations at this time</Text>
          )}
        </Container>
      </Stack>
    </>
  );
};

const AdminPanelUsers = (props) => {
  const {data, loading} = useAPIGet(`/users`);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Title>Users</Title>
      <Container>
        <Table
          headers={[
            {key: 'email', label: 'Email'},
            {key: 'name', label: 'Name'},
            {
              key: 'catalogType',
              label: 'Type',
            },
          ]}
          rows={data?.users}
        />
      </Container>
    </>
  );
};

const Admin = () => {
  const {user} = useContext(ContextApp);

  if (!user?.isAdminDataManager) {
    return <UnauthorizedPage />;
  }

  return (
    <>
      <Helmet title="Admin" />
      <Tabs>
        <TabList marginBottom={4}>
          <Tab>Data Managers</Tab>
          <Tab>Users</Tab>
          <Tab>Suggestions</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AdminPanelManagers />
          </TabPanel>
          <TabPanel>
            <AdminPanelUsers />
          </TabPanel>
          <TabPanel>
            <AdminPanelSuggestions />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Admin;
