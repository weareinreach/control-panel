import {useFormik} from 'formik';
import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import {Box, Button, Stack} from '@chakra-ui/core';

import FormField from '../components/FormField';
import {ContextFormModal} from '../components/ContextFormModal';
import {Container, SectionTitle, Title} from '../components/styles';

const detailFields = [
  {key: 'name', isRequired: true, label: 'Organization Name'},
  {key: 'slug', label: 'Slug'},
  {key: 'website', label: 'Website'},
  {key: 'description', label: 'Description'},
  {key: 'alert_message', label: 'Alert Message'},
  {key: 'is_at_capacity', label: 'Is At Capacity', type: 'checkbox'},
  {key: 'is_published', label: 'Is Published', type: 'checkbox'}
];

const OrganizationForm = props => {
  const {initialValues: propsValues = {}, isEdit, onCancel, onConfirm} = props;
  const {closeModal, openModal} = useContext(ContextFormModal);
  const initialValues = {
    alert_message: propsValues?.alert_message || '',
    description: propsValues?.description || '',
    is_at_capacity: propsValues?.is_at_capacity || false,
    is_published: propsValues?.is_published || false,
    name: propsValues?.name || '',
    slug: propsValues?.slug || '',
    website: propsValues?.website || ''
  };
  const openSaveModal = () =>
    // TODO: a summary of changes for the log if edit
    // TODO: warning about fields such as is_at_capacity, is_closed, is_published
    openModal({
      header: `Save organization`,
      onClose: closeModal,
      onConfirm,
      values: formik?.values || {}
    });
  const formik = useFormik({initialValues, enableReinitialize: true});

  return (
    <>
      {isEdit ? (
        <Title>Edit Organization {propsValues?.name}</Title>
      ) : (
        <Title>New Organization</Title>
      )}
      <Stack spacing={4}>
        <Container>
          <SectionTitle>Organization Details</SectionTitle>
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
          <SectionTitle>Addresses</SectionTitle>
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
            Save Organization
          </Button>
          <Button onClick={onCancel} variant="ghost">
            Cancel
          </Button>
        </Box>
      </Stack>
    </>
  );
};

OrganizationForm.propTypes = {
  initialValues: PropTypes.shape(),
  isEdit: PropTypes.bool,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func
};

export default OrganizationForm;
