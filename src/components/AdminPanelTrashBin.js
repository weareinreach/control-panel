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
                    result.push({...service,org:{
                        name:org.name,
                        id:org._id
                    }});
                }
            });
            return result;
        },
        []
    );

//functions
const openOrganizationOrService = (id,serviceId) => {
    window.location = `/organizations/${id}${serviceId?`/services/${serviceId}` : ''}`;
};
const openModalRestoreOrg = (organization) => {
    
    openModal({
        header:'Restore Organization',
        onClose: closeModal,
        message:`${organization.name}`,
        onConfirm:({setLoading,setSuccess,setError}) =>{
            const url = `${CATALOG_API_URL}/organizations/${organization._id}`;
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

const openModalDeleteOrg = (organization) => {

    openModal({
        header:'Permanently Delete Organization',
        onClose: closeModal,
        message:`${organization.name}`,
        onConfirm:({setLoading,setSuccess,setError}) =>{
            const url = `${CATALOG_API_URL}/organizations/${organization._id}`;
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

const openModalRestoreOrgService = (id,service) =>{
    openModal({
        header:'Restore Organization Service',
        onClose: closeModal,
        message:`${service.name}`,
        onConfirm:({setLoading,setSuccess,setError}) =>{
            const url = `${CATALOG_API_URL}/organizations/${id}/services/${service._id}`;
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


const openModalDeleteOrgService = (id,service) => {
    openModal({
        header:'Permanently Delete Organization Service',
        onClose: closeModal,
        message:`${service.name}`,
        onConfirm:({setLoading,setSuccess,setError}) =>{
            const url = `${CATALOG_API_URL}/organizations/${id}/services/${service._id}`;
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
                            label: 'View Organization',
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
                    tableDataTestId='admin-trash-bin-table-orgs'
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
                            label: 'View Organization',
                            onClick: (service) => openOrganizationOrService(service?.org.id)
                        },
                        {
                            label: 'Delete Service',
                            onClick: (service) => openModalDeleteOrgService(service?.org.id,service)
                        },
                        {
                            label: 'Restore Service',
                            onClick: (service) => openModalRestoreOrgService(service?.org.id,service)
                        },
                    ]}
                    headers={[
                        {key: 'org', label: 'Organization Name', 
                        getValue: (organization)=> organization?.org?.name},
                        {key:'service', label: 'Service Name',
                        getValue: (organization)=> organization?.name}
                    ]}
                    rows={reducedDeletedServices}
                    tableDataTestId="admin-trash-bin-table-services"
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