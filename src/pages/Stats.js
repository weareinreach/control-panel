import React, {useContext} from 'react';
import {Tabs, Tab, TabList, TabPanel, TabPanels} from '@chakra-ui/react';
import Helmet from '../components/Helmet';
import {ContextApp} from '../components/ContextApp';
import StatsPanelVerified from '../components/StatsPanelVerified';
import UnauthorizedPage from '../components/UnauthorizedPage';
import StatsPanelNationalServices from '../components/StatsPanelNationalServices';
import StatsPanelByState from '../components/StatsPanelByState';


/**
 * corresponds with country property in service.tags
 * e.g. service.tags.united_states.Mental or service.tags.canada.Legal
 **/

const Stats = () => {

  const {user} = useContext(ContextApp);

  if (!user?.isAdminDataManager) {
    return <UnauthorizedPage />;
  }

  return (
    <>
      <Helmet title="Stats" />
      <Tabs>
         <TabList marginBottom={4}>
         <Tab data-test-id="stats-1">Verified</Tab>
         <Tab data-test-id="stats-2">National Reach</Tab>
         <Tab data-test-id="stats-3">By State</Tab>
         </TabList>
        <TabPanels>
          <TabPanel>
            <StatsPanelVerified />
          </TabPanel>
          <TabPanel>
            <StatsPanelNationalServices />
          </TabPanel>
          <TabPanel>
            <StatsPanelByState />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Stats;

