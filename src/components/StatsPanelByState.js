

import {get} from 'axios';
import React, {useEffect, useState} from 'react';
import {Box, Grid,} from '@chakra-ui/react';
import Table from '../components/Table';
import {Container, SectionTitle, Title} from '../components/styles';
import {CATALOG_API_URL} from '../utils';
import Loading from '../components/Loading';

const headers = [
    {key: 'state', label: 'State'},
    {key: 'count', label: 'Count'},
];

const countryList = [
    {country: 'United States', tag: 'united-states'},
    {country: 'Canada', tag: 'canada'},
    {country: 'Mexico', tag: 'mexico'},
  ];


const StatsPanelByState = (props)=>{
const loading = false;


const [orgUnitedStatesStats, setUSOrgStats] = useState([]);
const [orgMexicosStats, setMexicoOrgStats] = useState([]);
const [orgCanadaStats, setCanadaOrgStats] = useState([]);
const [serviceUnitedStatesStats, setUSserviceStats] = useState([]);
const [servicMexicoStats,setMexicoserviceStats ] = useState([]);
const [serviceCanadaStats, setCanadaserviceStats] = useState([]);


function formatState(state){
   //Separate hypens
   let words = (state.replace(/-/g,' ')).split(" ");
   for(let i=0;i < words.length;i++){
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
   }
   //join them
   return words.join(" ");
}

async function getStats(query, tag, setStateFunction) {
    let url = `${CATALOG_API_URL}/reporting/${tag}/${query}`;
    const {data} = await get(url);
    let res = data[tag];
    //Format names
    res.map((item) => {item.state = formatState(item.state)});
    const total = res.map((item) => item.count).reduce((a, b) => a + b, 0);
    setStateFunction(res.concat([{state: 'total', count: total}]));
}


useEffect(() => {
    getStats('orgsByState','united-states',setUSOrgStats);
    getStats('orgsByState','mexico',setMexicoOrgStats);
    getStats('orgsByState','canada',setCanadaOrgStats);
    getStats('servicesByState','united-states',setUSserviceStats);
    getStats('servicesByState','mexico',setMexicoserviceStats);
    getStats('servicesByState','canada',setCanadaserviceStats);
  }, []);

return(
    <>
    <Title data-test-id="stats-by-state-title">By State</Title>
    <Grid minwidth={'500px'} templateColumns="1fr 350px" gap={4}>
      <Box>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Container>
              <Box>
                <SectionTitle data-test-id="stats-by-state-us-organizations">Organizations By State In United States</SectionTitle>
                <Table tableDataTestId="stats-by-state-us-table-organizations" headers={headers} rows={orgUnitedStatesStats} />
              </Box>
            </Container>
            <Container marginTop={8}>
              <Box>
                <SectionTitle data-test-id="stats-by-state-mexico-organizations">Organizations By State In Mexico</SectionTitle>
                <Table tableDataTestId="stats-by-state-mexico-table-organizations" headers={headers} rows={orgMexicosStats} />
              </Box>
            </Container>
            <Container  marginTop={8}>
              <Box>
                <SectionTitle data-test-id="stats-by-state-canada-organizations">Organizations By State in Canada</SectionTitle>
                <Table tableDataTestId="stats-by-state-canada-table-organizations" headers={headers} rows={orgCanadaStats} />
              </Box>
            </Container>
            <Container marginTop={8}>
            <Box>
                <SectionTitle data-test-id="stats-by-state-us-services">Services By State In United States</SectionTitle>
                <Table tableDataTestId="stats-by-state-us-table-services" headers={headers} rows={serviceUnitedStatesStats} />
              </Box>
            </Container>
            <Container marginTop={8}>
              <Box>
                <SectionTitle data-test-id="stats-by-state-mexico-services">Services By State In Mexico</SectionTitle>
                <Table tableDataTestId="stats-by-state-mexico-table-services" headers={headers} rows={servicMexicoStats} />
              </Box>
            </Container>
            <Container marginTop={8}>
              <Box>
                <SectionTitle data-test-id="stats-by-state-canada-services">Services By State in Canada</SectionTitle>
                <Table tableDataTestId="stats-by-state-canada-table-services" headers={headers} rows={serviceCanadaStats} />
              </Box>
            </Container>
          </>
        )}
      </Box>
    </Grid>
    </>
); 
};

export default StatsPanelByState;