import {delete as httpDelete, get, patch, post} from 'axios';
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
import {adminFields} from '../data/fields.json';
import {CATALOG_API_URL} from '../utils';
import {useAPIGet} from '../utils/hooks';

const AdminPanelManagers = (props) => {
  const {closeModal, openModal} = useContext(ContextFormModal);
  const {data, loading} = useAPIGet(`/users?isDataManager=true`);
  const openCreateModal = () =>
    openModal({
      form: {fields: adminFields},
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
  const openRemoveModal = (selectedManager) =>
    openModal({
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
            {key: 'name', label: 'Name'},
            {key: 'email', label: 'Email'},
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
  const {closeModal, openModal} = useContext(ContextFormModal);
  const {data: suggestedOrgs, loading: loadingOrgs} = useAPIGet(
    `/organizations?pending=true`
  );
  const {data: orgOwners, loading: loadingOwners} = useAPIGet(
    `/organizations?pendingOwnership=true`
  );
  const {data: suggestions, loading: loadingSuggestions} = useAPIGet(
    `/suggestions`
  );
  const openOrganization = (id, serviceId) => {
    window.location = `/organizations/${id}${
      serviceId ? `/services/${serviceId}` : ''
    }`;
  };
  const pendingOwners = orgOwners?.organizations?.reduce((result, org) => {
    // eslint-disable-next-line
    org?.owners?.forEach((owner) => {
      console.log('owner', owner);

      if (owner.isApproved === false) {
        result.push({...owner, organization: org});
      }
    });

    return result;
  }, []);
  const openModalApprovalOwner = (owner) =>
    openModal({
      header: 'Accept the request for affiliation',
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError}) => {
        const url = `${CATALOG_API_URL}/organizations/${owner?.organization?._id}/owners/${owner?.userId}/approve`;

        setLoading();

        get(url)
          .then(() => {
            window.location.reload();
            setSuccess();
          })
          .catch((err) => {
            console.error('An error occured while updating ownership');
            console.error(err);
            setError();
          });
      },
    });
  const openModalDeclineOwner = (owner) =>
    openModal({
      header: 'Decline the request for affiliation',
      isAlert: true,
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError}) => {
        const url = `${CATALOG_API_URL}/organizations/${owner?.organization?._id}/owners/${owner?.userId}`;

        setLoading();

        httpDelete(url)
          .then(() => {
            window.location.reload();
            setSuccess();
          })
          .catch((err) => {
            console.error('An error occured while updating ownership');
            console.error(err);
            setError();
          });
      },
    });
  const openModalDeclineEdit = (suggestion) =>
    openModal({
      header: 'Decline the suggested edit',
      isAlert: true,
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError}) => {
        console.log('suggestion', suggestion);

        const url = `${CATALOG_API_URL}/suggestions/${suggestion?._id}`;

        setLoading();

        httpDelete(url)
          .then(() => {
            window.location.reload();
            setSuccess();
          })
          .catch((err) => {
            console.error('An error occured while updating ownership');
            console.error(err);
            setError();
          });
      },
    });

  if (loadingOrgs || loadingOwners || loadingSuggestions) {
    return <Loading />;
  }

  return (
    <>
      <Title>Suggestions</Title>
      <Stack spacing={4}>
        <Container>
          <SectionTitle>Pending Affiliates</SectionTitle>
          {pendingOwners?.length > 0 ? (
            <Table
              actions={[
                {
                  label: 'View Organization',
                  onClick: (owner) =>
                    openOrganization(owner?.organization?._id),
                },
                {
                  label: 'Approve',
                  onClick: (owner) => openModalApprovalOwner(owner),
                },
                {
                  label: 'Decline',
                  onClick: (owner) => openModalDeclineOwner(owner),
                },
              ]}
              headers={[
                {key: 'email', label: 'Email'},
                {
                  key: 'org.name',
                  label: 'Organization Name',
                  getValue: (owner) => owner?.organization?.name,
                },
              ]}
              rows={pendingOwners}
            />
          ) : (
            <Text>No pending affiliates at this time</Text>
          )}
        </Container>
        <Container>
          <SectionTitle>Suggested Edits</SectionTitle>
          {suggestions?.length > 0 ? (
            <Table
              actions={[
                {
                  label: 'View Organization',
                  onClick: (suggestion) =>
                    openOrganization(
                      suggestion.organizationId,
                      suggestion.serviceId
                    ),
                },
                {
                  label: 'Decline',
                  onClick: (suggestion) => openModalDeclineEdit(suggestion),
                },
              ]}
              headers={[
                {key: 'userEmail', label: 'Suggested By'},
                {key: 'field', label: 'Field'},
                {key: 'value', label: 'Value'},
              ]}
              rows={suggestions}
            />
          ) : (
            <Text>No suggested edits at this time</Text>
          )}
        </Container>
        <Container>
          <SectionTitle>Suggested Organizations</SectionTitle>
          {suggestedOrgs?.organizations?.length > 0 ? (
            <Table
              actions={[
                {label: 'View', onClick: (org) => openOrganization(org?._id)},
              ]}
              headers={[{key: 'name', label: 'Name'}]}
              rows={suggestedOrgs.organizations}
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
            {key: 'name', label: 'Name'},
            {key: 'email', label: 'Email'},
            {
              key: 'catalogType',
              label: 'Type',
            },
            {key: 'created_at', label: 'Created At'},
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
