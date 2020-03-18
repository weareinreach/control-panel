import {patch} from 'axios';
import PropTypes from 'prop-types';
import React from 'react';

import NotFound from './NotFound';
import Loading from '../components/Loading';
import ServiceForm from '../components/ServiceForm';
import {getAPIUrl} from '../utils';
import {useAPIGet} from '../utils/hooks';

const ServiceEdit = props => {
  const {orgId, serviceId} = props?.match?.params;
  const orgPath = `/organizations/${orgId}`;
  const servicePath = `${orgPath}/services/${serviceId}`;
  const {data, loading} = useAPIGet(servicePath);
  const onCancel = () => {
    window.location = orgPath;
  };
  const onConfirm = ({setLoading, setSuccess, setFail, values}) => {
    const url = `${getAPIUrl()}${servicePath}`;

    setLoading();
    patch(url, values)
      .then(({data}) => {
        setSuccess();
        window.location = orgPath;
      })
      .catch(err => {
        setFail();
        console.error(err);
      });
  };

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    return <NotFound />;
  }

  return (
    <ServiceForm
      initialValues={data}
      isEdit
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
};

ServiceEdit.propTypes = {
  match: PropTypes.shape()
};

export default ServiceEdit;
