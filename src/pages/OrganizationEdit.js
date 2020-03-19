import {patch} from 'axios';
import PropTypes from 'prop-types';
import React from 'react';

import NotFound from './NotFound';
import Loading from '../components/Loading';
import OrganizationForm from '../components/OrganizationForm';
import {getAPIUrl} from '../utils';
import {useAPIGet} from '../utils/hooks';

const OrganizationEdit = props => {
  const {orgId} = props?.match?.params;
  const orgPath = `/organizations/${orgId}`;
  const {data, loading} = useAPIGet(orgPath);
  const onCancel = () => {
    window.location = orgPath;
  };
  const onConfirm = ({setLoading, setSuccess, setFail, values}) => {
    const url = `${getAPIUrl()}${orgPath}`;

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
    <OrganizationForm
      isEdit
      onCancel={onCancel}
      onConfirm={onConfirm}
      organization={data}
    />
  );
};

OrganizationEdit.propTypes = {
  match: PropTypes.shape()
};

export default OrganizationEdit;
