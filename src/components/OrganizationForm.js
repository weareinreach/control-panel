import {useFormik} from 'formik';
import _map from 'lodash/map';
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
  Tabs
} from '@chakra-ui/core';

import {ContextFormModal} from '../components/ContextFormModal';
import FormField from '../components/FormField';
import {Container, SectionTitle, Title} from '../components/styles';

/**
 * TODO: Maybe for website
  <InputGroup size="sm">
    <InputLeftAddon children="https://" />
    <Input rounded="0" placeholder="mysite" />
    <InputRightAddon children=".com" />
  </InputGroup>
*/

const generalDetailsFields = [
  {key: 'name', label: 'Name'},
  {key: 'website', label: 'Website'},
  {key: 'description', label: 'Description', type: 'textarea'},
  {key: 'alert_message', label: 'Alert Message', type: 'textarea'},
  {key: 'is_at_capacity', label: 'Is At Capacity', type: 'checkbox'},
  {key: 'is_published', label: 'Is Published', type: 'checkbox'}
];

const emailFields = [
  {key: 'email', label: 'Email'},
  {key: 'title', label: 'Title'},
  {key: 'first_name', label: 'First Name'},
  {key: 'last_name', label: 'Last Name'},
  {key: 'show_on_org', label: 'Show on Org', type: 'checkbox'},
  {key: 'is_primary', label: 'Is Primary', type: 'checkbox'}
];

const locationFields = [
  {key: 'name', label: 'Name'},
  {key: 'address', label: 'Address'},
  {key: 'city', label: 'City'},
  {key: 'state', label: 'State'},
  {key: 'country', label: 'Country'},
  {key: 'zip', label: 'Zipcode'},
  {key: 'is_primary', label: 'Is Primary', type: 'checkbox'}
];

const phonesFields = [
  {key: 'digits', label: 'Digits'},
  {key: 'is_primary', label: 'Is Primary', type: 'checkbox'}
];

const scheduleFields = [
  {key: 'start_time', label: 'Start Time'},
  {key: 'end_time', label: 'End Time'}
];

const serviceFields = [
  {key: 'name', label: 'Name'},
  {key: 'description', label: 'Description', type: 'textarea'},
  {key: 'access_instructions', label: 'Access Instructions', type: 'textarea'},
  {key: 'is_appointment', label: 'Is Appointment', type: 'checkbox'},
  {key: 'is_at_capacity', label: 'Is At Capacity', type: 'checkbox'},
  {key: 'is_published', label: 'Is Published', type: 'checkbox'}
];

const newSchedule = {
  sunday: {start_time: 'a', end_time: 'b'},
  monday: {start_time: 'a', end_time: 'b'},
  tuesday: {start_time: 'a', end_time: 'b'},
  wednesday: {start_time: 'a', end_time: 'b'},
  thursday: {start_time: 'a', end_time: 'b'},
  friday: {start_time: 'a', end_time: 'b'},
  saturday: {start_time: 'a', end_time: 'b'}
};

const getInitialValues = initialValues => {
  return {
    alert_message: initialValues?.alert_message || '',
    description: initialValues?.description || '',
    emails: initialValues?.emails || [],
    is_at_capacity: initialValues?.is_at_capacity || false,
    is_published: initialValues?.is_published || false,
    locations: initialValues?.locations || [],
    name: initialValues?.name || '',
    phones: initialValues?.phones || [],
    schedule: initialValues?.schedule || newSchedule,
    services: initialValues?.services || [],
    slug: initialValues?.slug || '',
    website: initialValues?.website || ''
  };
};

