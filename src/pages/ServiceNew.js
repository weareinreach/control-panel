import {post} from 'axios';
import PropTypes from 'prop-types';
import React from 'react';

import Helmet from '../components/Helmet';
import ServiceForm from '../components/ServiceForm';
import {getAPIUrl} from '../utils';

const ServiceNew = props => {
  const {orgId} = props?.match?.params;
  const orgPath = `/organizations/${orgId}`;
  const onCancel = () => {
    window.location = orgPath;
  };
  const onConfirm = ({setLoading, setSuccess, setFail, values}) => {
    const url = `${getAPIUrl()}${orgPath}/services`;

    setLoading();
    post(url, values)
      .then(() => {
        setSuccess();
        window.location = orgPath;
      })
      .catch(err => {
        setFail();
        console.error(err);
      });
  };

  return (
    <>
      <Helmet title="New Service" />
      <ServiceForm onCancel={onCancel} onConfirm={onConfirm} orgId={orgId} />
    </>
  );
};

ServiceNew.propTypes = {
  match: PropTypes.shape()
};

export default ServiceNew;
