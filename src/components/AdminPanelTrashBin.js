import {delete as httpDelete, patch} from 'axios';
import React, {useContext} from 'react';
import {Stack, Text} from '@chakra-ui/react';

import {ContextFormModal} from '../components/ContextFormModal';
import Loading from '../components/Loading';
import Table from '../components/Table';
import {Container, SectionTitle, Title} from '../components/styles';
import {CATALOG_API_URL} from '../utils';
import {useAPIGet} from '../utils/hooks';

const AdminPanelTrashbin = (props) => {
    const {closeModal, openModal} = useContext(ContextFormModal);
    const deletedOrgs = useAPIGet(`/organizations?deleted=true`)?.data?.organizations;
    const deletedServices = useAPIGet(`/organizations?serviceDeleted=true`);
    const reducedDeletedServices = deletedServices?.data?.organizations?.reduce(
        (result,org) => {
            //eslint-disable-next-line
            org?.services?.forEach((service) => {
                if (service.is_deleted){
                    result.push({...service,organization:org});
                }
            });
            return result;
        },
        []
    );


//functions
const openOrganizationOrService = (id,serviceId) => {
    window.location = `/organizations/${id}${serviceId ? `/services/${serviceId}` : ''}`;
};
const openModalRestoreOrg = (Organization) => {
    
    openModal({
        header:'Restore Organization',
        onClose: closeModal,
        onConfirm:({setLoading,setSuccess,setError}) =>{
            const url = `${CATALOG_API_URL}/organizations/${Organization._id}`;
            setLoading();
            patch(url,{is_deleted:false}).then(()=>{
                window.location.reload();
                setSuccess();
            }).catch((err)=>{
                console.log('An error ocurred while restoring organization');
                console.log(err);
                setError();
            });
        }
    })
}

const openModalDeleteOrg = (Organization) => {

    openModal({
        header:'Permanently delete Organization',
        onClose: closeModal,
        onConfirm:({setLoading,setSuccess,setError}) =>{
            const url = `${CATALOG_API_URL}/organizations/${Organization._id}`;
            setLoading();
            httpDelete(url).then(()=>{
                window.location.reload();
                setSuccess();
            }).catch((err)=>{
                console.log('An error ocurred while deleting organization');
                console.log(err);
                setError();
            });
        }
    })
};

const openModalRestoreOrgService = (Organization,service) =>{
    openModal({
        header:'Restore Organization Service',
        onClose: closeModal,
        onConfirm:({setLoading,setSuccess,setError}) =>{
            const url = `${CATALOG_API_URL}/organizations/${Organization._id}/services/${service._id}`;
            setLoading();
            patch(url,{is_deleted:false}).then(()=>{
                window.location.reload();
                setSuccess();
            }).catch((err)=>{
                console.log('An error ocurred while restoring organization service');
                console.log(err);
                setError();
            });
        }
    })
}


const openModalDeleteOrgService = (Organization,service) => {
    openModal({
        header:'Permanently delete Organization Service',
        onClose: closeModal,
        onConfirm:({setLoading,setSuccess,setError}) =>{
            const url = `${CATALOG_API_URL}/organizations/${Organization._id}/services/${service._id}`;
            setLoading();
            httpDelete(url).then(()=>{
                window.location.reload();
                setSuccess();
            }).catch((err)=>{
                console.log('An error ocurred while deleting organization service');
                console.log(err);
                setError();
            });
        }
    })
};

if(deletedOrgs?.loading || deletedServices?.loading){
    return <Loading />;
}

return (
        <>
        <Title data-test-id="admin-trash-bin-title">Trash Bin</Title>
        <Stack spacing={4}>
            <Container>
                <SectionTitle data-test-id="admin-trash-bin-organizations-section-title">Deleted Organizations</SectionTitle>
                {deletedOrgs?.length > 0 ? (
                    <Table actions={[
                        {
                            label: 'View Deleted Organization',
                            onClick: (organization) => openOrganizationOrService(organization?._id),
                        },
                        {
                            label: 'Delete Organization',
                            onClick: (organization) => openModalDeleteOrg(organization)
                        },
                        {
                            label: 'Restore Organization',
                            onClick: (organization) => openModalRestoreOrg(organization)
                        },
                    ]}
                    headers={[
                        {key: 'org', label: 'Organization Name',
                        getValue: (organization) => organization?.name
                    }
                    ]}
                    rows={deletedOrgs}
                />
                ) : (
                    <Text data-test-id="admin-trash-bin-organizations-empty-state">No Organizations listed for deletion at this time</Text>
                )}
            </Container>
            <Container>
                <SectionTitle data-test-id="admin-trash-bin-services-section-title">Deleted Services</SectionTitle>
                {reducedDeletedServices?.length > 0 ? (
                    <Table actions={[
                        {
                            label: 'View Deleted Service Organization',
                            onClick: (service) => openOrganizationOrService(service?.organization?._id)
                        },
                        {
                            label: 'Delete Service',
                            onClick: (service) => openModalDeleteOrgService(service?.organization,service)
                        },
                        {
                            label: 'Restore Service',
                            onClick: (service) => openModalRestoreOrgService(service?.organization,service)
                        },
                    ]}
                    headers={[
                        {key: 'org', label: 'Organization Name', 
                        getValue: (organization)=> organization?.organization?.name},
                        {key:'service', label: 'Service Name',
                        getValue: (organization)=> organization?.name}
                    ]}
                    rows={reducedDeletedServices}
                    />
                    ) : (
                        <Text data-test-id="admin-trash-bin-services-empty-state">No Organization Services listed for deletion at this time</Text>
                )}
            </Container>
        </Stack>
        </>
    );
};

export default AdminPanelTrashbin;