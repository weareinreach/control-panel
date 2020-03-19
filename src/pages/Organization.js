import {delete as httpDelete} from 'axios';
import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {Box, Button, Stack} from '@chakra-ui/core';

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
  scheduleFields,
  serviceFields
} from '../utils/formsHeaders';
import {useAPIGet} from '../utils/hooks';

const getScheduleRows = schedule => {
  console.log('schedule', schedule);

  return [
    {
      day: 'monday',
      start_time: schedule?.monday_start,
      end_time: schedule?.monday_end
    },
    {
      day: 'tuesday',
      start_time: schedule?.tuesday_start,
      end_time: schedule?.tuesday_end
    },
    {
      day: 'wednesday',
      start_time: schedule?.wednesday_start,
      end_time: schedule?.wednesday_end
    },
    {
      day: 'thursday',
      start_time: schedule?.thursday_start,
      end_time: schedule?.thursday_end
    },
    {
      day: 'friday',
      start_time: schedule?.friday_start,
      end_time: schedule?.friday_end
    },
    {
      day: 'saturday',
      start_time: schedule?.saturday_start,
      end_time: schedule?.saturday_end
    },
    {
      day: 'sunday',
      start_time: schedule?.sunday_start,
      end_time: schedule?.sunday_end
    }
  ];
};

const Organization = props => {
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
    last_verified,
    locations,
    name = 'Organization Name',
    phones,
    schedule,
    services,
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
        const url = `${getAPIUrl()}${orgPath}`;

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
  const openModalVerify = () =>
    openModal({
      header: `Verify Information for ${name}`,
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError, values}) => {
        setLoading();

        // TODO: API logic for deleting
        console.log('handleOrganizationVerification', values);

        setTimeout(() => {
          window.location = `/organizations`;
          setSuccess();
        }, 3000);
      }
    });

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    return <NotFound />;
  }

  const scheduleRows = getScheduleRows(schedule);

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
              text: 'Mark Information Verified'
            },
            {href: `${orgPath}/duplicate`, text: 'Duplicate'},
            {onClick: openModalDelete, text: 'Delete'}
          ]}
        />
      </Box>
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
              {key: 'Last Verified', value: last_verified},
              {key: 'Created At', value: created_at},
              {key: 'Updated At', value: updated_at}
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
            getRowLink={service => `${orgPath}/services/${service._id}`}
            headers={serviceFields}
            rows={services}
          />
        </Container>
        <Container>
          <SectionTitle>Service Area Coverage</SectionTitle>
          <p>country</p>
          <p>states or providences</p>
          <p>cities</p>
        </Container>
        <Container>
          <SectionTitle>Addresses</SectionTitle>
          <Table headers={locationFields} rows={locations} />
        </Container>
        <Container>
          <SectionTitle>Schedules</SectionTitle>
          <Table headers={scheduleFields} rows={scheduleRows} />
        </Container>
        <Container>
          <SectionTitle>Emails</SectionTitle>
          <Table headers={emailFields} rows={emails} />
        </Container>
        <Container>
          <SectionTitle>Phones</SectionTitle>
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
