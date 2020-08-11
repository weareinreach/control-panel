import {delete as httpDelete, patch, post} from 'axios';
import _memoize from 'lodash/memoize';
import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import {
  Box,
  Button,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/core';

import NotFound from './NotFound';
import Alert from '../components/Alert';
import Breadcrumbs from '../components/Breadcrumbs';
import {ContextApp} from '../components/ContextApp';
import {ContextFormModal} from '../components/ContextFormModal';
import DropdownButton from '../components/DropdownButton';
import FormCoverage from '../components/FormCoverage';
import FormOrganizationInfo from '../components/FormOrganizationInfo';
import FormProperties from '../components/FormProperties';
import FormTags from '../components/FormTags';
import Helmet from '../components/Helmet';
import ListProperties, {
  ListServiceArea,
  ListTags,
} from '../components/ListProperties';
import Loading from '../components/Loading';
import Table, {KeyValueTable} from '../components/Table';
import {Container, SectionTitle, Title} from '../components/styles';
import {
  accessInstructionFields,
  emailFields,
  locationFields,
  phoneFields,
  serviceDetailsFields,
} from '../data/fields.json';
import {
  additionalInformationProperties,
  communityProperties,
  costProperties,
  eligibilityRequirementProperties,
  languageProperties,
} from '../data/properties.json';
import {CATALOG_API_URL, scheduleHeaders} from '../utils';
import config from '../utils/config';
import {formatServiceInput, formatTags} from '../utils/forms';
import {useAPIGet} from '../utils/hooks';

const {catalogUrl} = config;

const buttonGroupProps = {
  marginBottom: 4,
  float: ' right',
};

const countryLabels = {
  canada: 'Canada',
  mexico: 'Mexico',
  united_states: 'United States',
};

const findItem = _memoize(
  (list, _id) => list?.find((item) => item._id === _id) || null
);

const Service = (props) => {
  const {user} = useContext(ContextApp);
  const {closeModal, openModal} = useContext(ContextFormModal);
  const {orgId, serviceId} = props?.match?.params;
  const servicePath = `/organizations/${orgId}/services/${serviceId}`;
  const {data: service, loading} = useAPIGet(servicePath);
  const {
    _id,
    access_instructions,
    created_at,
    description,
    email_id,
    is_published,
    location_id,
    name = 'Service Name',
    organization,
    phone_id,
    properties,
    schedule_id,
    slug,
    tags: serviceTags,
    updated_at,
    description_ES,
    slug_ES,
    name_ES,
  } = service || {};
  const email = findItem(organization?.emails, email_id);
  const location = findItem(organization?.locations, location_id);
  const phone = findItem(organization?.phones, phone_id);
  const schedule = findItem(organization?.schedules, schedule_id);
  const updateFields = ({setLoading, setSuccess, setError, values}) => {
    const url = `${CATALOG_API_URL}${servicePath}`;
    const updatedService = formatServiceInput({...service, ...values});

    setLoading();
    patch(url, updatedService)
      .then(({data}) => {
        setSuccess();
        window.location = servicePath;
      })
      .catch((err) => {
        setError();
        console.error(err);
      });
  };
  const updateListField = (key, options) => ({
    setLoading,
    setSuccess,
    setError,
    values,
  }) => {
    const {isDelete, isEdit} = options || {};
    const newField = [...(service?.[key] || [])];
    const {_id, ...restValues} = values;
    const itemIndex = newField.findIndex((item) => item._id === _id);
    const isExistingItem = _id && itemIndex !== -1;

    if (isEdit) {
      if (isExistingItem) {
        newField[itemIndex] = {...newField[itemIndex], ...restValues};
      }
    } else if (isDelete) {
      if (isExistingItem) {
        newField.splice(itemIndex, 1);
      }
    } else {
      newField.push(restValues);
    }

    updateFields({setLoading, setSuccess, setError, values: {[key]: newField}});
  };
  const openCoverageEdit = () =>
    openModal({
      children: FormCoverage,
      childrenProps: {properties},
      header: 'CoverageEdit',
      onClose: closeModal,
      onConfirm: updateFields,
    });
  const openDetailsEdit = () =>
    openModal({
      form: {fields: serviceDetailsFields, initialValues: service},
      header: 'DetailsEdit',
      onClose: closeModal,
      onConfirm: updateFields,
    });
  const openServiceDelete = () =>
    openModal({
      header: `Delete ${name}`,
      isAlert: true,
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError}) => {
        const url = `${CATALOG_API_URL}${servicePath}`;

        console.log('DELETE:', url);

        setLoading();
        httpDelete(url)
          .then(() => {
            setSuccess();
            window.location = `/organizations/${orgId}`;
          })
          .catch((err) => {
            setError();
            console.error(err);
          });
      },
    });
  const openServiceDuplicate = () => {
    const {_id, name, ...restService} = service;

    openModal({
      form: {
        fields: [{key: 'name', label: 'name'}],
        initialValues: restService,
      },
      header: 'Duplicate Service',
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError, values}) => {
        const url = `${CATALOG_API_URL}/organizations/${orgId}/services`;

        setLoading();
        post(url, values)
          .then(() => {
            setSuccess();
            window.location = `/organizations/${orgId}`;
          })
          .catch((err) => {
            setError();
            console.error(err);
          });
      },
    });
  };
  const openEditOrgField = (field, list) => () =>
    openModal({
      children: FormOrganizationInfo,
      childrenProps: {field, fieldValue: service[field], list},
      header: `Add field to ${name}`,
      onClose: closeModal,
      onConfirm: updateFields,
    });
  const openAccessForm = ({isDelete, isDuplicate, isEdit} = {}) => (
    instruction
  ) => {
    if (isDelete) {
      return openModal({
        form: {initialValues: instruction},
        header: 'Delete Access Information',
        isAlert: true,
        onClose: closeModal,
        onConfirm: updateListField('access_instructions', {isDelete: true}),
      });
    }

    if (isEdit) {
      return openModal({
        form: {fields: accessInstructionFields, initialValues: instruction},
        header: 'Edit Access Information',
        onClose: closeModal,
        onConfirm: updateListField('access_instructions', {isEdit: true}),
      });
    }

    return openModal({
      form: {
        fields: accessInstructionFields,
        initialValues: isDuplicate ? instruction : {},
      },
      header: 'New Access Information',
      onClose: closeModal,
      onConfirm: updateListField('access_instructions'),
    });
  };
  const openEditProperties = () =>
    openModal({
      children: FormProperties,
      form: {initialValues: {properties}},
      header: 'Edit Properties',
      onClose: closeModal,
      onConfirm: updateFields,
    });
  const openEditTags = (country) => () =>
    openModal({
      children: FormTags,
      childrenProps: {country},
      form: {initialValues: {tags: formatTags(serviceTags)}},
      header: `Edit ${countryLabels[country]} Tags`,
      onClose: closeModal,
      onConfirm: updateFields,
    });
  const openOnCatalog = () => {
    const url = `${catalogUrl}/en_US/resource/${organization.slug}/service/${slug}`;
    const win = window.open(url, '_blank');

    win.focus();
  };

  if (loading) {
    return <Loading />;
  }

  if (!service) {
    return <NotFound />;
  }

  return (
    <>
      <Helmet title={name} />
      {!is_published && (
        <Alert title="This service is unpublished" type="warning" />
      )}
      <Box float="right">
        <Button onClick={openOnCatalog} marginRight={2}>
          View on Catalog
        </Button>
        <DropdownButton
          buttonText="More"
          items={[
            {onClick: openServiceDuplicate, text: 'Duplicate'},
            ...(user.isAdminDataManager
              ? [{onClick: openServiceDelete, text: 'Delete'}]
              : []),
          ]}
        />
      </Box>
      <Breadcrumbs organization={organization} service={service} />
      <Title>{name}</Title>
      <Tabs marginTop={6}>
        <TabList>
          <Tab>Service Details</Tab>
          <Tab>Properties</Tab>
          <Tab>Tags</Tab>
        </TabList>
        <TabPanels>
          <TabPanel marginTop={2}>
            <Stack spacing={4}>
              <Container>
                <Box {...buttonGroupProps}>
                  <Button onClick={openDetailsEdit}>Edit Details</Button>
                </Box>
                <SectionTitle>Service Details</SectionTitle>
                <KeyValueTable
                  rows={[
                    {key: 'ID', value: _id},
                    {key: 'Name', value: name},
                    {key: 'Name_ES', value: name_ES},
                    {key: 'Description', value: description},
                    {key: 'Description_ES', value: description_ES},
                    {key: 'Slug', value: slug},
                    {key: 'Slug_ES', value: slug_ES},
                    // TODO: Temporarily comment out is_published functionality for services
                    // Add back into fields.json to make it editable again
                    // {key: 'Is Published', value: is_published},
                    {key: 'Updated At', value: updated_at},
                    {key: 'Created At', value: created_at},
                  ]}
                />
              </Container>
              <Container>
                <Box {...buttonGroupProps}>
                  <Button onClick={openAccessForm()}>New Instructions</Button>
                </Box>
                <SectionTitle>Access Instructions</SectionTitle>
                <Table
                  headers={accessInstructionFields}
                  rows={access_instructions}
                  actions={[
                    {label: 'Edit', onClick: openAccessForm({isEdit: true})},
                    {
                      label: 'Duplicate',
                      onClick: openAccessForm({isDuplicate: true}),
                    },
                    {
                      label: 'Delete',
                      onClick: openAccessForm({isDelete: true}),
                    },
                  ]}
                />
              </Container>
              <Container>
                <Box {...buttonGroupProps}>
                  <Button
                    onClick={openEditOrgField(
                      'location_id',
                      organization?.locations
                    )}
                  >
                    Edit Address
                  </Button>
                </Box>
                <SectionTitle>Address</SectionTitle>
                {location && (
                  <Table headers={locationFields} rows={[location]} />
                )}
              </Container>
              <Container>
                <Box {...buttonGroupProps}>
                  <Button
                    onClick={openEditOrgField(
                      'schedule_id',
                      organization?.schedules
                    )}
                  >
                    Edit Schedule
                  </Button>
                </Box>
                <SectionTitle>Schedule</SectionTitle>
                {schedule && (
                  <Table headers={scheduleHeaders} rows={[schedule]} />
                )}
              </Container>
              <Container>
                <Box {...buttonGroupProps}>
                  <Button
                    onClick={openEditOrgField('email_id', organization?.emails)}
                  >
                    Edit Email
                  </Button>
                </Box>
                <SectionTitle>Email</SectionTitle>
                {email && <Table headers={emailFields} rows={[email]} />}
              </Container>
              <Container>
                <Box {...buttonGroupProps}>
                  <Button
                    onClick={openEditOrgField('phone_id', organization?.phones)}
                  >
                    Edit Phone
                  </Button>
                </Box>
                <SectionTitle>Phone</SectionTitle>
                {phone && <Table headers={phoneFields} rows={[phone]} />}
              </Container>
              <Container>
                <Box {...buttonGroupProps}>
                  <Button onClick={openCoverageEdit}>Edit Coverage</Button>
                </Box>
                <SectionTitle>Service Area Coverage</SectionTitle>
                <ListServiceArea properties={properties} />
              </Container>
            </Stack>
          </TabPanel>
          <TabPanel marginTop={2}>
            <Stack space={4}>
              <Box {...buttonGroupProps} float="none" textAlign="right">
                <Button onClick={openEditProperties}>Edit Properties</Button>
              </Box>
              <Container>
                <SectionTitle>Cost Properties</SectionTitle>
                <ListProperties list={costProperties} properties={properties} />
              </Container>
              <Container>
                <SectionTitle>Community Properties</SectionTitle>
                <ListProperties
                  list={communityProperties}
                  properties={properties}
                />
              </Container>
              <Container>
                <SectionTitle>
                  Eligibility / Requirement Properties
                </SectionTitle>
                <ListProperties
                  list={eligibilityRequirementProperties}
                  properties={properties}
                />
              </Container>
              <Container>
                <SectionTitle>Language Properties</SectionTitle>
                <ListProperties
                  list={languageProperties}
                  properties={properties}
                />
              </Container>
              <Container>
                <SectionTitle>Additional Information Properties</SectionTitle>
                <ListProperties
                  list={additionalInformationProperties}
                  properties={properties}
                />
              </Container>
            </Stack>
          </TabPanel>
          <TabPanel marginTop={2}>
            <Stack spacing={4}>
              <Container>
                <Box {...buttonGroupProps}>
                  <Button onClick={openEditTags('united_states')}>
                    Edit Tags
                  </Button>
                </Box>
                <SectionTitle>United States Tags</SectionTitle>
                {serviceTags?.united_states ? (
                  <ListTags items={serviceTags.united_states} />
                ) : null}
              </Container>
              <Container>
                <Box {...buttonGroupProps}>
                  <Button onClick={openEditTags('canada')}>Edit Tags</Button>
                </Box>
                <SectionTitle>Canada Tags</SectionTitle>
                {serviceTags?.canada ? (
                  <ListTags items={serviceTags.canada} />
                ) : null}
              </Container>
              <Container>
                <Box {...buttonGroupProps}>
                  <Button onClick={openEditTags('mexico')}>Edit Tags</Button>
                </Box>
                <SectionTitle>Mexico Tags</SectionTitle>
                {serviceTags?.mexico ? (
                  <ListTags items={serviceTags.mexico} />
                ) : null}
              </Container>
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

Service.propTypes = {
  match: PropTypes.shape(),
};

export default Service;
