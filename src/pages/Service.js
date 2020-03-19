import {delete as httpDelete, post} from 'axios';
import _map from 'lodash/map';
import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {Box, Button, Stack} from '@chakra-ui/core';

import NotFound from './NotFound';
import {ContextFormModal} from '../components/ContextFormModal';
import DropdownButton from '../components/DropdownButton';
import Helmet from '../components/Helmet';
import Loading from '../components/Loading';
import Table, {KeyValueTable} from '../components/Table';
import {Container, SectionTitle, Title} from '../components/styles';
import {getAPIUrl} from '../utils';
import {useAPIGet} from '../utils/hooks';

const duplicateForm = {
  name: {
    placeholder: "Enter the new organization's name",
    type: 'text'
  }
};

const emailHeaders = [
  {key: 'email', label: 'Email'},
  {key: 'title', label: 'Title'},
  {key: 'first_name', label: 'First Name'},
  {key: 'last_name', label: 'Last Name'},
  {key: 'show_on_org', label: 'Show on Org'},
  {key: 'is_primary', label: 'Is Primary'}
];

const locationHeaders = [
  {key: 'name', label: 'Name'},
  {key: 'address', label: 'Address'},
  {key: 'city', label: 'City'},
  {key: 'state', label: 'State'},
  {key: 'country', label: 'Country'},
  {key: 'zip', label: 'Zipcode'},
  {key: 'is_primary', label: 'Is Primary'}
];

const phoneHeaders = [
  {key: 'digits', label: 'Digits'},
  {key: 'is_primary', label: 'Is Primary'}
];

const scheduleHeaders = [
  {key: 'day', label: 'Day'},
  {key: 'start_time', label: 'Start Time'},
  {key: 'end_time', label: 'End Time'}
];

const serviceHeaders = [
  {key: 'name', label: 'Name'},
  {key: 'location', label: 'Location'},
  {key: 'type', label: 'Type'},
  {key: 'updated_at', label: 'Last Updated'}
];

const Organization = props => {
  const {closeModal, openModal} = useContext(ContextFormModal);
  const {orgId, serviceId} = props?.match?.params;
  const servicePath = `/organizations/${orgId}/services/${serviceId}`;
  const {data, loading} = useAPIGet(servicePath);
  const {_id, ...orgData} = data || {};
  const {
    alert_message,
    created_at,
    description,
    emails,
    is_at_capacity,
    is_published,
    last_verified,
    locations,
    name = 'Service Name',
    phones,
    schedule,
    slug,
    updated_at,
    website
  } = orgData || {};
  const openModalDelete = () =>
    openModal({
      header: `Delete ${name}`,
      isAlert: true,
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setFail}) => {
        const url = `${getAPIUrl()}${servicePath}`;

        console.log('DELETE:', url);

        setLoading();
        httpDelete(url)
          .then(() => {
            setSuccess();
            window.location = '/organizations';
          })
          .catch(err => {
            setFail();
            console.error(err);
          });
      }
    });
  const openModalDuplicate = () =>
    openModal({
      form: duplicateForm,
      header: `Duplicate ${name}`,
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setFail, values}) => {
        const url = `${getAPIUrl()}/organizations`;

        console.log('POST:', url);

        setLoading();
        post(url, orgData)
          .then(({data}) => {
            const {organization} = data;

            setSuccess();
            window.location = `/organizations/${organization._id}`;
          })
          .catch(err => {
            setFail();
            console.error(err);
          });
      }
    });

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    return <NotFound />;
  }

  const scheduleRows = _map(schedule, ({start_time, end_time}, day) => {
    return {day, start_time, end_time};
  });

  return (
    <>
      <Helmet title={name} />
      <Box float="right">
        <Link to={`${servicePath}/edit`}>
          <Button marginRight={2}>Edit Service</Button>
        </Link>
        <DropdownButton
          buttonText="More"
          items={[
            {onClick: openModalDuplicate, text: 'Duplicate'},
            {onClick: openModalDelete, text: 'Delete'}
          ]}
        />
      </Box>
      <Title>{name}</Title>
      <Stack marginTop={6} spacing={4}>
        <Container>
          <SectionTitle>Service Details</SectionTitle>
          <KeyValueTable
            rows={[
              {key: 'ID', value: _id},
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
          <SectionTitle>Service Area Coverage</SectionTitle>
          <p>searchable dropdown for all of the location posibilities</p>
        </Container>
        <Container>
          <SectionTitle>Addresses</SectionTitle>
          <Table headers={locationHeaders} rows={locations} />
        </Container>
        <Container>
          <SectionTitle>Schedules</SectionTitle>
          <Table headers={scheduleHeaders} rows={scheduleRows} />
        </Container>
        <Container>
          <SectionTitle>Emails</SectionTitle>
          <Table headers={emailHeaders} rows={emails} />
        </Container>
        <Container>
          <SectionTitle>Phones</SectionTitle>
          <Table headers={phoneHeaders} rows={phones} />
        </Container>
      </Stack>
    </>
  );
};

Organization.propTypes = {
  match: PropTypes.shape()
};

export default Organization;
