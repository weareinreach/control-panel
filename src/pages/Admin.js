import React, {useState} from 'react';
import {Box, Button, Input, Text} from '@chakra-ui/core';

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
  const [newOrgName, setNewOrgName] = useInputChange();
  const [newServiceName, setNewServiceName] = useInputChange();
  const [isDeleteOpen, toggleDelete] = useToggle();
  const [isEditOpen, toggleEdit] = useToggle();
  const [isNewServiceOpen, toggleNewService] = useToggle();
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
    toggleDelete();
  };
  const handleEditManager = () => {
    // TODO: API logic for editing
    toggleEdit();
  };

  return (
    <>
      <Box padding={4}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Box float="right">
              <Button onClick={handleCreateManager}>New Manager</Button>
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
        isOpen={isEditOpen}
        onClose={closeEditModal}
        onConfirm={handleEditManager}
        header={`Edit Data Manager ${selectedManager?.name}`}
      >
        <Input
          onChange={setNewServiceName}
          placeholder="Edit Manager"
          value={newServiceName}
        />
      </FormModal>
      <FormModal
        isOpen={isDeleteOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteManager}
        header={`Duplicate Data Manager ${selectedManager?.name}`}
      >
        <Input
          onChange={setNewServiceName}
          placeholder="Edit Manager"
          value={newServiceName}
        />
      </FormModal>
    </>
  );
};

export default Admin;
