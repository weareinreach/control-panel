

import {get} from 'axios';
import React, {useEffect, useState} from 'react';
import {Box, Grid} from '@chakra-ui/react';
import Table from '../components/Table';
import {Container, SectionTitle, Title} from '../components/styles';
import {CATALOG_API_URL} from '../utils';
import Loading from '../components/Loading';

const headers = [
    {key: 'country', label: 'Country'},
    {key: 'count', label: 'Count'},
];

const countryList = [
    {country: 'United States', tag: 'united_states'},
    {country: 'Canada', tag: 'canada'},
    {country: 'Mexico', tag: 'mexico'},
  ];


const StatsPanelVerified = (props)=>{
const loading = false;


const [orgStats, setOrgStats] = useState([]);
const [serviceStats, setserviceStats] = useState([]);

async function getStats(query, setStateFunction) {
  const promises = await countryList.map(async ({country, tag}) => {
    let url = `${CATALOG_API_URL}/reporting/${tag}/${query}/count`;
    const {data} = await get(url);
    return {
      country: country,
      count: data.count,
    };
  });
  const res = await Promise.all(promises);
  const total = res.map((item) => item.count).reduce((a, b) => a + b, 0);
  setStateFunction(res.concat([{country: 'total', count: total}]));
}


useEffect(() => {
    getStats('organizations', setOrgStats);
    getStats('services', setserviceStats);
  }, []);

return(
    <>
    <Title data-test-id="stats-verified-title">Verified</Title>
    <Grid minwidth={'500px'} templateColumns="1fr 350px" gap={4}>
      <Box>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Container>
              <Box>
                <SectionTitle data-test-id="stats-verified-section-title-organizations">Verified Organizations</SectionTitle>
                <Table tableDataTestId="stats-verified-table-organizations" headers={headers} rows={orgStats} />
              </Box>
            </Container>
            <Container marginTop={8}>
              <Box>
                <SectionTitle data-test-id="stats-verified-section-title-services">Verified Services</SectionTitle>
                <Table data-test-id="stats-verified-table-services" headers={headers} rows={serviceStats} />
              </Box>
            </Container>
          </>
        )}
      </Box>
    </Grid>
    </>
); 
};

export default StatsPanelVerified;