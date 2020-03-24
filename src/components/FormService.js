import _map from 'lodash/map';
import {useFormik} from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
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

import Alert from './Alert';
import FormField from './FormField';
import {LoadingModal} from './Loading';
import ServiceAreaCoverage from './ServiceAreaCoverage';
import {Container, SectionTitle, Title} from './styles';
import {
  additionalInformationProperties,
  communityProperties,
  costProperties,
  eligibilityRequirementProperties,
  languageProperties,
  serviceAreaProperties,
  tags
} from '../utils/formsHeaders';
import {getServiceInitialValues, newSchedule} from '../utils/forms';
import {useStatus} from '../utils/hooks';

const generalServiceDetailsFields = [
  {key: 'name', label: 'Name'},
  {key: 'description', label: 'Description', type: 'textarea'},
  {key: 'access_instructions', label: 'Access Instructions', type: 'textarea'},
  {key: 'is_published', label: 'Is Published', type: 'checkbox'}
];

const scheduleFields = [
  {key: 'start_time', label: 'Start Time'},
  {key: 'end_time', label: 'End Time'}
];

// TODO: On save, a summary of changes for the log if edit
// TODO: On save, warning about fields such as is_closed, is_published, etc
/**
 * NOTE: By default add the properties “community-asylum-seeker” (value = true)
 * and “community-lgbt” on every service
 * Remove the need for Data Managers to enter “community-asylum-seeker” (value = true)
 * and “community-lgbt” on every organization + service page in order to appear in the live AC Catalog
 */

const ServiceForm = props => {
  const {isEdit, onCancel, onConfirm, service, title} = props;
  const initialValues = getServiceInitialValues(service);
  const formik = useFormik({initialValues});
  const {isError, isLoading, setError, setLoading, setSuccess} = useStatus();
  const name = props?.service?.name;
  const onSave = () =>
    onConfirm({setLoading, setSuccess, setError, values: formik?.values || {}});
  const addSchedule = () => {
    formik.setFieldValue('schedule', newSchedule);
  };
  const removeScedule = () => {
    formik.setFieldValue('schedule', null);
  };

  return (
    <>
      <LoadingModal isOpen={isLoading} />
      {isError && (
        <Alert
          description="Please try again."
          title="An error occured"
          type="error"
        />
      )}
      <Title>
        {title}
        {name && ' - '}
        {name}
      </Title>
      <Tabs>
        <TabList>
          <Tab>Service Details</Tab>
          <Tab>Properties</Tab>
          <Tab>Tags</Tab>
          <Tab>Schedules</Tab>
        </TabList>
        <TabPanels>
          <TabPanel marginTop={2}>
            <Stack spacing={4}>
              <Container>
                <SectionTitle>General Details</SectionTitle>
                <Stack spacing={4}>
                  {generalServiceDetailsFields.map(({key, ...rest}) => (
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
                <SectionTitle>Locations</SectionTitle>
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
            </Stack>
          </TabPanel>
          <TabPanel marginTop={2}>
            <Stack space={4}>
              <Container>
                <SectionTitle>Cost Properties</SectionTitle>
                <Stack space={4}>
                  {costProperties.map(({key, ...rest}) => (
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
                <SectionTitle>Community Properties</SectionTitle>
                <Stack space={4}>
                  {communityProperties.map(({key, ...rest}) => (
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
                <SectionTitle>
                  Eligibility / Requirement Properties
                </SectionTitle>
                <Stack space={4}>
                  {eligibilityRequirementProperties.map(({key, ...rest}) => (
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
                <SectionTitle>Language Properties</SectionTitle>
                <Stack space={4}>
                  {languageProperties.map(({key, ...rest}) => (
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
                <SectionTitle>Service Area Properties</SectionTitle>
                <Stack space={4}>
                  <ServiceAreaCoverage />
                  {serviceAreaProperties.map(({key, ...rest}) => (
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
                <SectionTitle>Additional Information Properties</SectionTitle>
                <Stack space={4}>
                  {additionalInformationProperties.map(({key, ...rest}) => (
                    <FormField
                      key={key}
                      fieldKey={key}
                      formik={formik}
                      {...rest}
                    />
                  ))}
                </Stack>
              </Container>
            </Stack>
          </TabPanel>
          <TabPanel marginTop={2}>
            <Stack space={4}>
              {tags.map(({key: tagKey, ...restTag}, tagIndex) => (
                <Container key={tagIndex}>
                  <SectionTitle>{restTag.label}</SectionTitle>
                  <Stack space={4}>
                    {restTag.subcategories ? (
                      restTag.subcategories.map(({key, ...rest}) => (
                        <FormField
                          key={key}
                          fieldKey={key}
                          formik={formik}
                          type="checkbox"
                          {...rest}
                        />
                      ))
                    ) : (
                      <FormField
                        fieldKey={tagKey}
                        formik={formik}
                        type="checkbox"
                        {...restTag}
                      />
                    )}
                  </Stack>
                </Container>
              ))}
            </Stack>
          </TabPanel>
          <TabPanel marginTop={2}>
            <Box marginBottom={2} textAlign="right">
              {formik?.values?.schedule ? (
                <Button onClick={removeScedule}>Remove Custom Schedule</Button>
              ) : (
                <Button onClick={addSchedule}>Add Custom Schedule</Button>
              )}
            </Box>
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
        </TabPanels>
      </Tabs>
      <Box marginTop={4}>
        <Button isLoading={isLoading} onClick={onSave} mr={2}>
          {isEdit ? 'Update Service' : 'Save Service'}
        </Button>
        <Button disabled={isLoading} onClick={onCancel} variant="ghost">
          Cancel
        </Button>
      </Box>
    </>
  );
};

ServiceForm.propTypes = {
  isDuplicate: PropTypes.bool,
  isEdit: PropTypes.bool,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  service: PropTypes.shape(),
  title: PropTypes.string
};

export default ServiceForm;
