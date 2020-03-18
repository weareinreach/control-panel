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
      <Container>
        <SectionTitle>Cost Properties</SectionTitle>
        <p>tk</p>
        {/* cost-free (value = true)
              - Description: Enter on all services that are free of cost
              - Type boolean / Checkbox
              - DB field: tk
            As a data manager, I need the ability to mark that an opportunity has cost-fees on a sliding scale
              - OR cost-fees (value = # or a short description of fees, e.g. "costs on a sliding scale")
              - Description: Enter a # or brief written short description of fees (e.g. "costs offered on a sliding scale") */}
      </Container>
      <Container>
        <SectionTitle>Community Properties</SectionTitle>
        <p>tk</p>
        {/* The list is really long. See google doc “Community Properties” for the list of properties
              - Description: The “ADD DESCRIPTIVE RELEVANT COMMUNITY PROPERTIES TO TO ALL OPPORTUNITIES PAGES” column
              - Type boolean / Checkbox
              - DB field: tk
            NOTE: By default add the properties “community-asylum-seeker” (value = true) and “community-lgbt” on every service
            Remove the need for Data Managers to enter “community-asylum-seeker” (value = true) and “community-lgbt” on every organization + service page in order to appear in the live AC Catalog
              - This was due to the fact that we were using the One Degree data portal and AsylumConnect was only one of the “Clients” in the 1D data portal
              - In new custom data portal, all organizations under “Client” = “AsylumConnect” should appear. (Can add new “Clients” later if introduce new products, etc.) */}
      </Container>
      <Container>
        <SectionTitle>Eligibility / Requirement Properties</SectionTitle>
        <p>tk</p>
        {/* elig-description
              - Description: tk
              - Type string / Text Area
              - DB field: has-confidentiality-policy
            time-appointment-required
              - Description: Enter this property for all services that require an appointment in advance
              - Type boolean / Checkbox
              - DB field: tk
            Eligible Age or Over (e.g. age 18 and over)
              - Description: "IF the opportunity is available to a specific age group, it should have the elig-age-or-over or elig-age-or-under with a numeric value for the years. For example, an opportunity that serves 18+ should have a property of elig-age-or-over with a value of 18.
              - Type string / Text Box
              - DB field: elig-age-or-over
            Eligible Age or Under (e.g. age 25 and under)
              - Description: N/A
              - Type boolean / Checkbox
              - DB field: elig-age-or-under (value = #)
            Eligible Age Range (e.g. ages 12-24)
              - Description: N/A
              - Type boolean / Checkbox
              - DB field: elig-age-range (value = # - #)
            REQUIRES a photo ID
              - Description: If the service requires a photo ID from new/potential clients in order to access"
              - Type boolean / Checkbox
              - DB field: req-photo-id
            REQUIRES proof of age
              - Description: If the service requires proof of age from new/potential clients in order to access"
              - Type boolean / Checkbox
              - DB field: req-proof-of-age
            REQUIRES medical insurance
              - Description: If the service requires medical insurance from new/potential clients in order to access"
              - Type boolean / Checkbox
              - DB field: req-medical-insurance
            REQUIRES proof of income
              - Description: If the service requires proof of income from new/potential clients in order to access"
              - Type boolean / Checkbox
              - DB field: req-proof-of-income
            REQUIRES proof of residence
              - Description: If the service requires proof of residence from new/potential clients in order to access"
              - Type boolean / Checkbox
              - DB field: req-proof-of-residence
            REQUIRES a referral
              - Description: If the service requires a referral from another service provider from new/potential clients in order to access"
              - Type boolean / Checkbox
              - DB field: req-referral */}
      </Container>
      <Container>
        <SectionTitle>Additional Information Properties</SectionTitle>
        <p>tk</p>
        {/* Has A Confidentiality Policy
              - Description: If the organization has a confidentiality policy
              - Type boolean / Checkbox
              - DB field: has-confidentiality-policy
            Has Walk-In Hours
              - Description: Accepts walk-ins; Walk-in clinic hours; Legal clinic; No appointment required
              - Type boolean / Checkbox
              - DB field: time-walk-in
            At capacity
              - Description: If the service is currently "at capacity" (i.e. unable to take on new clients)
              - Type boolean / Checkbox
              - DB field: at-capacity
            Near public transportation
              - Description: N/A
              - Type boolean / Checkbox
              - DB field: geo-near-public-transit
            Public transit / specific directions
              - Description: written description of public transit services
              - Type string / Text Area
              - DB field: geo-public-transit-description */}
      </Container>
      <Container>
        <SectionTitle>Language Properties</SectionTitle>
        <p>tk</p>
        {/* - Change the “lang-all-languages-by-interpreter” property from value = “true” (and front-end produces uniform default text) to custom free text value that will show up word for word on the front-end under the service page’s “Non-English Services” section (to better handle responses from direct service providers during the verification process) */}
      </Container>
      <Container>
        <SectionTitle>Language Properties</SectionTitle>
        <p>tk</p>
      </Container>
      <Container>
        <SectionTitle>Service Area Properties</SectionTitle>
        <p>tk</p>
        {/* NOTE: Ask Katie about this: Every city, state (province), country for our 3 nations
            Add new service area properties for new international locations
              - Currently have: “service-state-pennsylvania” + “service-county-washington-adams” “service-national-canada”, etc.
              - Canada: change “service-state-alberta” to “service-canada-province-alberta” + add Canadian cities (service-canada-city-toronto), etc.
              - Mexico: add Mexican states + cities (e.g. “service-mexico-state-baja-california”, “service-mexico-state-sonora” “service-mexico-city-tijuana”)
              - New countries/locations ORAM might need: Turkey, Pakistan, Nigeria, etc. */}
      </Container>
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
