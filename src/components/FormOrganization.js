import {useFormik} from 'formik';
import _map from 'lodash/map';
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
import {getOrgInitialValues} from '../utils/forms';
import {
  generalDetailsFields,
  emailFields,
  locationFields,
  phoneFields,
  scheduleFields
} from '../utils/formsHeaders';
import {useStatus} from '../utils/hooks';

// TODO: On save, a summary of changes for the log if edit
// TODO: On save, warning about fields such as is_closed, is_published, etc

const OrganizationForm = props => {
  const {isEdit, onCancel, onConfirm, organization, title} = props;
  const initialValues = getOrgInitialValues(organization);
  const formik = useFormik({initialValues});
  const {isError, isLoading, setError, setLoading, setSuccess} = useStatus();
  const name = props?.organization?.name;
  const onSave = () =>
    onConfirm({setLoading, setSuccess, setError, values: formik?.values || {}});
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
          <Tab>Organization Details</Tab>
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
                <ServiceAreaCoverage />
              </Container>
            </Stack>
          </TabPanel>
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
                    {phoneFields?.map(({key, ...rest}) => (
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
        <Button isLoading={isLoading} onClick={onSave} mr={2}>
          {isEdit ? 'Update Organization' : 'Save Organization'}
        </Button>
        <Button disabled={isLoading} onClick={onCancel} variant="ghost">
          Cancel
        </Button>
      </Box>
    </>
  );
};

OrganizationForm.propTypes = {
  isDuplicate: PropTypes.bool,
  isEdit: PropTypes.bool,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  organization: PropTypes.shape(),
  title: PropTypes.string
};

export default OrganizationForm;
