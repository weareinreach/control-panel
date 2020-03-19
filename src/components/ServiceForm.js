import {delete as httpDelete, post} from 'axios';
import {useFormik} from 'formik';
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

import {ContextFormModal} from './ContextFormModal';
import DropdownButton from './DropdownButton';
import FormField from './FormField';
import {Container, SectionTitle, Title} from './styles';
import {getAPIUrl} from '../utils';
import {
  additionalInformationProperties,
  communityProperties,
  costProperties,
  eligibilityRequirementProperties,
  languageProperties,
  serviceAreaProperties,
  tags
} from '../utils/formsHeaders';
import {getServiceInitialValues} from '../utils/forms';

const generalDetailsFields = [
  {key: 'name', label: 'Name'},
  {key: 'description', label: 'Description', type: 'textarea'},
  {key: 'access_instructions', label: 'Access Instructions', type: 'textarea'},
  {key: 'is_published', label: 'Is Published', type: 'checkbox'}
];

const ServiceForm = props => {
  const {isEdit, onCancel, onConfirm, orgId, service} = props;
  const {closeModal, openModal} = useContext(ContextFormModal);
  const initialValues = getServiceInitialValues(props?.service);
  const {_id, ...serviceData} = service || {};
  const formik = useFormik({initialValues});
  const name = props?.service?.name;
  const orgPath = `/organizations/${orgId}`;
  const openModalDelete = () =>
    openModal({
      header: `Delete ${name}`,
      isAlert: true,
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setFail}) => {
        const url = `${getAPIUrl()}${orgPath}`;

        console.log('DELETE:', url);

        setLoading();
        httpDelete(url)
          .then(() => {
            setSuccess();
            window.location = '/organizations';
          })
          .catch(err => {
            setFail();
            console.error(err);
          });
      }
    });
  const openModalDuplicate = () =>
    openModal({
      form: {},
      header: `Duplicate ${name}`,
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setFail, values}) => {
        const url = `${getAPIUrl()}${orgPath}/services`;

        console.log('POST:', url);

        setLoading();
        post(url, serviceData)
          .then(({data}) => {
            setSuccess();
            window.location = orgPath;
          })
          .catch(err => {
            setFail();
            console.error(err);
          });
      }
    });
  const openSaveModal = () =>
    // TODO: a summary of changes for the log if edit
    // TODO: warning about fields such as is_at_capacity, is_closed, is_published
    /**
     * NOTE: By default add the properties “community-asylum-seeker” (value = true)
     * and “community-lgbt” on every service
     * Remove the need for Data Managers to enter “community-asylum-seeker” (value = true)
     * and “community-lgbt” on every organization + service page in order to appear in the live AC Catalog
     */
    openModal({
      header: `Save organization`,
      onClose: closeModal,
      onConfirm,
      values: formik?.values || {}
    });

  console.log('fValues', formik?.values);

  return (
    <>
      <Box float="right">
        <DropdownButton
          buttonText="More"
          items={[
            {onClick: openModalDuplicate, text: 'Duplicate'},
            {onClick: openModalDelete, text: 'Delete'}
          ]}
        />
      </Box>
      {isEdit ? (
        <Title>Edit Service - {name}</Title>
      ) : (
        <Title>New Service</Title>
      )}
      <Tabs defaultIndex={2}>
        <TabList>
          <Tab>Service Details</Tab>
          <Tab>Properties</Tab>
          <Tab>Tags</Tab>
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
                <SectionTitle>Locations</SectionTitle>
                {/* List, edit, add them */}
                {/* Use a toggle like system to hide them */}
              </Container>
              {/* <Container> */}
              {/* <SectionTitle>Schedules</SectionTitle> */}
              {/* List, edit, add them */}
              {/* Use a toggle like system to hide them */}
              {/* </Container> */}
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
        </TabPanels>
      </Tabs>
      <Box marginTop={4}>
        <Button onClick={openSaveModal} mr={2}>
          {isEdit ? 'Update Service' : 'Save Service'}
        </Button>
        <Button onClick={onCancel} variant="ghost">
          Cancel
        </Button>
      </Box>
    </>
  );
};

ServiceForm.propTypes = {
  isEdit: PropTypes.bool,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  orgId: PropTypes.string,
  service: PropTypes.shape()
};

export default ServiceForm;
