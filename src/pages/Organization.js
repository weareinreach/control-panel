import {delete as httpDelete, patch, post} from 'axios';
import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import {Box, Button, Stack} from '@chakra-ui/react';
import NotFound from './NotFound';
import Alert from '../components/Alert';
import Breadcrumbs from '../components/Breadcrumbs';
import {ContextApp} from '../components/ContextApp';
import {ContextFormModal} from '../components/ContextFormModal';
import DropdownButton from '../components/DropdownButton';
import FormCoverage from '../components/FormCoverage';
import Helmet from '../components/Helmet';
import {ListServiceArea} from '../components/ListProperties';
import Loading from '../components/Loading';
import Table, {KeyValueTable} from '../components/Table';
import {Container, SectionTitle, Title} from '../components/styles';
import FormPhotos from '../components/FormPhotos';
import {Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react';
import {Grid, GridItem, Text} from '@chakra-ui/react';

import {
  emailFields,
  locationFields,
  organizationDetailsFields,
  phoneFields,
  scheduleFields,
  socialMediaFields,
} from '../data/fields.json';
import {CATALOG_API_URL, scheduleHeaders} from '../utils';
import config from '../utils/config';
import {
  formatOrgInput,
  formatServiceInput,
  removeWhitespace,
} from '../utils/forms';
import {useAPIGet} from '../utils/hooks';

const {catalogUrl} = config;

const buttonGroupProps = {
  marginBottom: 4,
  float: ' right',
};

const Organization = (props) => {
  const {user} = useContext(ContextApp);
  const {closeModal, openModal} = useContext(ContextFormModal);
  const {orgId} = props?.match?.params;
  const orgPath = `/organizations/${orgId}`;
  const {data: organization, loading} = useAPIGet(orgPath);

  const {
    _id,
    alert_message,
    created_at,
    description,
    emails,
    is_published,
    locations,
    name = 'Organization Name',
    notes,
    owners,
    phones,
    photos,
    properties,
    schedules,
    services,
    slug,
    social_media,
    updated_at,
    verified_at,
    website,
    website_ES,
    description_ES,
    alert_message_ES,
    slug_ES,
    venue_id,
  } = organization || {};
  const updateFields = ({setLoading, setSuccess, setError, values}) => {
    const url = `${CATALOG_API_URL}/organizations/${orgId}`;
    removeWhitespace(values);
    setLoading();
    patch(url, values)
      .then(({data}) => {
        setSuccess();
        window.location = `/organizations/${orgId}`;
      })
      .catch((err) => {
        setError();
        console.error(err);
      });
  };
  const updateListField =
    (key, options) =>
    ({setLoading, setSuccess, setError, values}) => {
      const {isDelete, isEdit} = options || {};
      const newField = [...(organization?.[key] || [])];
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

      updateFields({
        setLoading,
        setSuccess,
        setError,
        values: {[key]: newField},
      });
    };
  const goToServicePage = (service) => {
    window.location = `${orgPath}/services/${service._id}`;
  };
  const openCoverageEdit = () =>
    openModal({
      children: FormCoverage,
      childrenProps: {properties},
      header: 'CoverageEdit',
      onClose: closeModal,
      onConfirm: updateFields,
    });
  const openOrgDelete = () =>
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
  const openOrgDuplicate = () =>
    openModal({
      form: {fields: [{key: 'name', label: 'name'}]},
      header: 'Duplicate Organization',
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError, values}) => {
        const url = `${CATALOG_API_URL}/organizations`;
        const organization = formatOrgInput(values);

        setLoading();
        post(url, organization)
          .then(({data}) => {
            const id = data?.organization?._id;

            setSuccess();
            window.location = `/organizations/${id}`;
          })
          .catch((err) => {
            setError();
            console.error(err);
          });
      },
    });
  const openOrgVerify = () =>
    openModal({
      header: `Verify Information for ${name}?`,
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError, values}) => {
        updateFields({setLoading, setSuccess, setError, values});
      },
      onVerify: ({setLoading, setSuccess, setError, values}) => {
        values = {...values, verified_at: Date.now()};

        updateFields({setLoading, setSuccess, setError, values});
      },
    });
  const openDetailsEdit = () =>
    openModal({
      form: {fields: organizationDetailsFields, initialValues: organization},
      header: 'Edit Details',
      onClose: closeModal,
      onConfirm: openOrgVerify,
    });
  const openNewService = () =>
    openModal({
      form: {fields: [{key: 'name', label: 'Service Name', isRequired: true}]},
      header: 'New Service Name',
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError, values}) => {
        const url = `${CATALOG_API_URL}/organizations/${orgId}/services`;
        const service = formatServiceInput(values);

        console.log('POST:', url);

        setLoading();
        post(url, service)
          .then((data) => {
            setSuccess();
            window.location.reload();
          })
          .catch((err) => {
            setError();
            console.error(err);
          });
      },
    });
  const openEmailForm =
    ({isDelete, isDuplicate, isEdit} = {}) =>
    (email) => {
      if (isDelete) {
        return openModal({
          form: {initialValues: email},
          header: 'Delete Emails',
          isAlert: true,
          onClose: closeModal,
          onConfirm: updateListField('emails', {isDelete: true}),
        });
      }

      if (isEdit) {
        return openModal({
          form: {fields: emailFields, initialValues: email},
          header: 'Edit Emails',
          onClose: closeModal,
          onConfirm: updateListField('emails', {isEdit: true}),
        });
      }

      return openModal({
        form: {
          fields: emailFields,
          initialValues: isDuplicate ? email : {show_on_organization: true},
        },
        header: 'New Emails',
        onClose: closeModal,
        onConfirm: updateListField('emails'),
      });
    };
  const openLocationForm =
    ({isDelete, isDuplicate, isEdit} = {}) =>
    (location) => {
      if (isDelete) {
        return openModal({
          form: {initialValues: location},
          header: 'Delete Location',
          isAlert: true,
          onClose: closeModal,
          onConfirm: updateListField('locations', {isDelete: true}),
        });
      }

      if (isEdit) {
        return openModal({
          form: {fields: locationFields, initialValues: location},
          header: 'Edit Location',
          onClose: closeModal,
          onConfirm: updateListField('locations', {isEdit: true}),
        });
      }

      return openModal({
        form: {
          fields: locationFields,
          initialValues: isDuplicate ? location : {show_on_organization: true},
        },
        header: 'New Location',
        onClose: closeModal,
        onConfirm: updateListField('locations'),
      });
    };
  const openPhoneForm =
    ({isDelete, isDuplicate, isEdit} = {}) =>
    (phone) => {
      if (isDelete) {
        return openModal({
          form: {initialValues: phone},
          header: 'Delete Phone',
          isAlert: true,
          onClose: closeModal,
          onConfirm: updateListField('phones', {isDelete: true}),
        });
      }

      if (isEdit) {
        return openModal({
          form: {fields: phoneFields, initialValues: phone},
          header: 'Edit Phone',
          onClose: closeModal,
          onConfirm: updateListField('phones', {isEdit: true}),
        });
      }

      return openModal({
        form: {
          fields: phoneFields,
          initialValues: isDuplicate ? phone : {show_on_organization: true},
        },
        header: 'New Phone',
        onClose: closeModal,
        onConfirm: updateListField('phones'),
      });
    };
  const openScheduleForm =
    ({isDelete, isDuplicate, isEdit} = {}) =>
    (schedule) => {
      if (isDelete) {
        return openModal({
          form: {initialValues: schedule},
          header: 'Delete Schedule',
          isAlert: true,
          onClose: closeModal,
          onConfirm: updateListField('schedules', {isDelete: true}),
        });
      }

      if (isEdit) {
        return openModal({
          form: {fields: scheduleFields, initialValues: schedule},
          header: 'Edit Schedule',
          onClose: closeModal,
          onConfirm: updateListField('schedules', {isEdit: true}),
        });
      }

      return openModal({
        form: {
          fields: scheduleFields,
          initialValues: isDuplicate ? schedule : {},
        },
        header: 'New Schedule',
        onClose: closeModal,
        onConfirm: updateListField('schedules'),
      });
    };

  const openSocialMediaForm = ({isEdit = false, isDelete = false, profile = {}}) => {
    return openModal({
      form: {
        fields: isDelete ? null : socialMediaFields,
        initialValues: profile,
      },
      header: isEdit ? `Edit Social Media profile`: isDelete ? `Delete Social Media profile` : `New Social Media Profile`,
      isAlert: isDelete,
      onClose: closeModal,
      onConfirm: updateListField('social_media', {isEdit, isDelete}),
    });
  };

  const primaryLocation =
    (locations && locations.find((it) => it.is_primary)) ??
    (locations && locations[0]) ??
    null;

  const openNotesEdit = () =>
    openModal({
      form: {fields: [{key: 'notes', label: 'Notes', type: 'textarea'}], initialValues: notes},
      header: 'Edit Notes',
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError, values}) => {
        const notes_data = {...values, updated_at: Date.now()};
        updateFields({setLoading, setSuccess, setError, values: {notes: notes_data}});
      }
    });
  
  if (loading) {
    return <Loading />;
  }

  if (!organization) {
    return <NotFound />;
  }

  return (
    <>
      <Helmet title={name} />
      {!is_published && (
        <Alert title="This organization is unpublished" type="warning" />
      )}
      <Box float="right">
        <DropdownButton
          buttonText="Select a language"
          items={[
            {
              text: 'English',
            },
            {
              text: 'Español',
            },
          ]}
        />
        <DropdownButton
          buttonText="View on Catalog"
          items={[
            {
              href: `${catalogUrl}/en_US/resource/${slug}`,
              text: 'US',
            },
            {
              href: `${catalogUrl}/en_CA/resource/${slug}`,
              text: 'Canada',
            },
            {
              href: `${catalogUrl}/en_MX/resource/${slug}#googtrans(es)`,
              text: 'MX',
            },
          ]}
        />
        <DropdownButton
          buttonText="More"
          items={[
            {
              onClick: openOrgVerify,
              text: 'Mark Information Verified',
            },
            {onClick: openOrgDuplicate, text: 'Duplicate'},
            ...(user.isAdminDataManager
              ? [{onClick: openOrgDelete, text: 'Delete'}]
              : []),
          ]}
        />
      </Box>
      <Breadcrumbs organization={organization} />
      <Title>{name}</Title>
      <Stack marginTop={6}>
        <Tabs variant="enclosed">
          <TabList>
            <Tab style={{boxShadow: 'none'}}>General</Tab>
            <Tab style={{boxShadow: 'none'}}>Photos</Tab>
          </TabList>
          <TabPanels>
            <TabPanel mt={5}>
              <div>
                <Box {...buttonGroupProps}>
                  <Button onClick={openDetailsEdit}>Edit Details</Button>
                </Box>
                <SectionTitle>General Details</SectionTitle>
                <KeyValueTable
                  rows={[
                    {key: 'ID', value: _id},
                    {key: 'Website', value: website},
                    {key: 'Website_ES', value: website_ES},
                    {key: 'Description', value: description},
                    {key: 'Description_ES', value: description_ES},
                    {key: 'Alert Message', value: alert_message},
                    {key: 'Alert Message_ES', value: alert_message_ES},
                    {key: 'Slug', value: slug},
                    {key: 'Slug_ES', value: slug_ES},
                    {key: 'Is Published', value: is_published},
                    {key: 'Last Verified', value: verified_at},
                    {key: 'Updated At', value: updated_at},
                    {key: 'Created At', value: created_at},
                  ]}
                />
                <Container>
                  <SectionTitle>Associated Affiliates</SectionTitle>
                  <Table
                    headers={[{key: 'email', label: 'Email'}]}
                    rows={owners}
                  />
                </Container>
                <Container>
                  <Box {...buttonGroupProps}>
                    <Button onClick={openNewService}>New Service</Button>
                  </Box>
                  <SectionTitle>Services</SectionTitle>
                  <Table
                    actions={[{label: 'View', onClick: goToServicePage}]}
                    getRowLink={(service) =>
                      `${orgPath}/services/${service._id}`
                    }
                    headers={[
                      {key: 'name', label: 'Name'},
                      {key: 'updated_at', label: 'Last Updated'},
                    ]}
                    rows={services}
                  />
                </Container>
                <Container>
                  <Box {...buttonGroupProps}>
                    <Button onClick={openLocationForm()}>New Address</Button>
                  </Box>
                  <SectionTitle>Addresses</SectionTitle>
                  <Table
                    headers={locationFields}
                    rows={locations}
                    actions={[
                      {
                        label: 'Edit',
                        onClick: openLocationForm({isEdit: true}),
                      },
                      {
                        label: 'Duplicate',
                        onClick: openLocationForm({isDuplicate: true}),
                      },
                      {
                        label: 'Delete',
                        onClick: openLocationForm({isDelete: true}),
                      },
                    ]}
                  />
                </Container>
                <Container>
                  <Box {...buttonGroupProps}>
                    <Button onClick={openScheduleForm()}>New Schedule</Button>
                  </Box>
                  <SectionTitle>Schedules</SectionTitle>
                  <Table
                    headers={scheduleHeaders}
                    rows={schedules}
                    actions={[
                      {
                        label: 'Edit',
                        onClick: openScheduleForm({isEdit: true}),
                      },
                      {
                        label: 'Duplicate',
                        onClick: openScheduleForm({isDuplicate: true}),
                      },
                      {
                        label: 'Delete',
                        onClick: openScheduleForm({isDelete: true}),
                      },
                    ]}
                  />
                </Container>
                <Container>
                  <Box {...buttonGroupProps}>
                    <Button onClick={openEmailForm()}>New Email</Button>
                  </Box>
                  <SectionTitle>Emails</SectionTitle>
                  <Table
                    headers={emailFields}
                    rows={emails}
                    actions={[
                      {label: 'Edit', onClick: openEmailForm({isEdit: true})},
                      {
                        label: 'Duplicate',
                        onClick: openEmailForm({isDuplicate: true}),
                      },
                      {
                        label: 'Delete',
                        onClick: openEmailForm({isDelete: true}),
                      },
                    ]}
                  />
                </Container>
                <Container>
                  <Box {...buttonGroupProps}>
                    <Button onClick={openPhoneForm()}>New Phone</Button>
                  </Box>
                  <SectionTitle>Phones</SectionTitle>
                  <Table
                    headers={phoneFields}
                    rows={phones}
                    actions={[
                      {label: 'Edit', onClick: openPhoneForm({isEdit: true})},
                      {
                        label: 'Duplicate',
                        onClick: openPhoneForm({isDuplicate: true}),
                      },
                      {
                        label: 'Delete',
                        onClick: openPhoneForm({isDelete: true}),
                      },
                    ]}
                  />
                </Container>
                <Container>
                  <Box {...buttonGroupProps}>
                    <Button onClick={() => openSocialMediaForm({})}>
                      New Social Media Profile
                    </Button>
                  </Box>
                  <SectionTitle>Social Media</SectionTitle>
                  <Table
                    headers={socialMediaFields}
                    rows={social_media}
                    actions={[
                      {
                        label: 'Edit',
                        onClick: (profile) => openSocialMediaForm({isEdit:true, profile}),
                      },
                      {label: 'Delete', onClick: (profile) => openSocialMediaForm({isDelete: true, profile})},
                    ]}
                  />
                </Container>
                <Container>
                  <Box {...buttonGroupProps}>
                    <Button onClick={openCoverageEdit}>Edit Coverage</Button>
                  </Box>
                  <SectionTitle>Service Area Coverage</SectionTitle>
                  <ListServiceArea properties={properties} />
                </Container>=
              <Container>
                <Box {...buttonGroupProps}>
                  <Button onClick={openNotesEdit}>Edit Notes</Button>
                </Box>
                <SectionTitle>Notes</SectionTitle>
                <Grid templateColumns="150px 1fr">
                  <GridItem rowSpan="1" colSpan="2">
                    <Box m={4}>
                      <Text>{notes?.notes}</Text>
                    </Box>
                  </GridItem>
                  <GridItem rowSpan="1" colSpan="1">
                    <Text>Updated At</Text>
                  </GridItem>
                  <GridItem rowSpan="1" colSpan="1">
                    <Text>{notes?.updated_at}</Text>
                  </GridItem>
                </Grid>
              </Container>
              </div>
            </TabPanel>
            <TabPanel mt={5}>
              <Box>
                <FormPhotos
                  organizationId={orgId}
                  location={primaryLocation}
                  photos={photos}
                  name={name}
                  venue_id={venue_id}
                />
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </>
  );
};

Organization.propTypes = {
  match: PropTypes.shape(),
};

export default Organization;
