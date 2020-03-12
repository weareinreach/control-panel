import React from 'react';
import {Link} from 'react-router-dom';
import {Box, Button, Heading, Input, Text} from '@chakra-ui/core';

import FormModal from '../components/FormModal';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import {Container, Title} from '../components/styles';
import {useAPIGet, useInputChange, useToggle} from '../utils/hooks';

const Organizations = props => {
  const {data, loading} = useAPIGet(`/organizations`);
  const [newOrgName, setNewOrgName] = useInputChange();
  const [isNewOrgOpen, toggleNewOrg] = useToggle();
  const handleCreateOrganization = () => {
    // TODO: API logic for creating
    // TODO: navigate to the new org page
    window.location = `/organizations`;
  };

  return (
    <>
      <Box padding={4}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Box float="right">
              <Button onClick={toggleNewOrg}>New Organization</Button>
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
      <FormModal
        isOpen={isNewOrgOpen}
        onClose={toggleNewOrg}
        onConfirm={handleCreateOrganization}
        header="New Organization"
      >
        <Input
          onChange={setNewOrgName}
          placeholder="Enter the new organization's name"
          value={newOrgName}
        />
      </FormModal>
    </>
  );
};

export default Organizations;
