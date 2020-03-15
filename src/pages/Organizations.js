import React, {useContext} from 'react';
import {Box, Button} from '@chakra-ui/core';

import {ContextFormModal} from '../components/ContextFormModal';
import Loading from '../components/Loading';
import Table from '../components/Table';
import {Container, Title} from '../components/styles';
import {useAPIGet} from '../utils/hooks';

const headers = [
  {key: 'name', label: 'Name'},
  {key: 'region', label: 'Region'},
  {key: 'opportunity_count', label: 'Services'},
  {key: 'updated_at', label: 'Last Updated'}
];

const createForm = {
  name: {
    placeholder: "Enter the new organization's name",
    type: 'text'
  }
};

const Organizations = () => {
  const {closeModal, openModal} = useContext(ContextFormModal);
  const {data, loading} = useAPIGet(`/organizations`);
  const openCreateModal = () =>
    openModal({
      form: createForm,
      header: 'New Organization',
      onClose: closeModal,
      onConfirm: handleCreateOrganization
    });
  const handleCreateOrganization = ({
    setLoading,
    setSuccess,
    setFail,
    values
  }) => {
    setLoading();

    // TODO: API logic for creating
    console.log('handleCreateOrganization', values);

    // TODO: fields
    // - name

    setTimeout(() => {
      // TODO: navigate to the new org page
      // window.location = `/organizations`;
      setSuccess();
    }, 3000);
  };

  return (
    <Box padding={4}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Box float="right">
            <Button onClick={openCreateModal}>New Organization</Button>
          </Box>
          <Title>Organizations</Title>
          <Container>
            <Table
              getRowLink={org => `/organizations/${org.id}`}
              headers={headers}
              rows={data?.organizations}
            />
          </Container>
        </>
      )}
    </Box>
  );
};

export default Organizations;
