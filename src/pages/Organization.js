import {delete as httpDelete, patch} from 'axios';
import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {Box, Button, Stack} from '@chakra-ui/core';

import NotFound from './NotFound';
import Alert from '../components/Alert';
import Breadcrumbs from '../components/Breadcrumbs';
import {ContextApp} from '../components/ContextApp';
import {ContextFormModal} from '../components/ContextFormModal';
import DropdownButton from '../components/DropdownButton';
import Helmet from '../components/Helmet';
import {ListServiceArea} from '../components/ListProperties';
import Loading from '../components/Loading';
import Table, {KeyValueTable} from '../components/Table';
import {Container, SectionTitle, Title} from '../components/styles';
import {
  emailFields,
  locationFields,
  phoneFields,
  scheduleFields,
} from '../data/fields.json';
import {CATALOG_API_URL} from '../utils';
import {useAPIGet} from '../utils/hooks';

const Organization = (props) => {
  const {user} = useContext(ContextApp);
  const {closeModal, openModal} = useContext(ContextFormModal);
  const {orgId} = props?.match?.params;
  const orgPath = `/organizations/${orgId}`;
  const {data, loading} = useAPIGet(orgPath);
  const {
    _id,
    alert_message,
    created_at,
    description,
    emails,
    is_published,
    locations,
    name = 'Organization Name',
    phones,
    properties,
    schedules,
    services,
    slug,
    updated_at,
    verified_at,
    website,
  } = data || {};
  const goToServicePage = (service) => {
    window.location = `${orgPath}/services/${service._id}`;
  };
  const goToServiceEditPage = (service) => {
    window.location = `${orgPath}/services/${service._id}/edit`;
  };
  const openModalDelete = () =>
    openModal({
      header: `Delete ${name}`,
      isAlert: true,
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError}) => {
        const url = `${CATALOG_API_URL}${orgPath}`;

        console.log('DELETE:', url);

        setLoading();
        httpDelete(url)
          .then(() => {
            setSuccess();
            window.location = '/organizations';
          })
          .catch((err) => {
            setError();
            console.error(err);
          });
      },
    });
  const openModalVerify = () =>
    openModal({
      header: `Verify Information for ${name}`,
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError}) => {
        const url = `${CATALOG_API_URL}${orgPath}`;

        console.log('PATCH:', url);

        setLoading();
        patch(url, {verified_at: Date.now()})
          .then((result) => {
            setSuccess();
            window.location = `/organizations`;
          })
          .catch((err) => {
            setError();
          });
      },
    });

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    return <NotFound />;
  }

  return (
    <>
      <Helmet title={name} />
      {!is_published && (
        <Alert title="This organization is unpublished" type="warning" />
      )}
      <Box float="right">
        <Link to={`${orgPath}/edit`}>
          <Button marginRight={2}>Edit Organization</Button>
        </Link>
        <DropdownButton
          buttonText="More"
          items={[
            {
              onClick: openModalVerify,
              text: 'Mark Information Verified',
            },
            {href: `${orgPath}/duplicate`, text: 'Duplicate'},
            ...(user.isAdminDataManager
              ? [{onClick: openModalDelete, text: 'Delete'}]
              : []),
          ]}
        />
      </Box>
      <Breadcrumbs organization={data} />
      <Title>{name}</Title>
      <Stack marginTop={6} spacing={4}>
        <Container>
          <SectionTitle>Organization Details</SectionTitle>
          <KeyValueTable
            rows={[
              {key: 'ID', value: _id},
              {key: 'Website', value: website},
              {key: 'Description', value: description},
              {key: 'Alert Message', value: alert_message},
              {key: 'Slug', value: slug},
              {key: 'Is Published', value: is_published},
              {key: 'Last Verified', value: verified_at},
              {key: 'Updated At', value: updated_at},
              {key: 'Created At', value: created_at},
            ]}
          />
        </Container>
        <Container>
          <Box float="right">
            <Link to={`${orgPath}/services/new`}>
              <Button marginRight={2}>New Service</Button>
            </Link>
          </Box>
          <SectionTitle>Services</SectionTitle>
          <Table
            actions={[
              {label: 'View', onClick: goToServicePage},
              {label: 'Edit', onClick: goToServiceEditPage},
            ]}
            getRowLink={(service) => `${orgPath}/services/${service._id}`}
            headers={[
              {key: 'name', label: 'Name'},
              {key: 'updated_at', label: 'Last Updated'},
            ]}
            rows={services}
          />
        </Container>
        <Container>
          <SectionTitle>Addresses</SectionTitle>
          <Table headers={locationFields} rows={locations} />
        </Container>
        <Container>
          <SectionTitle>Schedules</SectionTitle>
          <Table headers={scheduleFields} rows={schedules} />
        </Container>
        <Container>
          <SectionTitle>Emails</SectionTitle>
          <Table headers={emailFields} rows={emails} />
        </Container>
        <Container>
          <SectionTitle>Phones</SectionTitle>
          <Table headers={phoneFields} rows={phones} />
        </Container>
        <Container>
          <SectionTitle>Service Area Coverage</SectionTitle>
          <ListServiceArea properties={properties} />
        </Container>
      </Stack>
    </>
  );
};

Organization.propTypes = {
  match: PropTypes.shape(),
};

export default Organization;
