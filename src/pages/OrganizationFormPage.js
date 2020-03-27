import {patch, post} from 'axios';
import PropTypes from 'prop-types';
import React from 'react';

import NotFound from './NotFound';
import FormOrganization from '../components/FormOrganization';
import Helmet from '../components/Helmet';
import Loading from '../components/Loading';
import {getAPIUrl} from '../utils';
import {useAPIGet} from '../utils/hooks';

const OrganizationFormPage = (props) => {
  const {isDuplicate, isEdit, match} = props;
  const {orgId} = match?.params;
  const apiUrl = orgId ? `/organizations/${orgId}` : '';
  const {data, loading} = useAPIGet(apiUrl);
  const onCancelNew = () => {
    // Return to top level orgs page
    window.location = `/organizations`;
  };
  const onCancelDuplicateOrEdit = () => {
    // Return to specific org page
    window.location = `/organizations/${orgId}`;
  };
  const onConfirmEdit = ({setLoading, setSuccess, setError, values}) => {
    const url = `${getAPIUrl()}/organizations/${orgId}`;

    setLoading();
    patch(url, values)
      .then(({data}) => {
        setSuccess();
        window.location = `/organizations/${orgId}`;
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
    const url = `${getAPIUrl()}/organizations`;

    setLoading();
    post(url, values)
      .then(({data}) => {
        const id = data?.organization?._id;

        setSuccess();
        window.location = `/organizations/${id}`;
      })
      .catch((err) => {
        setError();
        console.error(err);
      });
  };
  const onCancel =
    isDuplicate || isEdit ? onCancelDuplicateOrEdit : onCancelNew;
  const onConfirm = isEdit ? onConfirmEdit : onConfirmNewOrDuplicate;
  let title = 'New Organization';

  if (isEdit) {
    title = 'Edit Organization';
  } else if (isDuplicate) {
    title = 'Duplicate Organization';
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
      <FormOrganization
        isDuplicate={isDuplicate}
        isEdit={isEdit}
        onCancel={onCancel}
        onConfirm={onConfirm}
        organization={data}
        title={title}
      />
    </>
  );
};

OrganizationFormPage.propTypes = {
  isDuplicate: PropTypes.bool,
  isEdit: PropTypes.bool,
  match: PropTypes.shape(),
};

export default OrganizationFormPage;
