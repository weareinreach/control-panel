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
  Spacer,
  Flex
} from '@chakra-ui/react';

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
import {formatServiceInput, formatTags, removeWhitespace} from '../utils/forms';
import {useAPIGet} from '../utils/hooks';
import { Text } from '@chakra-ui/react';

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
    is_deleted,
    location_id,
    name = 'Service Name',
    notes_log,
    organization,
    phone_id,
    properties,
    schedule_id,
    slug,
    tags: serviceTags,
    updated_at,
    description_ES,
    slug_ES,
    name_ES
  } = service || {};
  const email = findItem(organization?.emails, email_id);
  const location = findItem(organization?.locations, location_id);
  const phone = findItem(organization?.phones, phone_id);
  const schedule = findItem(organization?.schedules, schedule_id);
  const updateFields = ({setLoading, setSuccess, setError, values}) => {
    const serviceUrl = `${CATALOG_API_URL}${servicePath}`;
    const orgUrl = `${CATALOG_API_URL}/organizations/${orgId}`;

    const updatedService = formatServiceInput({...service, ...values});

    removeWhitespace(updatedService);
    setLoading();
    patch(serviceUrl, updatedService)
      .then(({data}) => {
        patch(orgUrl, {verified_at: Date.now()}).then(() => {
          setSuccess();
          window.location = servicePath;
        });
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
  const openOrgVerify = () =>
    openModal({
      header: `Verify Information for ${name}?`,
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError, values}) => {
        // const values = {verified_at: Date.now()};

        updateFields({setLoading, setSuccess, setError, values});
      },
      onVerify: ({setLoading, setSuccess, setError, values}) => {
        values = {...values, verified_at: Date.now()};

        updateFields({setLoading, setSuccess, setError, values});
      },
    });
  const openCoverageEdit = () =>
    openModal({
      children: FormCoverage,
      childrenProps: {properties},
      header: 'Edit Coverage',
      onClose: closeModal,
      onConfirm: updateFields,
    });
  const openDetailsEdit = () =>
    openModal({
      form: {fields: serviceDetailsFields, initialValues: service},
      header: 'Edit Details',
      onClose: closeModal,
      onConfirm: openOrgVerify
    });
  const openServiceDelete = () =>
    openModal({
      header: `Delete ${name}`,
      isAlert: true,
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError}) => {
        const url = `${CATALOG_API_URL}${servicePath}`;

        setLoading();
        //If Data Manager and Not Admin Soft delete
        if(user.isDataManager && !user.isAdminDataManager){
          patch(url,{is_deleted:true}).then(() => {
            setSuccess();
            window.location = `/organizations/${orgId}`;
          })
          .catch((err) => {
            setError();
            console.error(err);
          });
        }
        //If Admin Perma Delete
        if(user.isAdminDataManager){
          httpDelete(url)
          .then(() => {
            setSuccess();
            window.location = `/organizations/${orgId}`;
          })
          .catch((err) => {
            setError();
            console.error(err);
          });
        }
        
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
  const openEditOrgField = (field, list , name) => () =>
    openModal({
      children: FormOrganizationInfo,
      childrenProps: {field, fieldValue: service[field], list},
      header: name,
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
        
  const openNotesForm =
    (isDelete = false) =>
    (note) => {
      if(isDelete){
        return openModal({
          form: {initialValues: note},
          header: 'Delete Note',
          isAlert: true,
          onClose: closeModal,
          onConfirm: updateListField('notes_log', {isDelete: true})
        });
      }

      return openModal({
        form: {
          fields: [{key: 'note', label: 'Note', type: 'textarea'}]
        },
        header: 'New Note',
        onClose: closeModal,
        onConfirm: ({setLoading, setSuccess, setError, values}) => {
          const notes_data = {...values, created_at: Date.now()};
          updateListField('notes_log')({setLoading, setSuccess, setError, values: notes_data});
        }
      });
    }

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
            ...(user.isDataManager
              ? [{onClick: openServiceDelete, text: 'Delete'}]
              : []),
          ]}
        />
      </Box>
      <Breadcrumbs organization={organization} service={service} />
      <Title data-test-id="service-title">{name}</Title>
      <Tabs marginTop={6}>
        <TabList>
          <Tab data-test-id="service-tab-details">Service Details</Tab>
          <Tab data-test-id="service-tab-properties">Properties</Tab>
          <Tab data-test-id="service-tab-tags">Tags</Tab>
        </TabList>
        <TabPanels>
          <TabPanel marginTop={2}>
            <Stack spacing={4}>
              <Container>
                <Box {...buttonGroupProps}>
                  <Button onClick={openDetailsEdit} data-test-id="service-details-button">Edit Details</Button>
                </Box>
                <SectionTitle data-test-id="service-detail-title">Service Details</SectionTitle>
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
                    {key: 'Is Deleted', value: is_deleted},
                  ]}
                />
              </Container>
              <Container>
                <Box {...buttonGroupProps}>
                  <Button onClick={openAccessForm()} data-test-id="service-new-instruction-button">New Instructions</Button>
                </Box>
                <SectionTitle data-test-id="service-instruction-title">Access Instructions</SectionTitle>
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
                      organization?.locations,
                      'Edit Addresses'
                    )}
                    data-test-id="service-new-address-button"
                  >
                    Edit Address
                  </Button>
                </Box>
                <SectionTitle data-test-id="service-address-title">Address</SectionTitle>
                {location && (
                  <Table headers={locationFields} rows={[location]} />
                )}
              </Container>
              <Container>
                <Box {...buttonGroupProps}>
                  <Button
                    onClick={openEditOrgField(
                      'schedule_id',
                      organization?.schedules,
                      'Edit Schedules'
                    )}
                    data-test-id="service-new-schedule-button"
                  >
                    Edit Schedule
                  </Button>
                </Box>
                <SectionTitle data-test-id="service-schedule-title">Schedule</SectionTitle>
                {schedule && (
                  <Table headers={scheduleHeaders} rows={[schedule]} />
                )}
              </Container>
              <Container>
                <Box {...buttonGroupProps}>
                  <Button
                    onClick={openEditOrgField('email_id', organization?.emails,'Edit Emails')}
                    data-test-id="service-new-email-button">
                    Edit Email
                  </Button>
                </Box>
                <SectionTitle data-test-id="service-email-title">Email</SectionTitle>
                {email && <Table headers={emailFields} rows={[email]} />}
              </Container>
              <Container>
                <Box {...buttonGroupProps}>
                  <Button
                    onClick={openEditOrgField('phone_id', organization?.phones,'Edit Phones')}
                   data-test-id="service-new-phone-button"
                   >
                    Edit Phone
                  </Button>
                </Box>
                <SectionTitle data-test-id="service-phone-title">Phone</SectionTitle>
                {phone && <Table headers={phoneFields} rows={[phone]} />}
              </Container>
              <Container>
                <Box {...buttonGroupProps}>
                  <Button onClick={openCoverageEdit} data-test-id="service-edit-coverage-button">Edit Coverage</Button>
                </Box>
                <SectionTitle data-test-id="service-coverage-title">Service Area Coverage</SectionTitle>
                <ListServiceArea properties={properties} />
              </Container>
              <Container>
                <Box {...buttonGroupProps}>
                  <Button onClick={openNotesForm()} data-test-id="service-new-note-button">New Note</Button>
                </Box>
                <SectionTitle data-test-id="service-note-title">Notes</SectionTitle>
                <Table
                  headers={[
                    { "key": "note", "label": "Note" },
                    {  "key": "created_at", "label": "Created At" }
                  ]}
                  rows={notes_log}
                  actions={[
                    { label: "Delete", onClick: openNotesForm(true) }
                  ]}
                />
              </Container>
            </Stack>
          </TabPanel>
          <TabPanel marginTop={2}>
            <Stack space={4}>
              <Flex>
              <Box>
              Before adding a community property to a service, ask yourself: ‘Does this organization/service have expertise and experience in serving this particular community?’ (Note: ‘We serve everyone’ does not count as demonstrated expertise for our purposes at InReach.)
              </Box>
              <Spacer />
              <Box {...buttonGroupProps} float='none' textAlign="right">
                <Button onClick={openEditProperties} data-test-id="service-edit-properties-button">Edit Properties</Button>
              </Box>
              </Flex>
              <Container>
                <SectionTitle data-test-id="service-cost-properties-title">Cost Properties</SectionTitle>
                <ListProperties list={costProperties} properties={properties} />
              </Container>
              <Container>
                <SectionTitle data-test-id="service-community-title">Community Properties</SectionTitle>
                <ListProperties
                  list={communityProperties}
                  properties={properties}
                />
              </Container>
              <Container>
                <SectionTitle data-test-id="service-requirements-title">
                  Eligibility / Requirement Properties
                </SectionTitle>
                <ListProperties
                  list={eligibilityRequirementProperties}
                  properties={properties}
                />
              </Container>
              <Container>
                <SectionTitle data-test-id="service-language-title">Language Properties</SectionTitle>
                <ListProperties
                  list={languageProperties}
                  properties={properties}
                />
              </Container>
              <Container>
                <SectionTitle data-test-id="service-additional-title">Additional Information Properties</SectionTitle>
                <ListProperties
                  list={additionalInformationProperties}
                  properties={properties}
                />
              </Container>
            </Stack>
          </TabPanel>
          <TabPanel marginTop={2}>
            <Stack spacing={4}>
