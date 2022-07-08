import React, {useContext} from 'react';
import {Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react';
import { ContextApp } from '../components/ContextApp';
import UnauthorizedPage from '../components/UnauthorizedPage';
import { Helmet } from 'react-helmet';
import DashboardPanelGithub from '../components/DashboardPanelGithub'
import DashboardPanelAccess from '../components/DashboardPanelAccess';

//Components will go here


const Dashboard = () => {
    return(
        <>
            <Helmet title="Dashboard" />
            <Tabs>
                <TabList marginBottom={4}>
                    {/* <Tab data-test-id="dashboard-tab-admin">Access</Tab> */}
                    <Tab data-test-id="dashboard-tab-github">Github</Tab>
                </TabList>
                <TabPanels>
                {/* <TabPanel>
                        <DashboardPanelAccess/>
                    </TabPanel> */}
                    <TabPanel>
                        <DashboardPanelGithub/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
};

export default Dashboard;