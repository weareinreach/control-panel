import React, {useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {
  Box,
  Button,
  Heading,
  Link as ChakraLink,
  Stack,
  Text
} from '@chakra-ui/core';

import AlertDialog from '../components/AlertDialog';
import Loading from '../components/Loading';
import {Container, Title} from '../components/styles';
import {useFetch, useToggle} from '../utils/hooks';

const Organization = props => {
  const orgId = props?.match?.params?.id;
  const urlPath = `/organization/${orgId}`;
  const {data, loading} = useFetch(urlPath);
  const [isDeleteOpen, toggleDelete] = useToggle();
  const [isDuplicateOpen, toggleDuplicate] = useToggle();
  const [isEditOpen, toggleEdit] = useToggle();
  const cancelRef = useRef();
  const deleteService = () => {
    console.log('deleteService');
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
    opportunity_aggregate_ratings,
    opportunity_communitiy_properties,
    opportunity_count,
    opportunity_tags,
    phones,
    properties,
    rating,
    region,
    resource_type,
    schedule,
    tags,
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
        onConfirm={deleteService}
      />
    </>
  );
};

export default Organization;
