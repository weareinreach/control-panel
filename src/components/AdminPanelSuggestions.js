import {delete as httpDelete, get, post} from 'axios';
import React, {useContext} from 'react';
import {Stack, Text} from '@chakra-ui/core';

import {ContextFormModal} from '../components/ContextFormModal';
import Loading from '../components/Loading';
import Table from '../components/Table';
import {Container, SectionTitle, Title} from '../components/styles';
import {CATALOG_API_URL} from '../utils';
import {useAPIGet} from '../utils/hooks';


const AdminPanelSuggestions = (props) => {
  const {closeModal, openModal} = useContext(ContextFormModal);
  const orgOwners = useAPIGet(`/organizations?pendingOwnership=true`);
  const suggestedOrgs = useAPIGet(`/organizations?pending=true`);
  const suggestions = useAPIGet(`/suggestions`);
  const openOrganization = (id, serviceId) => {
    window.location = `/organizations/${id}${
      serviceId ? `/services/${serviceId}` : ''
    }`;
  };
  const pendingOwners = orgOwners?.data?.organizations?.reduce(
    (result, org) => {
      // eslint-disable-next-line
      org?.owners?.forEach((owner) => {
        if (owner.isApproved === false) {
          result.push({...owner, organization: org});
        }
      });

      return result;
    },
    []
  );
  const openModalApprovalOwner = (owner) =>
    openModal({
      header: 'Accept the request for affiliation',
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError}) => {
        const url = `${CATALOG_API_URL}/organizations/${owner?.organization?._id}/owners/${owner?.userId}/approve`;

        setLoading();

        get(url)
          .then(() => {
            const ownerStatus = 'approve';
            const org = owner?.organization?.name;
            const recipient = owner?.email;
            const mailUrl = `${CATALOG_API_URL}/mail`;

            // Sends email to pending affiliate
            post(`${mailUrl}`, {ownerStatus, org, recipient})
              .then(({data, status}) => {
                console.log('approval is sent');
                return {status, ...data};
              })
              .catch((err) => {
                console.error(`An error occurred while sending email: ${err}`);
                setError();
              });
            window.location.reload();
            setSuccess();
          })
          .catch((err) => {
            console.error('An error occured while updating ownership');
            console.error(err);
            setError();
          });
      },
    });
  const openModalDeclineOwner = (owner) =>
    openModal({
      header: 'Decline the request for affiliation',
      isAlert: true,
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError}) => {
        const url = `${CATALOG_API_URL}/organizations/${owner?.organization?._id}/owners/${owner?.userId}`;
        const ownerStatus = 'deny';
        const org = owner?.organization?.name;
        const recipient = owner?.email;
        const mailUrl = `${CATALOG_API_URL}/mail`;
        console.log(mailUrl);
        setLoading();
        
        // Sends email to pending affiliate
        post(`${mailUrl}`, {ownerStatus, org, recipient})
          .then(({data, status}) => {
            console.log('denial is sent');
            return {status, ...data};
          })
          .catch((err) => {
            console.error(`An error occurred while sending email. ${err}`);
            setError();
          });
        
        // Removes email from pending affiliates
        httpDelete(url)
          .then(() => {
            window.location.reload();
            setSuccess();
          })
          .catch((err) => {
            console.log('An error occured while updating ownership');
            console.log(err);
            setError();
          });
      },
    });
  const openModalDeclineEdit = (suggestion) =>
    openModal({
      header: 'Decline the suggested edit',
      isAlert: true,
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError}) => {
        const url = `${CATALOG_API_URL}/suggestions/${suggestion?._id}`;

        setLoading();

        httpDelete(url)
          .then(() => {
            window.location.reload();
            setSuccess();
          })
          .catch((err) => {
            console.error('An error occured while updating ownership');
            console.error(err);
            setError();
          });
      },
    });

  if (orgOwners?.loading || suggestedOrgs?.loading || suggestions?.loading) {
    return <Loading />;
  }

  return (
    <>
      <Title>Suggestions</Title>
      <Stack spacing={4}>
        <Container>
          <SectionTitle>Pending Affiliates</SectionTitle>
          {pendingOwners?.length > 0 ? (
            <Table
              actions={[
                {
                  label: 'View Organization',
                  onClick: (owner) =>
                    openOrganization(owner?.organization?._id),
                },
                {
                  label: 'Approve',
                  onClick: (owner) => openModalApprovalOwner(owner),
                },
                {
                  label: 'Decline',
                  onClick: (owner) => openModalDeclineOwner(owner),
                },
              ]}
              headers={[
                {key: 'email', label: 'Email'},
                {
                  key: 'org.name',
                  label: 'Organization Name',
                  getValue: (owner) => owner?.organization?.name,
                },
              ]}
              rows={pendingOwners}
            />
          ) : (
            <Text>No pending affiliates at this time</Text>
          )}
        </Container>
        <Container>
          <SectionTitle>Suggested Edits</SectionTitle>
          {suggestions?.data?.length > 0 ? (
            <Table
              actions={[
                {
                  label: 'View Organization',
                  onClick: (suggestion) =>
                    openOrganization(
                      suggestion.organizationId,
                      suggestion.serviceId
                    ),
                },
                {
                  label: 'Decline',
                  onClick: (suggestion) => openModalDeclineEdit(suggestion),
                },
              ]}
              headers={[
                {key: 'userEmail', label: 'Suggested By'},
                {key: 'field', label: 'Field'},
                {key: 'value', label: 'Value'},
              ]}
              rows={suggestions.data}
            />
          ) : (
            <Text>No suggested edits at this time</Text>
          )}
        </Container>
        <Container>
          <SectionTitle>Suggested Organizations</SectionTitle>
          {suggestedOrgs?.data?.organizations?.length > 0 ? (
            <Table
              actions={[
                {label: 'View', onClick: (org) => openOrganization(org?._id)},
              ]}
              headers={[{key: 'name', label: 'Name'}]}
              rows={suggestedOrgs.data.organizations}
            />
          ) : (
            <Text>No suggested organizations at this time</Text>
          )}
        </Container>
      </Stack>
    </>
  );
};

export default AdminPanelSuggestions;
