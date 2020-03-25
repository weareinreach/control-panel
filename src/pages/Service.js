import {delete as httpDelete} from 'axios';
import _map from 'lodash/map';
import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Icon,
  Stack,
  Text
} from '@chakra-ui/core';

import NotFound from './NotFound';
import Alert from '../components/Alert';
import {ContextFormModal} from '../components/ContextFormModal';
import DropdownButton from '../components/DropdownButton';
import Helmet from '../components/Helmet';
import Loading from '../components/Loading';
import Table, {KeyValueTable} from '../components/Table';
import {Container, SectionTitle, Title} from '../components/styles';
import {getAPIUrl} from '../utils';
import {
  emailFields,
  locationFields,
  phoneFields,
  scheduleFields
} from '../utils/formsHeaders';
import {useAPIGet} from '../utils/hooks';

const Organization = props => {
  const {closeModal, openModal} = useContext(ContextFormModal);
  const {orgId, serviceId} = props?.match?.params;
  const servicePath = `/organizations/${orgId}/services/${serviceId}`;
  const {data, loading} = useAPIGet(servicePath);
  const {
    _id,
    created_at,
    description,
    emails,
    is_at_capacity,
    is_published,
    locations,
    name = 'Service Name',
    organization,
    phones,
    schedule,
    slug,
    updated_at,
    website
  } = data || {};

  const openModalDelete = () =>
    openModal({
      header: `Delete ${name}`,
      isAlert: true,
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError}) => {
        const url = `${getAPIUrl()}${servicePath}`;

        console.log('DELETE:', url);

        setLoading();
        httpDelete(url)
          .then(() => {
            setSuccess();
            window.location = '/organizations';
          })
          .catch(err => {
            setError();
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
      {!is_published && (
        <Alert title="This service is unpublished" type="warning" />
      )}
      <Box float="right">
        <Link to={`${servicePath}/edit`}>
          <Button marginRight={2}>Edit Service</Button>
        </Link>
        <DropdownButton
          buttonText="More"
          items={[
            {href: `${servicePath}/duplicate`, text: 'Duplicate'},
            {onClick: openModalDelete, text: 'Delete'}
          ]}
        />
      </Box>
      <Breadcrumb
        marginBottom={4}
        spacing="8px"
        separator={<Icon color="gray.300" name="chevron-right" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Organizations</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/organizations/${orgId}`}>
            {organization?.name || 'Organization Name'}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">
            <Text isTruncated maxWidth="200px">
              {name}
            </Text>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Title>{name}</Title>
      <Stack marginTop={6} spacing={4}>
        <Container>
          <SectionTitle>Service Details</SectionTitle>
          <KeyValueTable
            rows={[
              {key: 'ID', value: _id},
              {key: 'Website', value: website},
              {key: 'Description', value: description},
              {key: 'Slug', value: slug},
              {key: 'Is At Capacity', value: is_at_capacity},
              {key: 'Is Published', value: is_published},
              {key: 'Updated At', value: updated_at},
              {key: 'Created At', value: created_at}
            ]}
          />
        </Container>
        <Container>
          <SectionTitle>Service Area Coverage</SectionTitle>
          <p>country</p>
          <p>states or providences</p>
          <p>cities</p>
        </Container>
        <Container>
          <SectionTitle>Address</SectionTitle>
          <Table headers={locationFields} rows={locations} />
        </Container>
        <Container>
          <SectionTitle>Schedule</SectionTitle>
          <Table headers={scheduleFields} rows={scheduleRows} />
        </Container>
        <Container>
          <SectionTitle>Email</SectionTitle>
          <Table headers={emailFields} rows={emails} />
        </Container>
        <Container>
          <SectionTitle>Phone</SectionTitle>
          <Table headers={phoneFields} rows={phones} />
        </Container>
      </Stack>
    </>
  );
};

Organization.propTypes = {
  match: PropTypes.shape()
};

export default Organization;
