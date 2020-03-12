import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {Box, Button, Heading, Text} from '@chakra-ui/core';

import {ContextFormModal} from '../components/ContextFormModal';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import {Container, Title} from '../components/styles';
import {useAPIGet} from '../utils/hooks';

const createForm = {
  name: {
    placeholder: "Enter the new organization's name",
    type: 'text'
  }
};

const Organizations = props => {
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
            {data?.organizations?.map((org, key) => {
              return (
                <div key={key}>
                  <Link to={`/organizations/${org.id}`}>
                    <Heading fontSize="l">{org.name}</Heading>
                  </Link>
                  <Text>Last Updated {org.updated_at}</Text>
                </div>
              );
            })}
          </Container>
          <Pagination />
        </>
      )}
    </Box>
  );
};

export default Organizations;
