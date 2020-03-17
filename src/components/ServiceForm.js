import {useFormik} from 'formik';
import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import {Box, Button, Stack} from '@chakra-ui/core';

import {ContextFormModal} from '../components/ContextFormModal';
import FormField from '../components/FormField';
import {Container, SectionTitle, Title} from '../components/styles';

const detailFields = [
  {key: 'name', label: 'Name'},
  // TODO: create on save/edit?
  // {key: 'slug', label: 'Slug'},
  {key: 'description', label: 'Description', type: 'textarea'},
  {key: 'access_instructions', label: 'Access Instructions', type: 'textarea'},
  {key: 'is_appointment', label: 'Is Appointment', type: 'checkbox'},
  {key: 'is_at_capacity', label: 'Is At Capacity', type: 'checkbox'},
  {key: 'is_published', label: 'Is Published', type: 'checkbox'}
];

const ServiceForm = props => {
  const {initialValues: propsValues = {}, isEdit, onCancel, onConfirm} = props;
  const {closeModal, openModal} = useContext(ContextFormModal);
  const initialValues = {
    access_instructions: propsValues?.access_instructions || '',
    description: propsValues?.description || '',
    is_appointment: propsValues?.is_appointment || false,
    is_at_capacity: propsValues?.is_at_capacity || false,
    is_published: propsValues?.is_published || false,
    name: propsValues?.name || '',
    slug: propsValues?.slug || ''
  };

  console.log('propsValues', propsValues);
  console.log('initialValues', initialValues);

  const formik = useFormik({initialValues, enableReinitialize: true});
  const openSaveModal = () =>
    // TODO: a summary of changes for the log if edit
    // TODO: warning about fields such as is_at_capacity, is_closed, is_published
    openModal({
      header: `Save organization`,
      onClose: closeModal,
      onConfirm,
      values: formik?.values || {}
    });

  return (
    <>
      {isEdit ? (
        <Title>Edit Service {propsValues?.name}</Title>
      ) : (
        <Title>New Service</Title>
      )}
      <Stack spacing={4}>
        <Container>
          <SectionTitle>Service Details</SectionTitle>
          <Stack spacing={4}>
            {detailFields.map(({key, ...rest}) => (
              <FormField key={key} fieldKey={key} formik={formik} {...rest} />
            ))}
          </Stack>
        </Container>
        <Container>
          <SectionTitle>Service Area Coverage</SectionTitle>
          {/* Dropdown or something */}
        </Container>
        <Container>
          <SectionTitle>Locations</SectionTitle>
          {/* List, edit, add them */}
          {/* Use a toggle like system to hide them */}
        </Container>
        <Container>
          <SectionTitle>Schedules</SectionTitle>
          {/* List, edit, add them */}
          {/* Use a toggle like system to hide them */}
        </Container>
        <Container>
          <SectionTitle>Emails</SectionTitle>
          {/* List, edit, add them */}
          {/* Use a toggle like system to hide them */}
        </Container>
        <Container>
          <SectionTitle>Phones</SectionTitle>
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
