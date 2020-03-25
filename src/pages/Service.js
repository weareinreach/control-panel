import {delete as httpDelete} from 'axios';
import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Icon,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from '@chakra-ui/core';

import NotFound from './NotFound';
import Alert from '../components/Alert';
import {ContextFormModal} from '../components/ContextFormModal';
import DropdownButton from '../components/DropdownButton';
import Helmet from '../components/Helmet';
import ListProperties, {
  ListServiceArea,
  ListTags
} from '../components/ListProperties';
import Loading from '../components/Loading';
import Table, {KeyValueTable} from '../components/Table';
import {Container, SectionTitle, Title} from '../components/styles';
import {getAPIUrl} from '../utils';
import {
  additionalInformationProperties,
  communityProperties,
  costProperties,
  eligibilityRequirementProperties,
  emailFields,
  languageProperties,
  locationFields,
  phoneFields,
  scheduleFields
} from '../utils/formsHeaders';
import {useAPIGet} from '../utils/hooks';

const Service = props => {
  const {closeModal, openModal} = useContext(ContextFormModal);
  const {orgId, serviceId} = props?.match?.params;
  const servicePath = `/organizations/${orgId}/services/${serviceId}`;
  const {data, loading} = useAPIGet(servicePath);
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
    updated_at
  } = data || {};
  const email = email_id && organization?.phones?.[email_id];
  const location = location_id && organization?.emails?.[location_id];
  const phone = phone_id && organization?.schedules?.[phone_id];
  const schedule = schedule_id && organization?.locations?.[schedule_id];
  const openModalDelete = () =>
    openModal({
      header: `Delete ${name}`,
      isAlert: true,
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError}) => {
        const url = `${getAPIUrl()}${servicePath}`;

        console.log('DELETE:', url);

        setLoading();
        httpDelete(url)
          .then(() => {
            setSuccess();
            window.location = '/organizations';
          })
          .catch(err => {
            setError();
            console.error(err);
          });
      }
    });

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    return <NotFound />;
  }

  return (
    <>
      <Helmet title={name} />
      {!is_published && (
        <Alert title="This service is unpublished" type="warning" />
      )}
      <Box float="right">
        <Link to={`${servicePath}/edit`}>
          <Button marginRight={2}>Edit Service</Button>
        </Link>
        <DropdownButton
          buttonText="More"
          items={[
            {href: `${servicePath}/duplicate`, text: 'Duplicate'},
            {onClick: openModalDelete, text: 'Delete'}
          ]}
        />
      </Box>
      <Breadcrumb
        marginBottom={4}
        spacing="8px"
        separator={<Icon color="gray.300" name="chevron-right" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Organizations</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/organizations/${orgId}`}>
            {organization?.name || 'Organization Name'}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">
            <Text isTruncated maxWidth="200px">
              {name}
            </Text>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
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
                <SectionTitle>Service Details</SectionTitle>
                <KeyValueTable
                  rows={[
                    {key: 'ID', value: _id},
                    {key: 'Description', value: description},
                    {key: 'Slug', value: slug},
                    {key: 'Is Published', value: is_published},
                    {key: 'Updated At', value: updated_at},
                    {key: 'Created At', value: created_at}
                  ]}
                />
              </Container>
              <Container>
                <SectionTitle>Access Instructions</SectionTitle>
                <Table
                  headers={[
                    {key: 'access_type', label: 'Type'},
                    {key: 'access_value', label: ' '},
                    {key: 'instructions', label: 'Instructions'}
                  ]}
                  rows={access_instructions}
                />
              </Container>
              {location ? (
                <Container>
                  <SectionTitle>Address</SectionTitle>
                  <Table headers={locationFields} rows={[location]} />
                </Container>
              ) : null}
              {schedule ? (
                <Container>
                  <SectionTitle>Schedule</SectionTitle>
                  <Table headers={scheduleFields} rows={[schedule]} />
                </Container>
              ) : null}
              {email ? (
                <Container>
                  <SectionTitle>Email</SectionTitle>
                  <Table headers={emailFields} rows={[email]} />
                </Container>
              ) : null}
              {phone ? (
                <Container>
                  <SectionTitle>Phone</SectionTitle>
                  <Table headers={phoneFields} rows={[phone]} />
                </Container>
              ) : null}
            </Stack>
          </TabPanel>
          <TabPanel marginTop={2}>
            <Stack space={4}>
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
                <SectionTitle>Service Area Coverage</SectionTitle>
                <ListServiceArea properties={properties} />
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
                <SectionTitle>United States</SectionTitle>
                {serviceTags?.united_states?.length > 0 ? (
                  <ListTags tags={serviceTags?.united_states} />
                ) : null}
              </Container>
              <Container>
                <SectionTitle>Canada</SectionTitle>
                {serviceTags?.canada?.length > 0 ? (
                  <ListTags tags={serviceTags?.canada} />
                ) : null}
              </Container>
              <Container>
                <SectionTitle>Mexico</SectionTitle>
                {serviceTags?.mexico?.length > 0 ? (
                  <ListTags tags={serviceTags?.mexico} />
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
  match: PropTypes.shape()
};

export default Service;
