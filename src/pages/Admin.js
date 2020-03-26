import {patch, post} from 'axios';
import React, {useContext} from 'react';
import {Box, Button} from '@chakra-ui/core';

import {ContextApp} from '../components/ContextApp';
import {ContextFormModal} from '../components/ContextFormModal';
import Helmet from '../components/Helmet';
import Loading from '../components/Loading';
import Table from '../components/Table';
import UnauthorizedPage from '../components/UnauthorizedPage';
import {Container, SectionTitle, Title} from '../components/styles';
import {getAPIUrl} from '../utils';
import {useAPIGet} from '../utils/hooks';

const createAdminForm = {
  name: {
    label: 'Name',
    placeholder: "Enter the manager's name",
    type: 'text'
  },
  email: {
    label: 'Email',
    placeholder: "Enter the manager's email",
    type: 'text'
  },
  isAdminDataManager: {
    label: 'Admin Data Manager',
    type: 'checkbox'
  }
};

const Admin = () => {
  const {user} = useContext(ContextApp);
  const {closeModal, openModal} = useContext(ContextFormModal);
  const {data, loading} = useAPIGet(`/users?isDataManager=true`);
  const openCreateModal = () =>
    openModal({
      form: createAdminForm,
      header: 'New Data Manager',
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError, values}) => {
        const url = `${getAPIUrl()}/users`;
        const user = {...values, isDataManager: true, password: 'ac123'};

        setLoading();
        post(url, user)
          .then(() => {
            window.location.reload();
            setSuccess();
          })
          .catch(err => {
            console.error('An error occured while creating users');
            console.error(err);
            setError();
          });
      }
    });
  const openEditModal = selectedManager => {
    console.log('openEditModal selectedManager', selectedManager);

    const form = {
      name: {
        ...createAdminForm.name,
        initialValue: selectedManager?.name
      },
      email: {
        ...createAdminForm.email,
        initialValue: selectedManager?.email
      },
      isAdminDataManager: {
        ...createAdminForm.isAdminDataManager,
        initialValue: selectedManager?.isAdminDataManager
      }
    };

    return openModal({
      form,
      header: 'Edit Data Manager',
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError, values}) => {
        const url = `${getAPIUrl()}/users/${selectedManager._id}`;

        setLoading();
        patch(url, values)
          .then(() => {
            window.location.reload();
            setSuccess();
          })
          .catch(err => {
            console.error('An error occured while editing users');
            console.error(err);
            setError();
          });
      }
    });
  };
  const openRemoveModal = selectedManager => {
    console.log('openRemoveModal selectedManager', selectedManager);

    return openModal({
      header: 'Remove Data Manager',
      isAlert: true,
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError}) => {
        const url = `${getAPIUrl()}/users/${selectedManager._id}`;

        setLoading();
        patch(url, {isDataManager: false, isAdminDataManager: false})
          .then(() => {
            window.location.reload();
            setSuccess();
          })
          .catch(err => {
            console.error('An error occured while updating the users');
            console.error(err);
            setError();
          });
      }
    });
  };

  if (loading) {
    return <Loading />;
  }

  if (!user?.isAdminDataManager) {
    return <UnauthorizedPage />;
  }

  return (
    <>
      <Helmet title="Admin" />
      <Box float="right">
        <Button onClick={openCreateModal}>New Manager</Button>
      </Box>
      <Title>Admin</Title>
      <Container>
        <SectionTitle>Data Managers</SectionTitle>
        <Table
          actions={[
            {label: 'Edit', onClick: openEditModal},
            {label: 'Remove', onClick: openRemoveModal}
          ]}
          headers={[
            {key: 'email', label: 'Email'},
            {key: 'name', label: 'Name'},
            {
              key: 'isAdminDataManager',
              label: 'Is Admin',
              type: 'boolean'
            }
          ]}
          rows={data?.users}
        />
      </Container>
    </>
  );
};

export default Admin;
