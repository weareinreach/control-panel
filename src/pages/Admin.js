import {patch, post} from 'axios';
import React, {useContext} from 'react';
import {Box, Button, Text} from '@chakra-ui/core';

import {ContextApp} from '../components/ContextApp';
import {ContextFormModal} from '../components/ContextFormModal';
import Helmet from '../components/Helmet';
import Loading from '../components/Loading';
import UnauthorizedPage from '../components/UnauthorizedPage';
import {Container, Title} from '../components/styles';
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
        const user = {...values, password: 'ac123'};

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
  const openRemoveModal = managerIndex => {
    return openModal({
      header: 'Remove Data Manager',
      isAlert: true,
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError}) => {
        const selectedManager = data?.users?.[managerIndex];
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
  const openEditModal = managerIndex => {
    const selectedManager = data?.users?.[managerIndex];
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
      <Title>Data Managers</Title>
      {/* Table headers: name, email, isAdminDataManager, actions=[edit, delete] */}
      <Container>
        {data?.users?.map((user, key) => {
          return (
            <div key={key}>
              <Text display="inline" mr={4}>
                {user?.email}
              </Text>
              <Button onClick={() => openEditModal(key)} mr={2}>
                Edit
              </Button>
              <Button onClick={() => openRemoveModal(key)}>Remove</Button>
            </div>
          );
        })}
      </Container>
    </>
  );
};

export default Admin;
