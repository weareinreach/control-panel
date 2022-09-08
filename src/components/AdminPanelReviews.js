import {delete as httpDelete, get, post} from 'axios';
import React, {useContext, useState, useEffect} from 'react';
import {Stack, Text} from '@chakra-ui/react';

import {ContextFormModal} from '../components/ContextFormModal';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import Table from '../components/Table';
import {Container, SectionTitle, Title} from '../components/styles';
import { CATALOG_API_URL, getOrgQueryUrls } from '../utils';
import {useAPIGet} from '../utils/hooks';

const initialQuery = { page: 1, pending: true };
const initialUrls = getOrgQueryUrls(initialQuery);

// THIS PAGE IS A PLACEHOLDER FOR REVIEWERS PENDING APPROVALS AND REVIEWS PENDING APPROVALS

const AdminPanelReviews = (props) => {
  const {closeModal, openModal} = useContext(ContextFormModal);
  
  /*** Pending Reviewers ***/
  const pendingReviewers = {}
  const pendingReviewersCount = {}
  const user = {}
  /*** end of Pedning Reviewers ***/

  /*** Pending Reviewers ***/
  const pendingReviews = {}
  const pendingReviewsCount = {}
  const review = {}
  /*** end of Pedning Reviewers ***/

  const orgOwners = useAPIGet(`/organizations?pendingOwnership=true`);
  const orgOwnersCount = useAPIGet(`/organizations/count?pendingOwnership=true`);
  const [queryOrgOwn, setQueryOrgOwn] = useState({page: 1});
  const getLastPageOrgOwner = () => {
    setQueryOrgOwn({ ...queryOrgOwn, page: queryOrgOwn.page - 1 });
  };
  const getNextPageOrgOwner = () => {
    setQueryOrgOwn({ ...queryOrgOwn, page: queryOrgOwn.page + 1 });
  };
  

  /*** Suggested Orgs ***/
  const suggestedOrgs = useAPIGet(initialUrls.organizations);
  const suggestedOrgsCount = useAPIGet(initialUrls.count);
  const [query, setQuery] = useState(initialQuery);
  const getLastPageSugOrg = () => {
    setQuery({ ...query, page: query.page - 1 });
  };
  const getNextPageSugOrg = () => {
    setQuery({ ...query, page: query.page + 1 });
  };
  
  /*** suggestions ***/
  const suggestions = useAPIGet(`/suggestions`);
  const suggestionsCount = useAPIGet(`/suggestions/count`);
  const [querySug, setQuerySug] = useState({page: 1});
  
  const getLastPageSug = () => {
    setQuerySug({ ...querySug, page: querySug.page - 1 });
  };
  const getNextPageSug = () => {
    setQuerySug({ ...querySug, page: querySug.page + 1 });
  };

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

  useEffect(() => {
    const urls = getOrgQueryUrls(query);
    suggestedOrgs.fetchUrl(urls.organizations);
    suggestedOrgsCount.fetchUrl(urls.count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  if (orgOwners?.loading || suggestedOrgs?.loading || suggestions?.loading) {
    return <Loading />;
  }

  return (
    <>
      <Title>THIS PAGE IS UNDER CONSTRUCTION</Title>
      <Stack spacing={4}>
        <Container>
          <SectionTitle>Reviewers Pending Approval ({pendingReviewersCount?.data?.count})</SectionTitle>
          {pendingReviewers?.length > 0 ? (
            <Table
              tableDataTestId='pending-affiliates-table'
              actions={[
                {
                  label: 'View User Details',
                  onClick: (user) =>
                    openOrganization(user?._id),
                },
                {
                  label: 'Approve',
                  onClick: (user) => openModalApprovalOwner(user),
                },
                {
                  label: 'Decline',
                  onClick: (user) => openModalDeclineOwner(user),
                },
              ]}
              headers={[
                {key: 'name', label: 'Name'},
                {key: 'email', label: 'Email'},
                {
                  key: 'user.currentLocation',
                  label: 'User Location',
                  getValue: (owner) => user?.currentLocation,
                },
              ]}
              rows={pendingReviewers}
            />
          ) : (
            <Text data-test-id='pending-affiliates-text' >No pending Reviewers at this time</Text>
          )}
            <Pagination
              currentPage={queryOrgOwn?.page}
              getLastPage={getLastPageOrgOwner}
              getNextPage={getNextPageOrgOwner}
              totalPages={orgOwnersCount?.data?.pages}
            />
        </Container>
        <Container>
          <SectionTitle>Reviews Pending Approval ({pendingReviewsCount?.data?.count})</SectionTitle>
          {pendingReviews?.data?.length > 0 ? (
            <Table
            tableDataTestId='suggested-edits-table'
              actions={[
                {
                  label: 'View Review',
                  onClick: (review) =>
                    openOrganization(
                      review.organizationId,
                      review.serviceId
                    ),
                },
                {
                  label: 'Decline',
                  onClick: (review) => openModalDeclineEdit(review),
                },
              ]}
              headers={[
                {key: 'userEmail', label: 'Reviewed By'},
                {key: 'currentLocation', label: 'Location'},
                {key: 'organization?.name', label: 'Organization Name'},
              ]}
              rows={pendingReviews}
            />
          ) : (
            <Text data-test-id="suggested-edits-text">No Pending Reviews at this time</Text>
          )}
            <Pagination
              currentPage={querySug?.page}
              getLastPage={getLastPageSug}
              getNextPage={getNextPageSug}
              totalPages={suggestionsCount?.data?.pages}
            />
        </Container>
      </Stack>
    </>
  );
};

export default AdminPanelReviews;
