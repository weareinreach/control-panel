import {useFormik} from 'formik';
import _map from 'lodash/map';
import _memoize from 'lodash/memoize';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {
  Box,
  Button,
  Divider,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/core';

import Alert from './Alert';
import Breadcrumbs from './Breadcrumbs';
import FormField from './FormField';
import {LoadingModal} from './Loading';
import ServiceAreaCoverage from './ServiceAreaCoverage';
import Table from './Table';
import {Container, SectionTitle, Title} from './styles';
import {
  accessInstructionFields,
  emailFields,
  locationFields,
  phoneFields,
  scheduleFields,
  serviceDetailsFields,
} from '../data/fields.json';
import {
  additionalInformationProperties,
  communityProperties,
  costProperties,
  eligibilityRequirementProperties,
  languageProperties,
} from '../data/properties.json';
import tags from '../data/tags.json';
import {formatServiceInput, getServiceInitialValues} from '../utils/forms';
import {useStatus} from '../utils/hooks';

const findItem = _memoize((list, _id) => list.find((item) => item._id === _id));
const countryLabels = {
  canada: 'Canada',
  mexico: 'Mexico',
  united_states: 'United States',
};

const FormService = (props) => {
  const {isEdit, onCancel, onConfirm, service, title} = props;
  const {isError, isLoading, setError, setLoading, setSuccess} = useStatus();
  const initialValues = getServiceInitialValues(service || {});
  const formik = useFormik({initialValues});
  const onSave = () =>
    onConfirm({
      setLoading,
      setSuccess,
      setError,
      values: formatServiceInput(formik?.values),
    });
  const createFieldItem = (field) => {
    const list = formik?.values?.[field] || [];

    list.push({});
    formik.setFieldValue(field, list);
  };
  const duplicateFieldItem = (field, index) => {
    const list = formik?.values?.[field] || [];
    const ListItems = {
      ...list?.[index],
      name: `Duplicate of ${list?.[index]?.name}`,
    };
    const newList = [...list, ListItems];

    formik.setFieldValue(field, newList);
  };
  const deleteFieldItem = (field, index) => {
    const list = formik?.values?.[field] || [];

    list.splice(index, 1);
    formik.setFieldValue(field, list);
  };
  const updateField = (field) => (value) => {
    formik.setFieldValue(field, value);
  };

  console.log('render', initialValues, formik?.values);

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
      <Breadcrumbs organization={service?.organization} service={service} />
      <Title>
        {title}
        {service?.name && ' - '}
        {service?.name}
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
                  {serviceDetailsFields.map(({key, ...rest}) => (
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
                  {service?.organization?.locations.map(({_id, name}) => (
                    <option key={_id}>{name || 'Location Name'}</option>
                  ))}
                </Select>
                {formik?.values?.location_id && (
                  <Table
                    headers={locationFields}
                    rows={[
                      findItem(
                        service?.organization?.locations,
                        formik?.values?.location_id
                      ),
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
                  {service?.organization?.schedules.map(({_id, name}) => (
                    <option key={_id}>{name || 'Schedule Name'}</option>
                  ))}
                </Select>
                {formik?.values?.schedule_id && (
                  <Table
                    headers={scheduleFields}
                    rows={[
                      findItem(
                        service?.organization?.schedules,
                        formik?.values?.schedule_id
                      ),
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
                  {service?.organization?.emails.map(({_id, email}) => (
                    <option key={_id}>{email || 'Email Address'}</option>
                  ))}
                </Select>
                {formik?.values?.email_id && (
                  <Table
                    headers={emailFields}
                    rows={[
                      findItem(
                        service?.organization?.emails,
                        formik?.values?.email_id
                      ),
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
                  {service?.organization?.phones.map(({_id, phone_type}) => (
                    <option key={_id}>{phone_type || 'Phone Type'}</option>
                  ))}
                </Select>
                {formik?.values?.phone_id && (
                  <Table
                    headers={phoneFields}
                    rows={[
                      findItem(
                        service?.organization?.phones,
                        formik?.values?.phone_id
                      ),
                    ]}
                  />
                )}
              </Container>
            </Stack>
          </TabPanel>
          <TabPanel marginTop={2}>
            <Button
              onClick={() => createFieldItem('access_instructions')}
              marginBottom={2}
            >
              New Instruction
            </Button>
            {formik?.values?.access_instructions?.map((item, itemIndex) => {
              return (
                <Container key={itemIndex} marginBottom={4}>
                  <Stack spacing={4}>
                    {accessInstructionFields?.map(({key, ...rest}) => (
                      <FormField
                        key={`access_instructions[${itemIndex}][${key}]`}
                        fieldKey={`access_instructions[${itemIndex}][${key}]`}
                        formik={formik}
                        {...rest}
                      />
                    ))}
                    <Box>
                      <Button
                        onClick={() =>
                          duplicateFieldItem('access_instructions', itemIndex)
                        }
                        mr={2}
                        size="xs"
                      >
                        Duplicate
                      </Button>
                      <Button
                        onClick={() =>
                          deleteFieldItem('access_instructions', itemIndex)
                        }
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
            <Stack space={4}>
              <Container>
                <SectionTitle>Cost Properties</SectionTitle>
                <Stack space={4}>
                  {costProperties.map(({key, ...rest}) => (
                    <FormField
                      key={key}
                      fieldKey={`properties.${key}`}
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
                      fieldKey={`properties.${key}`}
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
                      fieldKey={`properties.${key}`}
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
                      fieldKey={`properties.${key}`}
                      formik={formik}
                      {...rest}
                    />
                  ))}
                </Stack>
              </Container>
              <Container>
                <SectionTitle>Service Area Properties</SectionTitle>
                <Stack space={4}>
                  <ServiceAreaCoverage
                    handleUpdate={updateField('properties')}
                    properties={formik?.values?.properties}
                  />
                </Stack>
              </Container>
              <Container>
                <SectionTitle>Additional Information Properties</SectionTitle>
                <Stack space={4}>
                  {additionalInformationProperties.map(({key, ...rest}) => (
                    <FormField
                      key={key}
                      fieldKey={`properties.${key}`}
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
              {_map(tags, (categories, tagCountry) => (
                <Container key={tagCountry}>
                  <SectionTitle>{countryLabels[tagCountry]}</SectionTitle>
                  {_map(categories, (subcategories, category, tagIndex) => (
                    <Fragment key={category}>
                      <Text marginTop={4}>
                        <strong>{category}</strong>
                      </Text>
                      <Divider marginBottom={4} />
                      <Stack space={4}>
                        {subcategories.length > 0 ? (
                          subcategories.map((subCatgory) => (
                            <FormField
                              key={subCatgory}
                              fieldKey={`tags.${category}.${subCatgory}`}
                              formik={formik}
                              label={subCatgory}
                              type="checkbox"
                            />
                          ))
                        ) : (
                          <FormField
                            fieldKey={`tags.${category}`}
                            formik={formik}
                            label={category}
                            type="checkbox"
                          />
                        )}
                      </Stack>
                    </Fragment>
                  ))}
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
  title: PropTypes.string,
};

export default FormService;
