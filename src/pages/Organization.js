import {delete as httpDelete, patch, post, get} from 'axios';
import PropTypes from 'prop-types';
import React, {useContext, useEffect, useState} from 'react';
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
import {Text} from '@chakra-ui/react';
import _map from 'lodash/map';
import _forEach from 'lodash/forEach';

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
  const [orgComments, setOrgComments] = useState([]);
  const [serviceComments, setServiceComments] = useState([]);
    //re-structure the service comments array
  let servicesWithComments  = [...new Set(serviceComments.map((comment) => comment.serviceId))]
  let thing = []
  
  servicesWithComments.forEach((id) => {
   thing.push({'serviceId': id, 'comments':[]})
   serviceComments.forEach((sId) => {
    if(id == sId.serviceId){
      thing[thing.findIndex(x => x.serviceId === sId.serviceId)].comments.push(sId)
    }
   })
  })
  servicesWithComments = thing

  async function getUsers(userId) {
    try{
      let userPath = `${CATALOG_API_URL}/users/${userId}`;
      const response = await get(userPath)
      return response
      }
    catch(err) {
      throw err;
      console.log(err);
    }
  }

  const getOrgComments = () => {
    if(!loading){
     let servicePath = `${CATALOG_API_URL}${orgPath}/comments`
     get(servicePath)
      .then(({data}) => {
        if(data.comments.length > 0){
          data.comments.forEach(comment => {
            getUsers(comment.userId)
              .then(({data}) =>{
                comment.userId = comment.userId
                comment.userName = data.name
                comment.userEmail = data.email
                setOrgComments(prev => [...prev, comment])
              })
          })
        }
      })
      .catch((err) => {
        throw new Error(err);
      });

    }
  }

  const getServiceComments = () => {
    if(!loading){
      services.forEach(i => {
       let servicePath = `${CATALOG_API_URL}${orgPath}/services/${i._id}/comments`
       get(servicePath)
        .then(({data}) => {
          if(data.comments.length > 0){
            data.comments.forEach(comment => {
              getUsers(comment.userId)
                .then(({data}) =>{
                  comment.userId = comment.userId
                  comment.userName = data.name
                  comment.userEmail = data.email
                  comment.serviceName = i.name
                  comment.serviceId = i._id
                  setServiceComments(prev => [...prev, comment])
                })
            })
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
      })
    }
  }


  useEffect(() => {
    getOrgComments()
    getServiceComments()
  }, [loading])

  const {
    _id,
    alert_message,
    created_at,
    description,
    emails,
    is_published,
    is_deleted,
    locations,
    name = 'Organization Name',
    notes_log,
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
  
  const updateFields = ({
    setLoading,
    setSuccess,
    setError,
    setErrorMessage,
    values,
  }) => {
    const url = `${CATALOG_API_URL}/organizations/${orgId}`;
    removeWhitespace(values);
    setLoading();
    patch(url, values)
      .then(({data}) => {
        setSuccess();
        window.location = `/organizations/${orgId}`;
      })
      .catch((err) => {
        const {message} = err?.response?.data;
        setError();
        setErrorMessage(message ?? null);
        console.log(err);
      });
  };
  const updateListField =
    (key, options) =>
    ({setLoading, setSuccess, setError, setErrorMessage, values}) => {
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
        setErrorMessage,
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
      header: 'Edit Coverage',
      onClose: closeModal,
      onConfirm: updateFields,
    });
  const openOrgDelete = () =>
    openModal({
      header: `Delete ${name}`,
      isAlert: true,
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError, setErrorMessage}) => {
        const url = `${CATALOG_API_URL}${orgPath}`;

        setLoading();

        //If Data Manager and Not Admin Soft delete
        if (user.isDataManager && !user.isAdminDataManager) {
          patch(url, {is_deleted: true})
            .then(() => {
              setSuccess();
              window.location = `/organizations`;
            })
            .catch((err) => {
              const {message} = err?.response?.data;
              setError();
              setErrorMessage(message ?? null);
              console.log(err);
            });
        }

        //If Admin Perma Delete
        if (user.isAdminDataManager) {
          httpDelete(url)
            .then(() => {
              setSuccess();
              window.location = '/organizations';
            })
            .catch((err) => {
              const {message} = err?.response?.data;
              setError();
              setErrorMessage(message ?? null);
              console.log(err);
            });
        }
      },
    });
  const openOrgDuplicate = () =>
    openModal({
      form: {fields: [{key: 'name', label: 'name'}]},
      header: 'Duplicate Organization',
      onClose: closeModal,
      onConfirm: ({
        setLoading,
        setSuccess,
        setError,
        setErrorMessage,
        values,
      }) => {
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
            const {message} = err?.response?.data;
            setError();
            setErrorMessage(message ?? null);
            console.log(err);
          });
      },
    });
  const openOrgVerify = () =>
    openModal({
      header: `Verify Information for ${name}?`,
      onClose: closeModal,
      onConfirm: ({
        setLoading,
        setSuccess,
        setError,
        setErrorMessage,
        values,
      }) => {
        updateFields({
          setLoading,
          setSuccess,
          setError,
          setErrorMessage,
          values,
        });
      },
      onVerify: ({
        setLoading,
        setSuccess,
        setError,
        setErrorMessage,
        values,
      }) => {
        values = {...values, verified_at: Date.now()};

        updateFields({
          setLoading,
          setSuccess,
          setError,
          setErrorMessage,
          values,
        });
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
      onConfirm: ({
        setLoading,
        setSuccess,
        setError,
        setErrorMessage,
        values,
      }) => {
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
            const {message} = err?.response?.data;
            setError();
            setErrorMessage(message ?? null);
            console.log(err);
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

  const openSocialMediaForm = ({
    isEdit = false,
    isDelete = false,
    profile = {},
  }) => {
    // only allow social_media fields that are not already selected
    let indexArr = []
    _map(socialMediaFields[0].options, (option) => {
        _forEach(organization?.social_media, function(key){
          let index = socialMediaFields[0].options.indexOf(option)
          if (key.name == option.value) {
            indexArr.push(index)
          }
        })
      })
    
    while(indexArr.length) {
      socialMediaFields[0].options.splice(indexArr.pop(), 1);
    }

    //now open the social_media form
    return openModal({
      form: {
        fields: isDelete ? null : socialMediaFields,
        initialValues: profile,
      },
      header: isEdit
        ? `Edit Social Media profile`
        : isDelete
        ? `Delete Social Media profile`
        : `New Social Media Profile`,
      isAlert: isDelete,
      onClose: closeModal,
      onConfirm: updateListField('social_media', {isEdit, isDelete}),
    });
  };

  const primaryLocation =
    (locations && locations.find((it) => it.is_primary)) ??
    (locations && locations[0]) ??
    null;

  const openNotesForm =
    (isDelete = false) =>
    (note) => {
      if (isDelete) {
        return openModal({
          form: {initialValues: note},
          header: 'Delete Note',
          isAlert: true,
          onClose: closeModal,
          onConfirm: updateListField('notes_log', {isDelete: true}),
        });
      }

      return openModal({
        form: {
          fields: [{key: 'note', label: 'Note', type: 'textarea'}],
        },
        header: 'New Note',
        onClose: closeModal,
        onConfirm: ({setLoading, setSuccess, setError, values}) => {
          const notes_data = {...values, created_at: Date.now()};
          updateListField('notes_log')({
            setLoading,
            setSuccess,
            setError,
            values: notes_data,
          });
        },
      });
    };

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
            ...(user.isDataManager
              ? [{onClick: openOrgDelete, text: 'Delete'}]
              : []),
          ]}
        />
      </Box>
      <Breadcrumbs organization={organization} />
      <Title>{name}</Title>
      <Stack marginTop={6}>
        <Tabs variant="enclosed" data-test-id="organization-tabs">
          <TabList>
            <Tab
              data-test-id="organization-tab-general"
              style={{boxShadow: 'none'}}
            >
              General
            </Tab>
            <Tab
              data-test-id="organization-tab-photos"
              style={{boxShadow: 'none'}}
            >
              Photos
            </Tab>
            <Tab
              data-test-id="organization-tab-reviews"
              style={{boxShadow: 'none'}}
            >
              Reviews
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel mt={5}>
              <div>
                <Box {...buttonGroupProps}>
                  <Button
                    onClick={openDetailsEdit}
                    data-test-id="organization-edit-button"
                  >
                    Edit Details
                  </Button>
                </Box>
                <SectionTitle data-test-id="organization-details-title">
                  General Details
                </SectionTitle>
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
                    {key: 'Is Deleted', value: is_deleted},
                    {key: 'Last Verified', value: verified_at},
                    {key: 'Updated At', value: updated_at},
                    {key: 'Created At', value: created_at},
                  ]}
                />
                <Container>
                  <SectionTitle data-test-id="organization-affiliates-title">
                    Associated Affiliates
                  </SectionTitle>
                  <Table
                    headers={[{key: 'email', label: 'Email'}]}
                    rows={owners}
                  />
                </Container>
                <Container>
                  <Box {...buttonGroupProps}>
                    <Button
                      onClick={openNewService}
                      data-test-id="organization-new-service-button"
                    >
                      New Service
                    </Button>
                  </Box>
                  <SectionTitle data-test-id="organization-services-title">
                    Services
                  </SectionTitle>
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
                    <Button
                      onClick={openLocationForm()}
                      data-test-id="organization-new-address-button"
                    >
                      New Address
                    </Button>
                  </Box>
                  <SectionTitle data-test-id="organization-addresses-title">
                    Addresses
                  </SectionTitle>
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
                    <Button
                      onClick={openScheduleForm()}
                      data-test-id="organization-new-schedule-button"
                    >
                      New Schedule
                    </Button>
                  </Box>
                  <SectionTitle data-test-id="organization-schedules-title">
                    Schedules
                  </SectionTitle>
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
                    <Button
                      onClick={openEmailForm()}
                      data-test-id="organization-new-email-button"
                    >
                      New Email
                    </Button>
                  </Box>
                  <SectionTitle data-test-id="organization-emails-title">
                    Emails
                  </SectionTitle>
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
                    <Button
                      onClick={openPhoneForm()}
                      data-test-id="organization-new-phone-button"
                    >
                      New Phone
                    </Button>
                  </Box>
                  <SectionTitle data-test-id="organization-phones-title">
                    Phones
                  </SectionTitle>
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
                    <Button
                      disabled={organization?.social_media?.length >= socialMediaFields[0].options.length}
                      onClick={() => openSocialMediaForm({})}
                      data-test-id="organization-new-social-media-button"
                    >
                      New Social Media Profile
                    </Button>
                  </Box>
                  <SectionTitle data-test-id="organization-social-media-title">
                    Social Media
                  </SectionTitle>
                  <Table
                    headers={socialMediaFields}
                    rows={social_media}
                    actions={[
                      {
                        label: 'Edit',
                        onClick: (profile) =>
                          openSocialMediaForm({isEdit: true, profile}),
                      },
                      {
                        label: 'Delete',
                        onClick: (profile) =>
                          openSocialMediaForm({isDelete: true, profile}),
                      },
                    ]}
                  />
                </Container>
                <Container>
                  <Box {...buttonGroupProps}>
                    <Button
                      onClick={openCoverageEdit}
                      data-test-id="organization-edit-coverage-button"
                    >
                      Edit Coverage
                    </Button>
                  </Box>
                  <SectionTitle data-test-id="organization-service-area-coverage-title">
                    Service Area Coverage
                  </SectionTitle>
                  <ListServiceArea properties={properties} />
                </Container>
                <Container>
                  <Box {...buttonGroupProps}>
                    <Button
                      onClick={openNotesForm()}
                      data-test-id="organization-new-note-button"
                    >
                      New Note
                    </Button>
                  </Box>
                  <SectionTitle data-test-id="organization-notes-title">
                    Notes
                  </SectionTitle>
                  <Table
                    headers={[
                      {key: 'note', label: 'Note'},
                      {key: 'created_at', label: 'Created At'},
                    ]}
                    rows={notes_log}
                    actions={[
                      {
                        label: 'Delete',
                        onClick: openNotesForm(true),
                      },
                    ]}
                  />
                </Container>
              </div>
            </TabPanel>
            <TabPanel mt={5}>
              <Box>
                <FormPhotos
                  organizationId={orgId}
                  location={primaryLocation}
                  photos={photos ? photos : []}
                  name={name}
                  venue_id={venue_id}
                />
              </Box>
            </TabPanel>
            <TabPanel mt={5}>
              <div>
                <Container>
                  <Title data-test-id="organization-services-title">
                    Reviews for this Organization
                  </Title>
                  {orgComments.length > 0 ? (
                  <Table
                    headers={[
                      {key: 'comment', label: 'Review'},
                      {key: 'userName', label: 'Reviewer Name'},
                      {key: 'userEmail', label: 'Reviewer Email'},
                      {key: 'created_at', label: 'Submitted'},
                    ]}
                    rows={orgComments}
                  />
                  ) : 'There are no reviews for this Organization'}
                </Container>
                <Container>
                  <Title data-test-id="organization-services-title">
                    Reviews for the Services of this Organization
                  </Title>                  
                  {serviceComments.length > 0 ? (
                    servicesWithComments.map((service) => {                 
                      return(
                        <>
                          <SectionTitle>
                          Service Name: {service.comments[0].serviceName} 
                          </SectionTitle>
                          <Table
                            actions={[{label: 'Hide Review', onClick: openOrgDelete}]}
                            headers={[
                              {key: 'comment', label: 'Review'},
                              {key: 'userName', label: 'Reviewer Name'},
                              {key: 'userEmail', label: 'Reviewer Email'},
                              {key: 'created_at', label: 'Submitted'},
                            ]}
                            rows={service.comments}
                          />
                       </>
                      )
                    })
                  ): 'There are no Service reviews for this Organization'}                
                </Container>
              </div>
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
