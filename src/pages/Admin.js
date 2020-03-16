import React, {useContext} from 'react';
import {Box, Button, Text} from '@chakra-ui/core';

import {ContextApp} from '../components/ContextApp';
import {ContextFormModal} from '../components/ContextFormModal';
import Loading from '../components/Loading';
import MessagePage from '../components/MessagePage';
import {Container, Title} from '../components/styles';

const createForm = {
  name: {
    placeholder: "Enter the manager's name",
    type: 'text'
  },
  email: {
    placeholder: "Enter the manager's email",
    type: 'text'
  },
  isAdmin: {
    label: 'Admin Data Manager',
    type: 'checkbox'
  }
};

const Admin = () => {
  const {user} = useContext(ContextApp);
  const {closeModal, openModal} = useContext(ContextFormModal);
  // TODO: use endpoint
  // const {data, loading} = useAPIGet(`/users`);
  const {
    data = {
      users: [{email: 'hello@aol.com', name: 'manager A', isAdmin: true}]
    },
    loading
  } = {};
  const openCreateModal = () =>
    openModal({
      form: createForm,
      header: 'New Data Manager',
      onClose: closeModal,
      onConfirm: handleCreateManager
    });
  const openDeleteModal = managerIndex => {
    console.log('managerIndex', managerIndex);

    return openModal({
      header: 'Delete Data Manager',
      isAlert: true,
      onClose: closeModal,
      onConfirm: handleDeleteManager(managerIndex)
    });
  };
  const openEditModal = managerIndex => {
    const selectedManager = data?.users?.[managerIndex];

    console.log('selectedManager', selectedManager);

    const form = {
      name: {
        ...createForm.name,
        initialValue: selectedManager?.name
      },
      email: {
        ...createForm.email,
        initialValue: selectedManager?.email
      },
      isAdmin: {
        ...createForm.isAdmin,
        initialValue: selectedManager?.isAdmin
      }
    };

    console.log('managerIndex', managerIndex);
    console.log('selectedManager', selectedManager);

    return openModal({
      form,
      header: 'Edit Data Manager',
      onClose: closeModal,
      onConfirm: handleEditManager(managerIndex)
    });
  };
  const handleCreateManager = ({setLoading, setSuccess, setFail, values}) => {
    setLoading();

    // TODO: API logic for creating
    console.log('handleCreateManager', values);

    setTimeout(() => {
      window.location.reload();
      setSuccess();
    }, 3000);
  };
  const handleDeleteManager = selectedManagerIndex => ({
    setLoading,
    setSuccess,
    setFail,
    values
  }) => {
    setLoading();

    // TODO: API logic for deleting
    console.log('selectedManagerIndex', selectedManagerIndex);
    console.log('handleDeleteManager', values);

    setTimeout(() => {
      window.location.reload();
      setSuccess();
    }, 3000);
  };
  const handleEditManager = selectedManagerIndex => ({
    setLoading,
    setSuccess,
    setFail,
    values
  }) => {
    setLoading();

    // TODO: API logic for editing
    console.log('selectedManagerIndex', selectedManagerIndex);
    console.log('handleEditManager', values);

    setTimeout(() => {
      window.location.reload();
      setSuccess();
    }, 3000);
  };

  if (!user?.isAdmin) {
    return (
      <MessagePage
        title="Unauthorized"
        message="You don't have permission to view this page."
      />
    );
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Box float="right">
        <Button onClick={openCreateModal}>New Manager</Button>
      </Box>
      <Title>Data Managers</Title>
      {/* Table headers: name, email, isAdmin, actions=[edit, delete] */}
      <Container>
        {data?.users?.map((user, key) => {
          return (
            <div key={key}>
              <Text display="inline" mr={4}>
                {user.name}
              </Text>
              <Button onClick={() => openEditModal(key)} mr={2}>
                Edit
              </Button>
              <Button onClick={() => openDeleteModal(key)}>Delete</Button>
            </div>
          );
        })}
      </Container>
    </>
  );
};

export default Admin;
