import React from 'react';
import {Link} from 'react-router-dom';
import {Box, Button, Input, Text} from '@chakra-ui/core';

import AlertModal from '../components/AlertModal';
import FormModal from '../components/FormModal';
import Loading from '../components/Loading';
import {Container, Title} from '../components/styles';
import {useAPIGet, useInputChange, useToggle} from '../utils/hooks';

const Service = props => {
  const serviceId = props?.match?.params?.id;
  // TODO: use API endpoint
  // const urlPath = `/services/${serviceId}`;
  // const {data, loading} = useAPIGet(urlPath);
  const {data = {}, loading} = {};
  const {name = 'Service Name'} = data;
  const [newServiceName, setNewServiceName] = useInputChange();
  const [isDeleteOpen, toggleDelete] = useToggle();
  const [isDuplicateOpen, toggleDuplicate] = useToggle();
  const handleServiceDelete = () => {
    // TODO: API logic for deleting
    window.location = `/services`;
  };
  const handleServiceDuplicate = () => {
    // TODO: API logic for duplicating
    // TODO: navigate to the new service page
    window.location = `/services/${serviceId}`;
  };

  return (
    <>
      <Box padding={4}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Box float="right">
              <Button onClick={toggleDuplicate} marginRight={2}>
                Duplicate
              </Button>
              <Button onClick={toggleDelete} variantColor="red">
                Delete
              </Button>
            </Box>
            <Title>{name}</Title>
            <Container>
              {/* TODO: link to actual service's organization */}
              <Link to="/organizations">
                <Text>Organization Name</Text>
              </Link>
              {JSON.stringify(data)}
            </Container>
          </>
        )}
      </Box>
      <AlertModal
        header={`Delete Service - ${name}`}
        isOpen={isDeleteOpen}
        onClose={toggleDelete}
        onConfirm={handleServiceDelete}
      />
      <FormModal
        header={`Duplicate ${name}`}
        isOpen={isDuplicateOpen}
        onClose={toggleDuplicate}
        onConfirm={handleServiceDuplicate}
      >
        <Input
          onChange={setNewServiceName}
          placeholder="Enter the new service's name"
          value={newServiceName}
        />
      </FormModal>
    </>
  );
};

export default Service;