<<<<<<< 57852c3b2e6110002161aa1e77c1df02ca006626
              <Container data-test-id="service-tags-help-text-container">
                <p>What <b>“tag(s)”</b> you choose affect(s) when this organization appears in the search results of our free App. For example, if you add a “LGBTQ Centers” tag to a service page, the organization will appear for a user who searches for “Community Support - LGBTQ Centers” in the App. Please try to consider the user’s perspective when entering tag(s).</p>
                <p><b>*Note:</b> Please also make sure to separate an organization's services into unique service pages. This is especially true for legal services. For example, if an organization offers both gender/name change legal services and asylum legal services, these should actually be separate service pages in the data portal (each service page should then have its own distinct, relevant tag). Similarly, if you are using two very different tag types (e.g. transportation and legal), you should likely instead create two different service pages (each with their own distinct tag). Please post in the #community-outreach channel in Slack with any questions.</p>
              </Container>
              <Container data-test-id="service-tags-us-container">
=======
              <Container>
>>>>>>> Added help text
                <Box {...buttonGroupProps}>
                  <Button onClick={openEditTags('united_states')} data-test-id="service-us-tags-button">
                    Edit Tags
                  </Button>
                </Box>
                <SectionTitle data-test-id="service-us-title">United States Tags</SectionTitle>
                {serviceTags?.united_states ? (
                  <ListTags items={serviceTags.united_states} />
                ) : null}
              </Container>
              <Container data-test-id="service-tags-canada-container">
                <Box {...buttonGroupProps}>
                  <Button onClick={openEditTags('canada')} data-test-id="service-canada-tags-button">Edit Tags</Button>
                </Box>
                <SectionTitle data-test-id="service-canada-title">Canada Tags</SectionTitle>
                {serviceTags?.canada ? (
                  <ListTags items={serviceTags.canada} />
                ) : null}
              </Container>
              <Container data-test-id="service-tags-mexico-container">
                <Box {...buttonGroupProps}>
                  <Button onClick={openEditTags('mexico')} data-test-id="service-mexico-tags-button">Edit Tags</Button>
                </Box>
                <SectionTitle data-test-id="service-mexico-title">Mexico Tags</SectionTitle>
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
}

export default Service;
