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
  generalServiceDetailsFields,
  languageProperties,
  scheduleFields,
  tags
} from '../utils/formsHeaders';
import {getServiceInitialValues, newSchedule} from '../utils/forms';
import {useStatus} from '../utils/hooks';

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
          <Tab>Access Instructions</Tab>
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
                <p>{JSON.stringify(service?.organization?.locations)}</p>
              </Container>
              <Container>
                <SectionTitle>Emails</SectionTitle>
                <p>{JSON.stringify(service?.organization?.emails)}</p>
              </Container>
              <Container>
                <SectionTitle>Phones</SectionTitle>
                <p>{JSON.stringify(service?.organization?.phones)}</p>
              </Container>
            </Stack>
          </TabPanel>
          <TabPanel marginTop={2}>
            <Stack spacing={4}>
              <Container>
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
            <Container marginBottom={4}>
              <Stack spacing={4}>
                {scheduleFields?.map(({key, ...rest}) => (
                  <FormField
                    key={`schedule[${key}]`}
                    fieldKey={`schedule[${key}]`}
                    formik={formik}
                    {...rest}
                  />
                ))}
              </Stack>
            </Container>
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
