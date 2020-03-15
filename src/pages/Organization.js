import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import {Box, Button, Stack} from '@chakra-ui/core';

import {ContextFormModal} from '../components/ContextFormModal';
import DropdownButton from '../components/DropdownButton';
import Loading from '../components/Loading';
import Table, {TableHeader} from '../components/Table';
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

const commentsHeaders = [
  {key: 'comment', label: 'Comment'},
  {
    key: 'user_id',
    label: 'User ID'
  },
  {key: 'date_updated', label: 'Last Updated'}
];

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
  const verifyInformation = () => {
    // TODO: open up modal?
    // TODO: update last_verified field to now
    console.log('verifyInformation', verifyInformation);
  };
  const {
    comment_count,
    comments,
    description,
    // emails,
    id,
    // is_closed,
    last_verified,
    // lat,
    // location,
    // lon,
    name,
    // opportunity_aggregate_ratings,
    // opportunity_communitiy_properties,
    opportunity_count,
    // opportunity_tags,
    // phones,
    // properties,
    // rating,
    region,
    // resource_type,
    // schedule,
    // tags,
    updated_at,
    website
  } = data?.organization || {};
  const created_at = 'created_at';
  const is_at_capacity = 'is_at_capacity';
  const is_published = 'is_published';
  const slug = 'slug';

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
              <DropdownButton
                buttonText="More"
                items={[
                  {
                    onClick: verifyInformation,
                    text: 'Mark Information Verified'
                  },
                  {onClick: openDuplicateModal, text: 'Duplicate'},
                  {onClick: openDeleteModal, text: 'Delete'}
                ]}
              />
            </Box>
          </Box>
          <Title>{name}</Title>
          <Stack marginTop={6} spacing={4}>
            <Container>
              <TableHeader text="Organization Details" />
              <Table
                headers={[{key: 'key'}, {key: 'value'}]}
                rows={[
                  {key: 'ID', value: id},
                  {key: 'Location of physical headquarters', value: region},
                  {key: 'Website', value: website},
                  {key: 'Description', value: description},
                  {key: 'Slug', value: slug},
                  {key: 'Is At Capacity', value: is_at_capacity},
                  {key: 'Is Published', value: is_published},
                  {key: 'Last Verified', value: last_verified},
                  {key: 'Created At', value: created_at},
                  {key: 'Updated At', value: updated_at}
                ]}
              />
            </Container>
            <Container>
              <TableHeader text={`Services (${opportunity_count})`} />
            </Container>
            <Container>
              <TableHeader text={`Comments (${comment_count})`} />
              <Table headers={commentsHeaders} rows={comments} />
            </Container>
          </Stack>
        </>
      )}
    </Box>
  );
};

Organization.propTypes = {
  match: PropTypes.shape()
};

export default Organization;
