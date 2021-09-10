import React, {useContext} from 'react';
import {Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react';

import AdminPanelSuggestions from '../components/AdminPanelSuggestions';
import AdminPanelUsers from '../components/AdminPanelUsers';
import {ContextApp} from '../components/ContextApp';
import Helmet from '../components/Helmet';
import UnauthorizedPage from '../components/UnauthorizedPage';

const Admin = () => {
  const {user} = useContext(ContextApp);

  if (!user?.isAdminDataManager) {
    return <UnauthorizedPage />;
  }

  return (
    <>
      <Helmet title="Admin" />
      <Tabs>
        <TabList marginBottom={4}>
          <Tab data-test-id="admin-tab-users">Users</Tab>
          <Tab data-test-id="admin-tab-suggestions">Suggestions</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AdminPanelUsers />
          </TabPanel>
          <TabPanel>
            <AdminPanelSuggestions />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Admin;
