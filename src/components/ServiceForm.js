import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import {Box, Button, Stack} from '@chakra-ui/core';

import {ContextFormModal} from '../components/ContextFormModal';
import {Container, Title} from '../components/styles';

const ServiceForm = props => {
  const {initialValues = {}, isEdit, onCancel, onConfirm} = props;
  const {closeModal, openModal} = useContext(ContextFormModal);
  const {
    // alert_message,
    // created_at = 'created_at',
    // description,
    // emails,
    // id,
    // is_at_capacity = 'is_at_capacity',
    // is_closed,
    // is_published = 'is_published',
    // last_verified,
    // lat,
    // location,
    // lon,
    name
    // opportunity_aggregate_ratings,
    // opportunity_communitiy_properties,
    // opportunity_count,
    // opportunity_tags,
    // phones,
    // properties,
    // rating,
    // region,
    // resource_type,
    // schedule,
    // slug = 'slug',
    // tags,
    // updated_at,
    // website
  } = initialValues;
  const openSaveModal = () =>
    // TODO: a summary of changes for the log if edit
    // TODO: warning about fields such as is_at_capacity, is_closed, is_published
    openModal({
      header: `Save organization`,
      onClose: closeModal,
      onConfirm
    });

  return (
    <>
      {isEdit ? <Title>Edit Service {name}</Title> : <Title>New Service</Title>}

      {/* <Stack marginTop={6} spacing={4}>
        <Container>
          <TableHeader
            editTable={openModalEditDetails}
            text="Service Details"
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
      </Stack> */}
      <Stack spacing={4}>
        <Container>
          <p>Service Details</p>
          {/* {'ID', value: id}, */}
          {/* {'Location of physical headquarters', value: region}, */}
          {/* {'Website', value: website}, */}
          {/* {'Description', value: description}, */}
          {/* {'Alert Message', value: alert_message}, */}
          {/* {'Slug', value: slug}, */}
          {/* {'Is At Capacity', value: is_at_capacity}, */}
          {/* {'Is Published', value: is_published}, */}
          {/* {'Last Verified', value: last_verified}, */}
          {/* {'Created At', value: created_at}, */}
          {/* {'Updated At', value: updated_at} */}
        </Container>
        <Container>
          <p>Service Area Coverage</p>
          {/* Dropdown or something */}
        </Container>
        <Container>
          <p>Locations</p>
          {/* List, edit, add them */}
          {/* Use a toggle like system to hide them */}
        </Container>
        <Container>
          <p>Schedules</p>
          {/* List, edit, add them */}
          {/* Use a toggle like system to hide them */}
        </Container>
        <Container>
          <p>Emails</p>
          {/* List, edit, add them */}
          {/* Use a toggle like system to hide them */}
        </Container>
        <Container>
          <p>Phones</p>
          {/* List, edit, add them */}
          {/* Use a toggle like system to hide them */}
        </Container>
        <Box>
          <Button onClick={openSaveModal} mr={2}>
            Save Service
          </Button>
          <Button onClick={onCancel} variant="ghost">
            Cancel
          </Button>
        </Box>
      </Stack>
    </>
  );
};

ServiceForm.propTypes = {
  initialValues: PropTypes.shape(),
  isEdit: PropTypes.bool,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func
};

export default ServiceForm;
