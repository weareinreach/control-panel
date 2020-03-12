import React, {useContext} from 'react';
import {
  Box,
  Button,
  Heading,
  Link as ChakraLink,
  Stack,
  Text
} from '@chakra-ui/core';

import {ContextFormModal} from '../components/ContextFormModal';
import Loading from '../components/Loading';
import {Container, Title} from '../components/styles';
import {useAPIGet} from '../utils/hooks';

const createForm = {
  name: {
    placeholder: "Enter the new service's name",
    type: 'text'
  }
};

const duplicateForm = {
  name: {
    placeholder: "Enter the new organization's name",
    type: 'text'
  }
};

const Organization = props => {
  const {closeModal, openModal} = useContext(ContextFormModal);
  const orgId = props?.match?.params?.id;
  const urlPath = `/organization/${orgId}`;
  const {data, loading} = useAPIGet(urlPath);
  const openCreateModal = () =>
    openModal({
      form: createForm,
      header: `New Service for ${name}`,
      onClose: closeModal,
      onConfirm: handleCreateService
    });
  const openDeleteModal = () =>
    openModal({
      header: `Delete ${name}`,
      isAlert: true,
      onClose: closeModal,
      onConfirm: handleOrganizationDelete
    });
  const openDuplicateModal = () =>
    openModal({
      form: duplicateForm,
      header: `Duplicate ${name}`,
      onClose: closeModal,
      onConfirm: handleOrganizationDuplicate
    });
  const handleCreateService = ({setLoading, setSuccess, setFail, values}) => {
    setLoading();

    // TODO: API logic for creating
    console.log('handleCreateService', values);

    setTimeout(() => {
      // TODO: navigate to the new service page
      window.location = `/organizations/${orgId}`;
      setSuccess();
    }, 3000);
  };
  const handleOrganizationDelete = ({
    setLoading,
    setSuccess,
    setFail,
    values
  }) => {
    setLoading();

    // TODO: API logic for duplicating
    console.log('handleOrganizationDelete', values);

    setTimeout(() => {
      // TODO: navigate to the new organization page
      window.location = `/organizations/${orgId}`;
      setSuccess();
    }, 3000);
  };
  const handleOrganizationDuplicate = ({
    setLoading,
    setSuccess,
    setFail,
    values
  }) => {
    setLoading();

    // TODO: API logic for deleting
    console.log('handleOrganizationDuplicate', values);

    setTimeout(() => {
      window.location = `/organizations`;
      setSuccess();
    }, 3000);
  };
  const {
    comment_count,
    comments,
    description,
    emails,
    id,
    is_closed,
    last_verified,
    lat,
    location,
    lon,
    name,
    // opportunity_aggregate_ratings,
    // opportunity_communitiy_properties,
    // opportunity_count,
    // opportunity_tags,
    phones,
    properties,
    // rating,
    region,
    // resource_type,
    // schedule,
    // tags,
    updated_at,
    website
  } = data?.organization || {};

  return (
    <Box padding={4}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Box float="right">
            <Box float="right">
              <Button onClick={openCreateModal} marginRight={2}>
                New Service
              </Button>
              <Button onClick={openDuplicateModal} marginRight={2}>
                Duplicate
              </Button>
              <Button onClick={openDeleteModal} variantColor="red">
                Delete
              </Button>
            </Box>
          </Box>
          <Title>{name}</Title>
          <Stack marginTop={6} spacing={4}>
            <Container>
              <Text>ID {id}</Text>
              <Text>Region {region}</Text>
              <Text>
                Website{' '}
                <ChakraLink isExternal href={website}>
                  {website}
                </ChakraLink>
              </Text>
              <Text>Description {description}</Text>
              <Text>Is Closed {is_closed}</Text>
              <Text>Last Verified {last_verified}</Text>
              <Text>Updated At {updated_at}</Text>
            </Container>
            <Container>
              <Heading fontSize="m">Opportunities</Heading>
              <Text>tk</Text>
            </Container>
            <Container>
              <Heading fontSize="m">Properties</Heading>
              <Text>properties {JSON.stringify(properties)}</Text>
            </Container>
            <Container>
              <Heading fontSize="m">Locations</Heading>
              <Text>Loc {JSON.stringify(location)}</Text>
              <Text>Lat {lat}</Text>
              <Text>Lon {lon}</Text>
            </Container>
            <Container>
              <Heading fontSize="m">Phones</Heading>
              <Text>phones {JSON.stringify(phones)}</Text>
            </Container>
            <Container>
              <Heading fontSize="m">Emails</Heading>
              <Text>emails {JSON.stringify(emails)}</Text>
            </Container>
            <Container>
              <Heading fontSize="m">Comments</Heading>
              <Text>Comments {JSON.stringify(comments)}</Text>
              <Text>Comment Count {comment_count}</Text>
            </Container>
            <Container>
              <Heading fontSize="m">Translations</Heading>
              <Text>tk</Text>
            </Container>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default Organization;
