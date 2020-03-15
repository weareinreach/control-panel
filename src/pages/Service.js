import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {Box, Button, Text} from '@chakra-ui/core';

import {ContextFormModal} from '../components/ContextFormModal';
import Loading from '../components/Loading';
import Table from '../components/Table';
import {Container, Title} from '../components/styles';
import {useAPIGet} from '../utils/hooks';

const duplicateForm = {
  name: {
    placeholder: "Enter the new service's name",
    type: 'text'
  }
};

const Service = props => {
  const {closeModal, openModal} = useContext(ContextFormModal);
  const serviceId = props?.match?.params?.id;
  const urlPath = `/services/${serviceId}`;
  const {data, loading} = useAPIGet(urlPath);
  const {
    // access_instructions,
    // comment_count,
    // comments,
    description,
    // emails,
    // id,
    // is_appointment,
    // is_closed,
    // last_verified,
    // lat,
    // location,
    // lon,
    name
    // organization,
    // parent_organization_id,
    // phones,
    // properties,
    // rating,
    // region,
    // resource_type,
    // schedule,
    // tags,
    // updated_at,
    // website
  } = data?.service || {};
  const openDeleteModal = () =>
    openModal({
      header: `Delete Service - ${name}`,
      isAlert: true,
      onClose: closeModal,
      onConfirm: handleServiceDelete
    });
  const openDuplicateModal = () =>
    openModal({
      form: duplicateForm,
      header: `Duplicate ${name}`,
      onClose: closeModal,
      onConfirm: handleServiceDuplicate
    });
  const handleServiceDelete = ({setLoading, setSuccess, setFail}) => {
    setLoading();

    // TODO: API logic for deleting

    setTimeout(() => {
      // TODO: navigate to the home services page
      // window.location = `/services/${serviceId}`;
      setSuccess();
      // window.location = `/services`;
    }, 3000);
  };
  const handleServiceDuplicate = ({
    setLoading,
    setSuccess,
    setFail,
    values
  }) => {
    setLoading();

    // TODO: API logic for duplicating
    console.log('handleServiceDuplicate', values);

    setTimeout(() => {
      // TODO: navigate to the new service page
      // window.location = `/services/${serviceId}`;
      setSuccess();
    }, 3000);
  };

  return (
    <Box padding={4}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Box float="right">
            <Button onClick={openDuplicateModal} marginRight={2}>
              Duplicate
            </Button>
            <Button onClick={openDeleteModal} variantColor="red">
              Delete
            </Button>
          </Box>
          <Title>{name}</Title>
          <Text>{description}</Text>
          <Container>
            {/* TODO: link to actual service's organization */}
            <Link to="/organizations">
              <Text>Organization Name</Text>
            </Link>
            {JSON.stringify(data)}
          </Container>
        </>
      )}
    </Box>
  );
};

Service.propTypes = {
  match: PropTypes.shape()
};

export default Service;
