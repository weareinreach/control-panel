import {post} from 'axios';
import React from 'react';

import Helmet from '../components/Helmet';
import OrganizationForm from '../components/OrganizationForm';
import {getAPIUrl} from '../utils';

const OrganizationNew = () => {
  const orgPath = '/organizations';
  const onCancel = () => {
    window.location = orgPath;
  };
  const onConfirm = ({setLoading, setSuccess, setFail, values}) => {
    const url = `${getAPIUrl()}${orgPath}`;

    setLoading();
    post(url, values)
      .then(({data}) => {
        const id = data?.organization?._id;

        setSuccess();
        window.location = `${orgPath}/${id}`;
      })
      .catch(err => {
        setFail();
        console.error(err);
      });
  };

  return (
    <>
      <Helmet title="New Organization" />
      <OrganizationForm onCancel={onCancel} onConfirm={onConfirm} />
    </>
  );
};

export default OrganizationNew;
