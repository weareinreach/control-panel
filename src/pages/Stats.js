import React, {useContext} from 'react';
import {Tabs, Tab, TabList, TabPanel, TabPanels} from '@chakra-ui/react';
import Helmet from '../components/Helmet';
import {ContextApp} from '../components/ContextApp';
import StatsPanelVerified from '../components/StatsPanelVerified';
import UnauthorizedPage from '../components/UnauthorizedPage';
import StatsPanelNationalServices from '../components/StatsPanelNationalServices';
import StatsPanelByState from '../components/StatsPanelByState';
import StatsPanelByCategory from '../components/StatsPanelByCategory';


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
         <Tab data-test-id="stats-verified-tab">Verified</Tab>
         <Tab data-test-id="stats-national-reach-tab">National Reach</Tab>
         <Tab data-test-id="stats-by-state-tab">By State</Tab>
         <Tab data-test-id="stats-by-category-tab">By Category</Tab>
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
          <TabPanel>
            <StatsPanelByCategory />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Stats;

