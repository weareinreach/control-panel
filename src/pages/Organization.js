import React, {useRef} from 'react';
import {
  Box,
  Button,
  Heading,
  Input,
  Link as ChakraLink,
  Stack,
  Text
} from '@chakra-ui/core';

import AlertDialog from '../components/AlertDialog';
import FormModal from '../components/FormModal';
import Loading from '../components/Loading';
import {Container, Title} from '../components/styles';
import {useAPIGet, useInputChange, useToggle} from '../utils/hooks';

const Organization = props => {
  const orgId = props?.match?.params?.id;
  const urlPath = `/organization/${orgId}`;
  const {data, loading} = useAPIGet(urlPath);
  const [isDeleteOpen, toggleDelete] = useToggle();
  const [isDuplicateOpen, toggleDuplicate] = useToggle();
  const [isNewServiceOpen, toggleNewService] = useToggle();
  const [newServiceName, setNewServiceName] = useInputChange();
  const [newOrgName, setNewOrgName] = useInputChange();
  const cancelRef = useRef();
  const createNewService = () => {
    // TODO: API logic for creating
    // TODO: navigate to the new service page
    window.location = `/organizations/${orgId}`;
  };
  const duplicateOrganization = () => {
    // TODO: API logic for duplicating
    // TODO: navigate to the new organization page
    window.location = `/organizations/${orgId}`;
  };
  const deleteOrganization = () => {
    // TODO: API logic for deleting
    window.location = `/organizations`;
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

  console.log('data', JSON.stringify(data?.organization));

  return (
    <>
      <Box padding={4}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Box float="right">
              <Box float="right">
                <Button onClick={toggleNewService} marginRight={2}>
                  New Service
                </Button>
                <Button onClick={toggleDuplicate} marginRight={2}>
                  Duplicate
                </Button>
                <Button onClick={toggleDelete} variantColor="red">
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
      <AlertDialog
        dialogRef={cancelRef}
        header={`Delete Organization - ${name}`}
        isOpen={isDeleteOpen}
        onClose={toggleDelete}
        onConfirm={deleteOrganization}
      />
      <FormModal
        isOpen={isDuplicateOpen}
        onClose={toggleDuplicate}
        header={`Duplicate Organization - ${name}`}
        renderBody={() => (
          <Input
            onChange={setNewOrgName}
            placeholder="Enter the new organization's name"
            value={newOrgName}
          />
        )}
        renderFooter={() => (
          <>
            <Button onClick={duplicateOrganization} variantColor="blue" mr={3}>
              Duplicate Service
            </Button>
            <Button onClick={toggleDuplicate} variant="ghost">
              Cancel
            </Button>
          </>
        )}
      />
      <FormModal
        isOpen={isNewServiceOpen}
        onClose={toggleNewService}
        header={`New Service for ${name}`}
        renderBody={() => (
          <Input
            onChange={setNewServiceName}
            placeholder="Enter the new service's name"
            value={newServiceName}
          />
        )}
        renderFooter={() => (
          <>
            <Button onClick={createNewService} variantColor="blue" mr={3}>
              Create Organization
            </Button>
            <Button onClick={toggleNewService} variant="ghost">
              Cancel
            </Button>
          </>
        )}
      />
    </>
  );
};

export default Organization;
