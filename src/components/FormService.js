import {useFormik} from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Box,
  Button,
  Select,
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
import Table from './Table';
import {Container, SectionTitle, Title} from './styles';
import {
  additionalInformationProperties,
  communityProperties,
  costProperties,
  eligibilityRequirementProperties,
  emailFields,
  generalServiceDetailsFields,
  languageProperties,
  locationFields,
  phoneFields,
  scheduleFields,
  tags
} from '../utils/fields';
import {getServiceInitialValues} from '../utils/forms';
import {useStatus} from '../utils/hooks';

const findItem = (list, _id) => list.find(item => item._id === _id);

const FormService = props => {
  const {isEdit, onCancel, onConfirm, service, title} = props;
  const initialValues = getServiceInitialValues(service);
  const formik = useFormik({initialValues});
  const {isError, isLoading, setError, setLoading, setSuccess} = useStatus();
  const name = props?.service?.name;
  const onSave = () =>
    onConfirm({setLoading, setSuccess, setError, values: formik?.values || {}});

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
                <Select
                  {...(formik?.getFieldProps('location_id') || {})}
                  placeholder="Select a location from the organization"
                >
                  {service?.organization?.locations.map(({_id}) => (
                    <option key={_id}>{_id}</option>
                  ))}
                </Select>
                {formik?.values?.location_id && (
                  <Table
                    headers={locationFields}
                    rows={[
                      findItem(
                        service?.organization?.locations,
                        formik?.values?.location_id
                      )
                    ]}
                  />
                )}
              </Container>
              <Container>
                <SectionTitle>Schedules</SectionTitle>
                <Select
                  {...(formik?.getFieldProps('schedule_id') || {})}
                  placeholder="Select a schedule from the organization"
                >
                  {service?.organization?.schedules.map(({_id}) => (
                    <option key={_id}>{_id}</option>
                  ))}
                </Select>
                {formik?.values?.schedule_id && (
                  <Table
                    headers={scheduleFields}
                    rows={[
                      findItem(
                        service?.organization?.schedules,
                        formik?.values?.schedule_id
                      )
                    ]}
                  />
                )}
              </Container>
              <Container>
                <SectionTitle>Emails</SectionTitle>
                <Select
                  {...(formik?.getFieldProps('email_id') || {})}
                  placeholder="Select an email from the organization"
                >
                  {service?.organization?.emails.map(({_id}) => (
                    <option key={_id}>{_id}</option>
                  ))}
                </Select>
                {formik?.values?.email_id && (
                  <Table
                    headers={emailFields}
                    rows={[
                      findItem(
                        service?.organization?.emails,
                        formik?.values?.email_id
                      )
                    ]}
                  />
                )}
              </Container>
              <Container>
                <SectionTitle>Phones</SectionTitle>
                <Select
                  {...(formik?.getFieldProps('phone_id') || {})}
                  placeholder="Select a phone from the organization"
                >
                  {service?.organization?.phones.map(({_id}) => (
                    <option key={_id}>{_id}</option>
                  ))}
                </Select>
                {formik?.values?.phone_id && (
                  <Table
                    headers={phoneFields}
                    rows={[
                      findItem(
                        service?.organization?.phones,
                        formik?.values?.phone_id
                      )
                    ]}
                  />
                )}
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

FormService.propTypes = {
  isDuplicate: PropTypes.bool,
  isEdit: PropTypes.bool,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  service: PropTypes.shape(),
  title: PropTypes.string
};

export default FormService;
