import React, {useState} from 'react';
import {Box, Button, Input, Stack, Text} from '@chakra-ui/core';

import AlertModal from '../components/AlertModal';
import FormModal from '../components/FormModal';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import {Container, Title} from '../components/styles';
import {useAPIGet, useInputChange, useToggle} from '../utils/hooks';

const Admin = props => {
  // TODO: use endpoint
  // const {data, loading} = useAPIGet(`/users`);
  const {data = {users: [{name: 'manager A'}]}, loading} = {};
  const [managerIndex, setManagerIndex] = useState();
  const [newServiceName, setNewServiceName] = useInputChange();
  const [isDeleteOpen, toggleDelete] = useToggle();
  const [isEditOpen, toggleEdit] = useToggle();
  const [isNewManagerOpen, toggleNewManager] = useToggle();
  const selectedManager = data?.users?.[managerIndex];
  const openDeleteModal = index => {
    setManagerIndex(index);
    toggleDelete();
  };
  const closeDeleteModal = () => {
    toggleDelete();
  };
  const openEditModal = index => {
    setManagerIndex(index);
    toggleEdit();
  };
  const closeEditModal = () => {
    toggleEdit();
  };
  const handleCreateManager = () => {
    // TODO: API logic for creating
    window.location.reload();
  };
  const handleDeleteManager = () => {
    // TODO: API logic for deleting
    window.location.reload();
  };
  const handleEditManager = () => {
    // TODO: API logic for editing
    window.location.reload();
  };

  return (
    <>
      <Box padding={4}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Box float="right">
              <Button onClick={toggleNewManager}>New Manager</Button>
            </Box>
            <Title>Data Managers</Title>
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
            <Pagination />
          </>
        )}
      </Box>
      <FormModal
        header="New Data Manager"
        isOpen={isNewManagerOpen}
        onClose={toggleNewManager}
        onConfirm={handleCreateManager}
      >
        <Stack paddingTop={4} spacing={4}>
          <Input
            onChange={setNewServiceName}
            placeholder="Name"
            value={newServiceName}
          />
          <Input
            onChange={setNewServiceName}
            placeholder="Email"
            value={newServiceName}
          />
          <Input
            onChange={setNewServiceName}
            placeholder="Is Admin (make checkbox)"
            value={newServiceName}
          />
        </Stack>
      </FormModal>
      <FormModal
        header={`Edit Data Manager ${selectedManager?.name}`}
        isOpen={isEditOpen}
        onClose={closeEditModal}
        onConfirm={handleEditManager}
      >
        <Input
          onChange={setNewServiceName}
          placeholder="Edit Manager"
          value={newServiceName}
        />
      </FormModal>
      <AlertModal
        header={`Duplicate Data Manager ${selectedManager?.name}`}
        isOpen={isDeleteOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteManager}
      >
        <Input
          onChange={setNewServiceName}
          placeholder="Edit Manager"
          value={newServiceName}
        />
      </AlertModal>
    </>
  );
};

export default Admin;