const OrganizationForm = props => {
  const {isEdit, onCancel, onConfirm} = props;
  const {closeModal, openModal} = useContext(ContextFormModal);
  const initialValues = getInitialValues(props?.initialValues);
  const formik = useFormik({initialValues});
  const openSaveModal = () =>
    // TODO: a summary of changes for the log if edit
    // TODO: warning about fields such as is_at_capacity, is_closed, is_published
    openModal({
      header: `Save organization`,
      onClose: closeModal,
      onConfirm,
      values: formik?.values || {}
    });
  const createFieldItem = field => {
    const list = formik?.values?.[field] || [];

    list.push({});
    formik.setFieldValue(field, list);
  };
  const duplicateFieldItem = (field, index) => {
    const list = formik?.values?.[field] || [];
    const listItem = {
      ...list?.[index],
      name: `Duplicate of ${list?.[index]?.name}`
    };
    const newList = [...list, listItem];

    formik.setFieldValue(field, newList);
  };
  const deleteFieldItem = (field, index) => {
    const list = formik?.values?.[field] || [];

    list.splice(index, 1);
    formik.setFieldValue(field, list);
  };

  return (
    <>
      {isEdit ? (
        <Title>Edit {props?.initialValues?.name || 'Organization'}</Title>
      ) : (
        <Title>New Organization</Title>
      )}
      <Tabs>
        <TabList>
          <Tab>Organization Details</Tab>
          {/* <Tab>Services</Tab> */}
          <Tab>Addresses</Tab>
          <Tab>Schedule</Tab>
          <Tab>Emails</Tab>
          <Tab>Phones</Tab>
        </TabList>
        <TabPanels>
          <TabPanel marginTop={2}>
            <Stack spacing={4}>
              <Container>
                <SectionTitle>General Details</SectionTitle>
                <Stack spacing={4}>
                  {generalDetailsFields.map(({key, ...rest}) => (
                    <FormField
                      key={key}
                      fieldKey={key}
                      formik={formik}
                      {...rest}
                    />
                  ))}
                </Stack>
              </Container>
              <Container>
                <SectionTitle>Service Area Coverage</SectionTitle>
                {/* Dropdown */}
              </Container>
            </Stack>
          </TabPanel>
          {/* <TabPanel marginTop={2}>
            <Button
              onClick={() => createFieldItem('services')}
              marginBottom={2}
            >
              New Service
            </Button>
            {formik?.values?.services?.map((service, serviceIndex) => {
              const handleDelete = () =>
                deleteFieldItem('services', serviceIndex);
              const handleDuplicate = () =>
                duplicateFieldItem('services', serviceIndex);

              return (
                <Container key={serviceIndex} marginBottom={4}>
                  <Stack spacing={4}>
                    {serviceFields.map(({key, ...rest}) => {
                      return (
                        <FormField
                          key={`services[${serviceIndex}][${key}]`}
                          fieldKey={`services[${serviceIndex}][${key}]`}
                          formik={formik}
                          {...rest}
                        />
                      );
                    })}
                    <SectionTitle>Properties</SectionTitle>
                    <Tabs>
                      <TabList>
                        <Tab>Cost</Tab>
                        <Tab>Community</Tab>
                        <Tab>Eligibility / Requirement</Tab>
                        <Tab>Language</Tab>
                        <Tab>Service Area</Tab>
                        <Tab>Additional Information</Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel>
                          <p>Cost Properties</p>
                        </TabPanel>
                        <TabPanel>
                          <p>Community Properties</p>
                        </TabPanel>
                        <TabPanel>
                          <p>Eligibility / Requirement Properties</p>
                        </TabPanel>
                        <TabPanel>
                          <p>Language Properties</p>
                        </TabPanel>
                        <TabPanel>
                          <p>Service Area Properties</p>
                        </TabPanel>
                        <TabPanel>
                          <p>Additional Information Properties</p>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                    <SectionTitle>Tags</SectionTitle>
                    <Tabs>
                      <TabList>
                        <Tab>Community Support</Tab>
                        <Tab>Computers and Internet</Tab>
                        <Tab>Education and Employment</Tab>
                        <Tab>Food</Tab>
                        <Tab>Housing</Tab>
                        <Tab>Hygiene and Clothing</Tab>
                        <Tab>Legal</Tab>
                        <Tab>Mail</Tab>
                        <Tab>Medical</Tab>
                        <Tab>Mental Health</Tab>
                        <Tab>Sports and Entertainment</Tab>
                        <Tab>Translation and Interpretation</Tab>
                        <Tab>Transportation</Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel>
                          <p>Community Support</p>
                        </TabPanel>
                        <TabPanel>
                          <p>Computers and Internet</p>
                        </TabPanel>
                        <TabPanel>
                          <p>Education and Employment</p>
                        </TabPanel>
                        <TabPanel>
                          <p>Food</p>
                        </TabPanel>
                        <TabPanel>
                          <p>Housing</p>
                        </TabPanel>
                        <TabPanel>
                          <p>Hygiene and Clothing</p>
                        </TabPanel>
                        <TabPanel>
                          <p>Legal</p>
                        </TabPanel>
                        <TabPanel>
                          <p>Mail</p>
                        </TabPanel>
                        <TabPanel>
                          <p>Medical</p>
                        </TabPanel>
                        <TabPanel>
                          <p>Mental Health</p>
                        </TabPanel>
                        <TabPanel>
                          <p>Sports and Entertainment</p>
                        </TabPanel>
                        <TabPanel>
                          <p>Translation and Interpretation</p>
                        </TabPanel>
                        <TabPanel>
                          <p>Transportation</p>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                    <Box>
                      <Button onClick={handleDuplicate} mr={2} size="xs">
                        Duplicate
                      </Button>
                      <Button
                        onClick={handleDelete}
                        size="xs"
                        variantColor="red"
                      >
                        Delete
                      </Button>
                    </Box>
                  </Stack>
                </Container>
              );
            })}
          </TabPanel> */}
          <TabPanel marginTop={2}>
            <Button
              onClick={() => createFieldItem('locations')}
              marginBottom={2}
            >
              New Location
            </Button>
            {formik?.values?.locations?.map((item, itemIndex) => {
              return (
                <Container key={itemIndex} marginBottom={4}>
                  <Stack spacing={4}>
                    {locationFields?.map(({key, ...rest}) => (
                      <FormField
                        key={`locations[${itemIndex}][${key}]`}
                        fieldKey={`locations[${itemIndex}][${key}]`}
                        formik={formik}
                        {...rest}
                      />
                    ))}
                    <Box>
                      <Button
                        onClick={() =>
                          duplicateFieldItem('locations', itemIndex)
                        }
                        mr={2}
                        size="xs"
                      >
                        Duplicate
                      </Button>
                      <Button
                        onClick={() => deleteFieldItem('locations', itemIndex)}
                        size="xs"
                        variantColor="red"
                      >
                        Delete
                      </Button>
                    </Box>
                  </Stack>
                </Container>
              );
            })}
          </TabPanel>
          <TabPanel marginTop={2}>
            {_map(formik?.values?.schedule || [], (value, day) => {
              return (
                <Container key={day} marginBottom={4}>
                  <SectionTitle>{day}</SectionTitle>
                  <Stack spacing={4}>
                    {scheduleFields?.map(({key, ...rest}) => (
                      <FormField
                        key={`schedule[${day}][${key}]`}
                        fieldKey={`schedule[${day}][${key}]`}
                        formik={formik}
                        {...rest}
                      />
                    ))}
                  </Stack>
                </Container>
              );
            })}
          </TabPanel>
          <TabPanel marginTop={2}>
            <Button onClick={() => createFieldItem('emails')} marginBottom={2}>
              New Email
            </Button>
            {formik?.values?.emails?.map((item, itemIndex) => {
              return (
                <Container key={itemIndex} marginBottom={4}>
                  <Stack spacing={4}>
                    {emailFields?.map(({key, ...rest}) => (
                      <FormField
                        key={`emails[${itemIndex}][${key}]`}
                        fieldKey={`emails[${itemIndex}][${key}]`}
                        formik={formik}
                        {...rest}
                      />
                    ))}
                    <Box>
                      <Button
                        onClick={() => duplicateFieldItem('emails', itemIndex)}
                        mr={2}
                        size="xs"
                      >
                        Duplicate
                      </Button>
                      <Button
                        onClick={() => deleteFieldItem('emails', itemIndex)}
                        size="xs"
                        variantColor="red"
                      >
                        Delete
                      </Button>
                    </Box>
                  </Stack>
                </Container>
              );
            })}
          </TabPanel>
          <TabPanel marginTop={2}>
            <Button onClick={() => createFieldItem('phones')} marginBottom={2}>
              New Phone
            </Button>
            {formik?.values?.phones?.map((item, itemIndex) => {
              return (
                <Container key={itemIndex} marginBottom={4}>
                  <Stack spacing={4}>
                    {phonesFields?.map(({key, ...rest}) => (
                      <FormField
                        key={`phones[${itemIndex}][${key}]`}
                        fieldKey={`phones[${itemIndex}][${key}]`}
                        formik={formik}
                        {...rest}
                      />
                    ))}
                    <Box>
                      <Button
                        onClick={() => duplicateFieldItem('phones', itemIndex)}
                        mr={2}
                        size="xs"
                      >
                        Duplicate
                      </Button>
                      <Button
                        onClick={() => deleteFieldItem('phones', itemIndex)}
                        size="xs"
                        variantColor="red"
                      >
                        Delete
                      </Button>
                    </Box>
                  </Stack>
                </Container>
              );
            })}
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Box marginTop={4}>
        <Button onClick={openSaveModal}>
          {isEdit ? 'Update Organization' : 'Save Organization'}
        </Button>
        <Button ml={2} onClick={onCancel} variant="ghost">
          Cancel
        </Button>
      </Box>
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
