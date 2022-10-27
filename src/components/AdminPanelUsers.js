import {delete as httpDelete, patch, post, get} from 'axios';
import React, {useState, useContext, useEffect} from 'react';
import {Box, Button, Grid, Text} from '@chakra-ui/react';

import {ContextFormModal} from './ContextFormModal';
import FiltersUsers from './FiltersUsers';
import Loading from './Loading';
import Pagination from './Pagination';
import Table from './Table';
import {Container, SectionTitle, Title} from './styles';
import {adminFields, userDetailsFields, reviewerFields, userDetailsFieldsReviewer} from '../data/fields.json';
import {
  CATALOG_API_URL,
  USER_TYPE_ADMIN_DM,
  USER_TYPE_DM,
  USER_TYPE_LAWYER,
  USER_TYPE_PROVIDER,
  USER_TYPE_SEEKER,
  USER_TYPE_REVIEWER,
  getUserQueryUrls,
} from '../utils';
import {useAPIGet} from '../utils/hooks';

const initialQuery = {page: 1, name: '', properties: ''};
const initialUrls = getUserQueryUrls(initialQuery);

const AdminPanelUsers = (props) => {
  const users = useAPIGet(initialUrls.users);
  const count = useAPIGet(initialUrls.count);
  const {closeModal, openModal} = useContext(ContextFormModal);
  const [query, setQuery] = useState(initialQuery);
  const loading = count?.loading || users?.loading;
  const getLastPage = () => {
    setQuery({...query, page: query.page - 1});
  };
  const getNextPage = () => {
    setQuery({...query, page: query.page + 1});
  };
  const newQuery = (params) => {
    setQuery({page: 1, ...params});
  };
  const openCreateModal = () =>
    openModal({
      form: {fields: adminFields},
      header: 'New Data Manager',
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError, values}) => {
        const url = `${CATALOG_API_URL}/users`;
        const user = {...values, isDataManager: true, password: 'ac123'};

        setLoading();
        post(url, user)
          .then(() => {
            window.location.reload();
            setSuccess();
          })
          .catch((err) => {
            console.error('An error occured while creating users');
            console.error(err);
            setError();
          });
      },
    });
  const openEditModal = (selectedManager) =>
    openModal({
      form: {
        fields: adminFields,
        initialValues: {
          name: selectedManager?.name,
          email: selectedManager?.email,
          isAdminDataManager: selectedManager?.isAdminDataManager,
        },
      },
      header: 'Edit Data Manager',
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError, values}) => {
        const url = `${CATALOG_API_URL}/users/${selectedManager._id}`;

        setLoading();
        patch(url, values)
          .then(() => {
            window.location.reload();
            setSuccess();
          })
          .catch((err) => {
            console.error('An error occured while editing users');
            console.error(err);
            setError();
          });
      },
    });
  
  const openEditModalReviewer = (selectedManager) =>
      openModal({
        form: {
          fields: reviewerFields,
          initialValues: {
            name: selectedManager?.name,
            email: selectedManager?.email,
            isReviewerApproved: selectedManager?.isReviewerApproved,
          },
        },
        header: 'Edit Reviewer',
        onClose: closeModal,
        onConfirm: ({setLoading, setSuccess, setError, values}) => {
          const url = `${CATALOG_API_URL}/users/${selectedManager._id}`;
          const userUrl = `${CATALOG_API_URL}/comments/${selectedManager._id}`;

          setLoading();
          patch(url, values)
            .then(() => {
              get(userUrl)
              .then((data) => {
                console.log(JSON.stringify(data))
              })
              window.location.reload();
              setSuccess();
            })
            .catch((err) => {
              console.error('An error occured while editing users');
              console.error(err);
              setError();
            });
        },
      });
    

    const openDeleteModal = (selectedUser) =>
      openModal({
        header: `Delete User: ${selectedUser?.name || selectedUser?.email}`,
        isAlert: true,
        onClose: closeModal,
        onConfirm: ({setLoading, setSuccess, setError}) => {
          const url = `${CATALOG_API_URL}/users/${selectedUser._id}`;

          setLoading();
          httpDelete(url)
            .then(() => {
              window.location.reload();
              setSuccess();
            })
            .catch((err) => {
              console.error('An error occured while deleting the user');
              console.error(err);
              setError();
            });
        },
      });
   
    const openRemoveModal = (selectedManager) =>
      openModal({
        header: 'Remove Data Manager',
        isAlert: true,
        onClose: closeModal,
        onConfirm: ({setLoading, setSuccess, setError}) => {
          const url = `${CATALOG_API_URL}/users/${selectedManager._id}`;

          setLoading();
          patch(url, {isDataManager: false, isAdminDataManager: false})
            .then(() => {
              window.location.reload();
              setSuccess();
            })
            .catch((err) => {
              console.error('An error occured while updating the users');
              console.error(err);
              setError();
            });
        },
      });
    
    const openRemoveModalReviewer = (selectedManager) =>
      openModal({
        header: 'Remove Reviewer Approval',
        isAlert: true,
        onClose: closeModal,
        onConfirm: ({setLoading, setSuccess, setError}) => {
          const url = `${CATALOG_API_URL}/users/${selectedManager._id}`;

          setLoading();
          patch(url, {isReviewerApproved: false})
            .then(() => {
              window.location.reload();
              setSuccess();
            })
            .catch((err) => {
              console.error('An error occured while updating the users');
              console.error(err);
              setError();
            });
        },
      });
    
    const openDetailModal = (selectedManager) =>
      openModal({
        form: {
          fields: userDetailsFields,
          initialValues: {
            name: selectedManager?.name,
            email: selectedManager?.email,
            age: selectedManager?.age,
            countryOfOrigin: selectedManager?.countryOfOrigin,
            currentLocation: selectedManager?.currentLocation,
            ethnicityRace: selectedManager?.ethnicityRace,
            immigrationStatus: selectedManager?.immigrationStatus,
            sogIdentity: selectedManager?.sogIdentity,
            orgType: selectedManager?.orgType,
            catalogType: selectedManager?.catalogType,
            updatedAt: selectedManager?.updated_at,
            isAdminDataManager: selectedManager?.isAdminDataManager,
            isProfessional: selectedManager?.isProfessional,
            isReviewerApproved: selectedManager?.isReviewerApproved,
          },
        },
        header: 'Data Manager Details',
        onClose: closeModal,
        // onConfirm: () => {
        //   console.log(selectedManager);
        // },
      });

    const openDetailModalReviewer = (selectedManager) =>
      openModal({
        form: {
          fields: userDetailsFieldsReviewer,
          initialValues: {
            name: selectedManager?.name,
            email: selectedManager?.email,
            currentLocation: selectedManager?.currentLocation,
            verifyAnswer: selectedManager?.reviewerQuestions?.verifyAnswer === true ? 'Yes' : 'No',
            timeCommitAnswer: selectedManager?.reviewerQuestions?.timeCommitAnswer === true ? 'Yes' : 'No',
            specifiedTimeCommit: selectedManager?.reviewerQuestions?.specifiedTimeCommit,
            auditAnswer: selectedManager?.reviewerQuestions?.auditAnswer === true ? 'Yes' : 'No',
            suggestionsAnswer: selectedManager?.reviewerQuestions?.suggestionsAnswer === true ? 'Yes' : 'No',
            reviewsAnswer: selectedManager?.reviewerQuestions?.reviewsAnswer === true ? 'Yes' : 'No',
            payAnswer: selectedManager?.reviewerQuestions?.payAnswer === true ? 'Yes' : 'No',
            specifiedOtherInfo: selectedManager?.reviewerQuestions?.specifiedOtherInfo,
            age: selectedManager?.age,
            countryOfOrigin: selectedManager?.countryOfOrigin,
            ethnicityRace: selectedManager?.ethnicityRace,
            immigrationStatus: selectedManager?.immigrationStatus,
            sogIdentity: selectedManager?.sogIdentity,
            orgType: selectedManager?.orgType,
            catalogType: selectedManager?.catalogType,
            updatedAt: selectedManager?.updated_at,
            isAdminDataManager: selectedManager?.isAdminDataManager,
            isProfessional: selectedManager?.isProfessional,
            isReviewerApproved: selectedManager?.isReviewerApproved,
          },
        },
        header: 'Local Community Reviewer User Details',
        onClose: closeModal,
        // onConfirm: () => {
        //   console.log(selectedManager);
        // },
      });

    const queryType = query?.type;
    const queryTypeLabel = queryType ? queryType[0].toUpperCase()+queryType.substring(1)+'s': 'All Users'
    const tableActions = [
      ...(queryType === USER_TYPE_ADMIN_DM || queryType === USER_TYPE_DM
        ? [
            {label: 'Edit', onClick: openEditModal},
            {label: 'Revoke', onClick: openRemoveModal},
            {label: 'View', onClick: openDetailModal},
          ]
        : []),
      ...(queryType === USER_TYPE_LAWYER ? [      {label: 'View', onClick: openDetailModal},] : []),
      ...(queryType === USER_TYPE_PROVIDER ? [      {label: 'View', onClick: openDetailModal},] : []),
      ...(queryType === USER_TYPE_SEEKER ? [      {label: 'View', onClick: openDetailModal},] : []),
      ...(queryType === USER_TYPE_REVIEWER 
        ? [
            {label: 'Edit', onClick: openEditModalReviewer},
            {label: 'Revoke', onClick: openRemoveModalReviewer},
            {label: 'View', onClick: openDetailModalReviewer},
          ] : []),
      ...(!queryType ? [      {label: 'View', onClick: openDetailModal},] : []),
      {label: 'Delete', onClick: openDeleteModal},
    ];
    const tableHeaders = [
      {key: 'name', label: 'Name'},
      {key: 'email', label: 'Email'},
      ...(queryType === USER_TYPE_ADMIN_DM || queryType === USER_TYPE_DM
        ? [
            {
              key: 'isAdminDataManager',
              label: 'Is Admin',
              type: 'boolean',
            },
          ]
        : []),
      ...(queryType === USER_TYPE_REVIEWER ? [
            {
              key: 'isReviewerApproved',
              label: 'Is Reviewer Approved',
              type: 'boolean',
            },
          ] : []),
      ...(queryType === USER_TYPE_LAWYER ? [] : []),
      ...(queryType === USER_TYPE_PROVIDER ? [] : []),
      ...(queryType === USER_TYPE_SEEKER ? [] : []),
    ];

    useEffect(() => {
      const urls = getUserQueryUrls(query);
      users.fetchUrl(urls.users);
      count.fetchUrl(urls.count);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    if (!users?.data && loading) {
      return <Loading />;
    }

    return (
      <>
        <Box float="right">
          <Button
            data-test-id="admin-users-new-manager"
            onClick={openCreateModal}
          >
            New Manager
          </Button>
        </Box>
        <Title data-test-id="admin-users-title">{queryTypeLabel}</Title>
        <Grid minwidth={'500px'} templateColumns="1fr 350px" gap={4}>
          <Box>
            {loading ? (
              <Loading />
            ) : (
              <>
                <Container>
                  <Box>
                    {users?.data?.users?.length > 0 ? (
                      <Table
                        tableDataTestId="admin-users-table"
                        actions={tableActions}
                        headers={tableHeaders}
                        rows={users?.data?.users}
                      />
                    ) : (
                      <Box textAlign="center" padding={4}>
                        <SectionTitle data-test-id="admin-search-not-found-title">
                          No results found.
                        </SectionTitle>
                        <Text data-test-id="admin-search-not-found-body">
                          Please refine your search
                        </Text>
                      </Box>
                    )}
                  </Box>
                </Container>
                <Pagination
                  currentPage={query?.page}
                  getLastPage={getLastPage}
                  getNextPage={getNextPage}
                  totalPages={count?.data?.pages}
                />
              </>
            )}
          </Box>
          <Container height="fit-content">
            <FiltersUsers query={query} updateQuery={newQuery} />
          </Container>
        </Grid>
      </>
    );
  };

export default AdminPanelUsers;
