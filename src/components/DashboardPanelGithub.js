import {delete as httpDelete, get, post} from 'axios';
import React, {useContext, useState, useEffect} from 'react';
import { Box,Button,Container,Grid,Text } from '@chakra-ui/react';
import Table from '../components/Table';
import {ContextFormModal} from './ContextFormModal';
import Loading from '../components/Loading';
import { CATALOG_API_URL } from '../utils';
import { useAPIGet } from '../utils/hooks';
import { SectionTitle, Title } from './styles';
import {createNewRelease} from '../data/fields.json'




const DashboardPanelGithub = (props) =>{
    
    const {closeModal, openModal} = useContext(ContextFormModal);
    const appReleases = useAPIGet('/dashboard/getRepoReleases/inreach-catalog');
    const apiReleases = useAPIGet('/dashboard/getRepoReleases/inreach-api');
    const adminReleases = useAPIGet('/dashboard/getRepoReleases/control-panel');
    const appHallOfFame = useAPIGet('/dashboard/getContributors/inreach-catalog');
    const apiHallOfFame = useAPIGet('/dashboard/getContributors/inreach-api');
    const adminHallOfFame = useAPIGet('/dashboard/getContributors/control-panel');
    const releasesLoading =  appReleases?.loading || apiReleases?.loading || adminReleases?.loading;
    const hallOfFameLoading = appHallOfFame?.loading || apiHallOfFame?.loading || adminHallOfFame?.loading; 
    
    const openRelease = (url) =>{
        var win = window.open(url,'_blank');
        win.focus();
    }
    const releaseTableHeaders = [    
        {key:'release_name', label:'Release Name'},
        {key:'release_tag', label:'Release Tag'},
        {key:'release_date', label:'Release Date'},
    ]
    const hallOfFameTableHeaders = [
        {key:'username', label:'Username'},
        {key:'total_contributions', label:'Total Contributions'}
    ]
    const createReleaseBody = (input) =>{
        let repos = [];
        if (input.control_panel) repos.push("control-panel")
        if (input.inreach_catalog) repos.push("inreach-catalog")
        if (input.inreach_api) repos.push("inreach-api")
        return {
            repos:repos,
            releaseBranch:input.inreach_release_branch,
            sourceBranch:input.inreach_source_branch,
            targetBranch:input.inreach_target_ranch,
            title:input.inreach_pr_title
        }
    }
    const openCreateModal = () =>
    openModal({
      form: {fields: createNewRelease},
      header: 'Create Release',
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError, values}) => {
        setLoading();
        post(`${CATALOG_API_URL}/dashboard/createRelease`, createReleaseBody({...values}))
          .then(() => {
            window.location.reload();
            setSuccess();
          })
          .catch((err) => {
            console.error('An error occured while creating Releases');
            console.error(err);
            setError();
          });
      }
    });    
    
    //ensure everything loaded
    if(releasesLoading || hallOfFameLoading)  {
        return <Loading />
    }
    return (
    <>
      <Title>Hall Of Fame</Title>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
      <Box>
                <Container>
                    <Text fontSize='lg' align={"center"}>App Catalog</Text>
                    <Box>
                    {appHallOfFame?.data?.data?.length > 0 ? (
                        <Table
                            tableDataTestId="hall-of-fame-app-table"
                            headers={hallOfFameTableHeaders}
                            actions={[
                                {label:'Profile',onClick: (profile) => openRelease(profile.profile_username_url)}
                            ]}
                            rows={appHallOfFame?.data?.data}
                        />
                    ) : (
                        <Box textAlign="center" padding={4}>
                            <SectionTitle data-test-id="hall-of-fame-app-not-found-title">
                                No results.
                            </SectionTitle>
                            <Text data-test-id="hall-of-fame-app-not-found-body">
                                No Hall of Fame for this project.
                            </Text>
                        </Box>
                    )}
                    </Box>
            </Container>
        </Box>
        <Box>
                <Container>
                    <Text fontSize='lg' align={"center"}>Admin App</Text>
                    <Box>
                    {adminHallOfFame?.data?.data?.length > 0 ? (
                        <Table
                            tableDataTestId="hall-of-fame-admin-table"
                            headers={hallOfFameTableHeaders}
                            actions={[
                                {label:'Profile',onClick: (profile) => openRelease(profile.profile_username_url)}
                            ]}
                            rows={adminHallOfFame?.data?.data}
                        />
                    ) : (
                        <Box textAlign="center" padding={4}>
                            <SectionTitle data-test-id="hall-of-fame-admin-not-found-title">
                                No results.
                            </SectionTitle>
                            <Text data-test-id="hall-of-fame-admin-not-found-body">
                                No Hall of Fame for this project.
                            </Text>
                        </Box>
                    )}
                    </Box>
            </Container>
        </Box>
        <Box>
                <Container>
                    <Text fontSize='lg' align={"center"}>API App</Text>
                    <Box>
                    {apiHallOfFame?.data?.data?.length > 0 ? (
                        <Table
                            tableDataTestId="hall-of-fame-api-table"
                            headers={hallOfFameTableHeaders}
                            actions={[
                                {label:'Profile',onClick: (profile) => openRelease(profile.profile_username_url)}
                            ]}
                            rows={apiHallOfFame?.data?.data}
                        />
                    ) : (
                        <Box textAlign="center" padding={4}>
                            <SectionTitle data-test-id="hall-of-fame-api-not-found-title">
                                No results.
                            </SectionTitle>
                            <Text data-test-id="hall-of-fame-api-not-found-body">
                                No Hall of Fame for this project.
                            </Text>
                        </Box>
                    )}
                    </Box>
            </Container>
        </Box>
      </Grid>
      <br>
      </br>
      <Box float="right">
        <Button
          data-test-id="admin-dashboard-new-release"
          onClick={openCreateModal}
        >
          New Release
        </Button>
      </Box>
    <Title>Releases</Title>
    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        <Box>
                <Container>
                 <Text fontSize='lg' align={"center"}>App Catalog</Text>
                    <Box>
                    {appReleases?.data?.data?.length > 0 ? (
                        <Table
                            tableDataTestId="releases-app-table"
                            headers={releaseTableHeaders}
                            actions={[
                                {label:'View Release',onClick: (release) => openRelease(release.release_url)}
                            ]}
                            rows={appReleases?.data?.data}
                        />
                    ) : (
                        <Box textAlign="center" padding={4}>
                            <SectionTitle data-test-id="releases-app-not-found-title">
                                No results.
                            </SectionTitle>
                            <Text data-test-id="releases-app-not-found-body">
                                No releases for InReach App yet.
                            </Text>
                        </Box>
                    )}
                    </Box>
                </Container>
        </Box>
        <Box>
                <Container>
                  <Text fontSize='lg' align={"center"}>Admin App</Text>
                    <Box>
                    {adminReleases?.data?.data?.length > 0 ? (
                        <Table
                            tableDataTestId="releases-admin-table"
                            headers={releaseTableHeaders}
                            actions={[
                                {label:'View Release',onClick: (release) => openRelease(release.release_url)}
                            ]}
                            rows={adminReleases?.data?.data}
                        />
                    ) : (
                        <Box textAlign="center" padding={4}>
                            <SectionTitle data-test-id="releases-admin-not-found-title">
                                No results.
                            </SectionTitle>
                            <Text data-test-id="releases-admin-not-found-body">
                                No releases for InReach Admin yet.
                            </Text>
                        </Box>
                    )}
                    </Box>
                </Container>
        </Box>
        <Box>
                <Container>
                  <Text fontSize='lg' align={"center"}>API App</Text>
                    <Box>
                    {apiReleases?.data?.data?.length > 0 ? (
                         <Table
                            tableDataTestId="releases-api-table"
                            headers={releaseTableHeaders}
                            actions={[
                                {label:'View Release',onClick: (release) => openRelease(release.release_url)}
                            ]}
                            rows={apiReleases.data.data}
                        />
                    ) : (
                        <Box textAlign="center" padding={4}>
                            <SectionTitle data-test-id="releases-api-not-found-title">
                                No results.
                            </SectionTitle>
                            <Text data-test-id="releases-api-not-found-body">
                                No releases for InReach API yet.
                            </Text>
                        </Box>
                    )}
                    </Box>
                </Container>
        </Box>
    </Grid>
    </>
    )
}

export default DashboardPanelGithub;