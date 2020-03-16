import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Stack
} from '@chakra-ui/core';

import {ContextFormModal} from '../components/ContextFormModal';
import DropdownButton from '../components/DropdownButton';
import Loading from '../components/Loading';
import Table, {TableHeader} from '../components/Table';
import {Container, Title} from '../components/styles';
import {useAPIGet} from '../utils/hooks';
import {
  emailHeaders,
  locationHeaders,
  phoneHeaders,
  scheduleHeaders,
  serviceHeaders
} from '../utils/tableHeaders';

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
  const {
    alert_message,
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
  const handleOrganizationVerification = ({
    setLoading,
    setSuccess,
    setFail,
    values
  }) => {
    setLoading();

    // TODO: API logic for deleting
    console.log('handleOrganizationVerification', values);

    setTimeout(() => {
      window.location = `/organizations`;
      setSuccess();
    }, 3000);
  };
  const openModalCreate = () =>
    openModal({
      form: createForm,
      header: `New Service for ${name}`,
      onClose: closeModal,
      onConfirm: handleCreateService
    });
  const openModalDelete = () =>
    openModal({
      header: `Delete ${name}`,
      isAlert: true,
      onClose: closeModal,
      onConfirm: handleOrganizationDelete
    });
  const openModalDuplicate = () =>
    openModal({
      form: duplicateForm,
      header: `Duplicate ${name}`,
      onClose: closeModal,
      onConfirm: handleOrganizationDuplicate
    });
  const openModalVerify = () =>
    openModal({
      header: `Verify Information for ${name}`,
      onClose: closeModal,
      onConfirm: handleOrganizationVerification
    });
  const openModalEditDetails = () =>
    openModal({
      header: `Edit ${name}'s Details`,
      onClose: closeModal,
      onConfirm: handleOrganizationVerification
    });
  const openModalEditSchedules = () =>
    openModal({
      header: `Edit ${name}'s Schedules`,
      onClose: closeModal,
      onConfirm: handleOrganizationVerification
    });
  const openModalEditLocations = () =>
    openModal({
      header: `Edit ${name}'s Locations`,
      onClose: closeModal,
      onConfirm: handleOrganizationVerification
    });
  const openModalEditLocationProperties = () =>
    openModal({
      header: `Edit ${name}'s Service Area Coverage`,
      onClose: closeModal,
      onConfirm: handleOrganizationVerification
    });
  const openModalEditEmails = () =>
    openModal({
      header: `Edit ${name}'s Emails`,
      onClose: closeModal,
      onConfirm: handleOrganizationVerification
    });
  const openModalEditPhones = () =>
    openModal({
      header: `Edit ${name}'s Phones`,
      onClose: closeModal,
      onConfirm: handleOrganizationVerification
    });

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Breadcrumb addSeparator={false}>
        <BreadcrumbItem>
          <BreadcrumbLink isCurrentPage>Organization Name</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box float="right">
        <Button onClick={openModalCreate} marginRight={2}>
          New Service
        </Button>
        <DropdownButton
          buttonText="More"
          items={[
            {
              onClick: openModalVerify,
              text: 'Mark Information Verified'
            },
            {onClick: openModalDuplicate, text: 'Duplicate'},
            {onClick: openModalDelete, text: 'Delete'}
          ]}
        />
      </Box>
      <Title>{name}</Title>
      <Stack marginTop={6} spacing={4}>
        <Container>
          <TableHeader
            editTable={openModalEditDetails}
            text="Organization Details"
          />
          <Table
            headers={[{key: 'key'}, {key: 'value'}]}
            rows={[
              {key: 'ID', value: id},
              {key: 'Location of physical headquarters', value: region},
              {key: 'Website', value: website},
              {key: 'Description', value: description},
              {key: 'Alert Message', value: alert_message},
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
          <Table headers={serviceHeaders} rows={[]} />
        </Container>
        <Container>
          <TableHeader
            editTable={openModalEditLocationProperties}
            text="Service Area Coverage"
          />
          <p>searchable dropdown for all of the location posibilities</p>
          <p>location-property = controls search</p>
        </Container>
        <Container>
          <TableHeader editTable={openModalEditLocations} text="Locations" />
          <Table headers={locationHeaders} rows={[]} />
        </Container>
        <Container>
          <TableHeader editTable={openModalEditSchedules} text="Schedules" />
          <Table headers={scheduleHeaders} rows={[]} />
        </Container>
        <Container>
          <TableHeader editTable={openModalEditEmails} text="Emails" />
          <Table headers={emailHeaders} rows={[]} />
        </Container>
        <Container>
          <TableHeader editTable={openModalEditPhones} text="Phones" />
          <Table headers={phoneHeaders} rows={[]} />
        </Container>
      </Stack>
    </>
  );
};

Organization.propTypes = {
  match: PropTypes.shape()
};

export default Organization;
