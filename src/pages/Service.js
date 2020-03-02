import React, {useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {Box, Button} from '@chakra-ui/core';

import AlertDialog from '../components/AlertDialog';
import Loading from '../components/Loading';
import {Container, Title} from '../components/styles';
import {useFetch, useToggle} from '../utils/hooks';

const Service = props => {
  // TODO: use endpoint
  // const {data, loading} = useFetch(servicePath);
  const {data, loading} = {};
  const [isDeleteOpen, toggleDelete] = useToggle();
  const [isDuplicateOpen, toggleDuplicate] = useToggle();
  const [isEditOpen, toggleEdit] = useToggle();
  const cancelRef = useRef();
  const name = 'Service Name';
  const deleteService = () => {
    console.log('deleteService');
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
              <Button onClick={toggleEdit} marginRight={2}>
                Edit
              </Button>
              <Button onClick={toggleDelete} variantColor="red">
                Delete
              </Button>
            </Box>
            <Title>{name}</Title>
            <Container>{JSON.stringify(data)}</Container>
          </>
        )}
      </Box>
      <AlertDialog
        dialogRef={cancelRef}
        header={`Delete Service - ${name}`}
        isOpen={isDeleteOpen}
        onClose={toggleDelete}
        onConfirm={deleteService}
      />
    </>
  );
};

export default Service;
