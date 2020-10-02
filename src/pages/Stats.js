import {get} from 'axios';
import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@chakra-ui/core';
import _values from 'lodash/values';
import Helmet from '../components/Helmet';
import Table from '../components/Table';
import { Container, SectionTitle, Title } from '../components/styles';
import { CATALOG_API_URL, getOrgQueryUrls, getServiceQueryUrls } from '../utils';
import Loading from '../components/Loading';
import { normalizeField } from '../components/FormCoverage';
import USStates from '../data/us-states.json';
import CanadianProvinces from '../data/canadian-provinces.json';
import MexicanStates from '../data/mexican-states.json';

const USStateServiceAreas = _values(USStates).map(state => (`service-state-${normalizeField(state)}`));
const CanadianStateServiceAreas = _values(CanadianProvinces).map(province => (`service-state-${normalizeField(province.name)}`));
const MexicanStateServiceAreas = _values(MexicanStates.states).map(state => (`service-state-${normalizeField(state.name)}`));
const CountryServiceAreaMapping = [
  {country: "United States", serviceAreas: USStateServiceAreas.concat(["service-national-united-states"])},
  {country: "Canada", serviceAreas: CanadianStateServiceAreas.concat(["service-national-canada"])},
  {country: "Mexico", serviceAreas: MexicanStateServiceAreas.concat(["service-national-mexico"])},
]

const headers = [
  { key: 'country', label: 'Country' },
  { key: 'count', label: 'Count' },
];


const Stats = () => {
  const loading = false;

  const [orgStats, setOrgStats] = useState([]);
  const [serviceStats, setserviceStats] = useState([]);

  function getStats(queryFunction, setStateFunction){
    const promises = CountryServiceAreaMapping.map(({country, serviceAreas}) => {
      let query = {
        "serviceArea": serviceAreas.join(),
        "verified": true,
      };
      let urls = queryFunction(query);

      let url = `${CATALOG_API_URL}${urls.count}`;
      console.log('GET:', url);
  
      return get(url)
        .then(({data}) => {
          return {
            country: country,
            count: data.count
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    })

    Promise
      .all(promises)
        .then((resp) => {
          const total = resp.map(item => item.count).reduce((a, b) => a + b, 0);
          setStateFunction(resp.concat([{country: "total", count: total}]));
        })
        .catch((err) => {
          throw new Error(err);
        })
  }

  useEffect(() => {
    getStats(getOrgQueryUrls, setOrgStats);
    getStats(getServiceQueryUrls, setserviceStats);
  }, [])

  return (
    <>
      <Helmet title="Stats" />
      <Title>Stats</Title>
      <Grid minwidth={'500px'} templateColumns="1fr 350px" gap={4}>
        <Box>
          {loading ? (
            <Loading />
          ) : (
              <>
                <Container>
                  <Box>
                      <SectionTitle>Verified Organizations</SectionTitle>
                      <Table
                        headers={headers}
                        rows={orgStats}
                      />
                  </Box>
                </Container>
                <Container>
                  <Box>
                      <SectionTitle>Verified Services</SectionTitle>
                      <Table
                        headers={headers}
                        rows={serviceStats}
                      />
                  </Box>
                </Container>
              </>
            )}
        </Box>
      </Grid>
    </>
  );
};





export default Stats;
