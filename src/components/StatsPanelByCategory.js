

import {get} from 'axios';
import React, {useEffect, useState} from 'react';
import {Box, Grid,} from '@chakra-ui/react';
import Table from '../components/Table';
import {Container, SectionTitle, Title} from '../components/styles';
import {CATALOG_API_URL} from '../utils';
import Loading from '../components/Loading';

const headers = [
    {key: 'category', label: 'Category'},
    {key: 'count', label: 'Count'},
];

const countryList = [
    {country: 'United States', tag: 'united-states'},
    {country: 'Canada', tag: 'canada'},
    {country: 'Mexico', tag: 'mexico'},
  ];


const StatsPanelByCategory = (props)=>{
const loading = false;


const [categoriesUSStats, setUSCategoryStats] = useState([]);
const [categoriesMexicoStats, setMexicoCategoryStats] = useState([]);
const [categoriesCanadaStats, setCanadaCategoryStats] = useState([]);


async function getStats(query,tag, setStateFunction) {
    let url = `${CATALOG_API_URL}/reporting/${tag}/${query}`;
    const {data} = await get(url);
    let res = data.result;
    const total = res.map((item) => item.count).reduce((a, b) => a + b, 0);
    setStateFunction(res.concat([{category: 'total', count: total}]));
}


useEffect(() => {
    getStats('categories','united-states', setUSCategoryStats);
    getStats('categories','mexico', setMexicoCategoryStats);
    getStats('categories','canada', setCanadaCategoryStats);
}, []);

return(
    <>
    <Title data-test-id="stats-by-category-title">By Category</Title>
    <Grid minwidth={'500px'} templateColumns="1fr 350px" gap={4}>
      <Box>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Container>
              <Box>
                <SectionTitle data-test-id="stats-us-services-by-category">Services by Category In United States</SectionTitle>
                <Table tableDataTestId="stats-us-services-by-category-table" headers={headers} rows={categoriesUSStats} />
              </Box>
            </Container>
            <Container marginTop={8}>
              <Box>
                <SectionTitle data-test-id="stats-mexico-services-by-category">Services by Category In Mexico</SectionTitle>
                <Table tableDataTestId="stats-us-services-by-category-table" headers={headers} rows={categoriesMexicoStats} />
              </Box>
            </Container>
            <Container marginTop={8}>
              <Box>
                <SectionTitle data-test-id="stats-canada-services-by-category">Services by Category In Canada</SectionTitle>
                <Table tableDataTestId="stats-us-services-by-category-table" headers={headers} rows={categoriesCanadaStats} />
              </Box>
            </Container>
          </>
        )}
      </Box>
    </Grid>
    </>
); 
};

export default StatsPanelByCategory;