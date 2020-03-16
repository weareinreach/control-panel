import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
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
  scheduleHeaders
} from '../utils/tableHeaders';

const duplicateForm = {
  name: {
    placeholder: "Enter the new service's name",
    type: 'text'
  }
};

const Service = props => {
  const {closeModal, openModal} = useContext(ContextFormModal);
  const serviceId = props?.match?.params?.id;
  const urlPath = `/services/${serviceId}`;
  const {data, loading} = useAPIGet(urlPath);
  const {
    // access_instructions,
    description,
    // emails,
    id,
    // is_appointment,
    // is_closed,
    // last_verified,
    // lat,
    // location,
    // lon,
    name
    // organization,
    // parent_organization_id,
    // phones,
    // properties
    // rating,
    // region,
    // resource_type,
    // schedule,
    // tags,
    // updated_at,
    // website
  } = data?.service || {};
  const created_at = 'created_at';
  const updated_at = 'updated_at';
  const is_at_capacity = 'is_at_capacity';
  const is_published = 'is_published';
  const slug = 'slug';
  const handleServiceDelete = ({setLoading, setSuccess, setFail}) => {
    setLoading();

    // TODO: API logic for deleting

    setTimeout(() => {
      // TODO: navigate to the home services page
      // window.location = `/services/${serviceId}`;
      setSuccess();
      // window.location = `/services`;
    }, 3000);
  };
  const handleServiceDuplicate = ({
    setLoading,
    setSuccess,
    setFail,
    values
  }) => {
    setLoading();

    // TODO: API logic for duplicating
    console.log('handleServiceDuplicate', values);

    setTimeout(() => {
      // TODO: navigate to the new service page
      // window.location = `/services/${serviceId}`;
      setSuccess();
    }, 3000);
  };
  const openDeleteModal = () =>
    openModal({
      header: `Delete Service - ${name}`,
      isAlert: true,
      onClose: closeModal,
      onConfirm: handleServiceDelete
    });
  const openDuplicateModal = () =>
    openModal({
      form: duplicateForm,
      header: `Duplicate ${name}`,
      onClose: closeModal,
      onConfirm: handleServiceDuplicate
    });

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Breadcrumb addSeparator={false}>
        <BreadcrumbItem>
          <BreadcrumbLink>Organization Name</BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink isCurrentPage>Service Name</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box float="right">
        <DropdownButton
          buttonText="More"
          listProps={{placement: 'bottom-end'}}
          items={[
            {onClick: openDuplicateModal, text: 'Duplicate'},
            {onClick: openDeleteModal, text: 'Delete'}
          ]}
        />
      </Box>
      <Title>{name}</Title>
      <Stack marginTop={6} spacing={4}>
        <Container>
          <TableHeader text="Organization Details" />
          <Table
            headers={[{key: 'key'}, {key: 'value'}]}
            rows={[
              {key: 'ID', value: id},
              {key: 'Description', value: description},
              {key: 'Slug', value: slug},
              {key: 'Is At Capacity', value: is_at_capacity},
              {key: 'Is Published', value: is_published},
              {key: 'Created At', value: created_at},
              {key: 'Updated At', value: updated_at}
            ]}
          />
        </Container>
        <Container>
          <TableHeader text="Service Area Coverage" />
          <p>searchable dropdown for all of the location posibilities</p>
          <p>location-property = controls search</p>
        </Container>
        <Container>
          <TableHeader text="Location" />
          <p>reference to a organization's location</p>
          <Table headers={locationHeaders} rows={[]} />
        </Container>
        <Container>
          <TableHeader text="Schedule" />
          <p>override organization's schedule</p>
          <Table headers={scheduleHeaders} rows={[]} />
        </Container>
        <Container>
          <TableHeader text="Email" />
          <p>reference to a organization's email</p>
          <Table headers={emailHeaders} rows={[]} />
        </Container>
        <Container>
          <TableHeader text="Phone" />
          <p>reference to a organization's phone</p>
          <Table headers={phoneHeaders} rows={[]} />
        </Container>
        <Container>
          <TableHeader text="Cost Properties" />
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
          <TableHeader text="Community Properties" />
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
          <TableHeader text="Eligibility / Requirement Properties" />
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
          <TableHeader text="Additional Information Properties" />
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
          <TableHeader text="Language Properties" />
          <p>tk</p>
          {/* - Change the “lang-all-languages-by-interpreter” property from value = “true” (and front-end produces uniform default text) to custom free text value that will show up word for word on the front-end under the service page’s “Non-English Services” section (to better handle responses from direct service providers during the verification process) */}
        </Container>
        <Container>
          <TableHeader text="Language Properties" />
          <p>tk</p>
        </Container>
        <Container>
          <TableHeader text="Service Area Properties" />
          <p>tk</p>
          {/* NOTE: Ask Katie about this: Every city, state (province), country for our 3 nations

              Add new service area properties for new international locations
                - Currently have: “service-state-pennsylvania” + “service-county-washington-adams” “service-national-canada”, etc.
                - Canada: change “service-state-alberta” to “service-canada-province-alberta” + add Canadian cities (service-canada-city-toronto), etc.
                - Mexico: add Mexican states + cities (e.g. “service-mexico-state-baja-california”, “service-mexico-state-sonora” “service-mexico-city-tijuana”)
                - New countries/locations ORAM might need: Turkey, Pakistan, Nigeria, etc. */}
        </Container>
        <Container>
          <TableHeader text="Tags" />
          <p>multiple tables tk</p>
        </Container>
      </Stack>
    </>
  );
};

Service.propTypes = {
  match: PropTypes.shape()
};

export default Service;
