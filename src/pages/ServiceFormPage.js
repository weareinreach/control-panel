import {patch, post} from 'axios';
import PropTypes from 'prop-types';
import React from 'react';

import NotFound from './NotFound';
import FormService from '../components/FormService';
import Helmet from '../components/Helmet';
import Loading from '../components/Loading';
import {getAPIUrl} from '../utils';
import {useAPIGet} from '../utils/hooks';

const ServiceFormPage = (props) => {
  const {isDuplicate, isEdit, match} = props;
  const {orgId, serviceId} = match?.params;
  const apiUrl = orgId ? `/organizations/${orgId}/services/${serviceId}` : '';
  const {data, loading} = useAPIGet(apiUrl);
  const onCancelNew = () => {
    // Return to org page
    window.location = `/organizations/${orgId}`;
  };
  const onCancelDuplicateOrEdit = () => {
    // Return to specific service page
    window.location = `/organizations/${orgId}/services/${serviceId}`;
  };
  const onConfirmEdit = ({setLoading, setSuccess, setError, values}) => {
    const url = `${getAPIUrl()}/organizations/${orgId}/services/${serviceId}`;

    setLoading();
    patch(url, values)
      .then(({data}) => {
        setSuccess();
        window.location = `/organizations/${orgId}/services/${serviceId}`;
      })
      .catch((err) => {
        setError();
        console.error(err);
      });
  };
  const onConfirmNewOrDuplicate = ({
    setLoading,
    setSuccess,
    setError,
    values,
  }) => {
    const url = `${getAPIUrl()}/organizations/${orgId}/services`;

    setLoading();
    post(url, values)
      .then(() => {
        setSuccess();
        window.location = `/organizations/${orgId}`;
      })
      .catch((err) => {
        setError();
        console.error(err);
      });
  };
  const onCancel =
    isDuplicate || isEdit ? onCancelDuplicateOrEdit : onCancelNew;
  const onConfirm = isEdit ? onConfirmEdit : onConfirmNewOrDuplicate;
  let title = 'New Service';

  if (isEdit) {
    title = 'Edit Service';
  } else if (isDuplicate) {
    title = 'Duplicate Service';
  }

  if (loading) {
    return <Loading />;
  }

  if (isDuplicate && isEdit && !data) {
    return <NotFound />;
  }

  return (
    <>
      <Helmet title={title} />
      <FormService
        isDuplicate={isDuplicate}
        isEdit={isEdit}
        onCancel={onCancel}
        onConfirm={onConfirm}
        service={data}
        title={title}
      />
    </>
  );
};

ServiceFormPage.propTypes = {
  isDuplicate: PropTypes.bool,
  isEdit: PropTypes.bool,
  match: PropTypes.shape(),
};

export default ServiceFormPage;
