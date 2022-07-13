import { ExportToCsv } from 'export-to-csv';
import { Button } from '@chakra-ui/react';
import { getOrgQueryUrls } from '../utils';
import { useAPIGet } from '../utils/hooks';
import { useEffect, useState } from 'react';

const csvOptions = { 
  filename: 'organizations-results',
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalSeparator: '.',
  showLabels: false, 
  showTitle: false,
  title: 'Organizations',
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: false,
};

const ExportToCSVButton = ({margin='0px', query}) => {
      
      //make a deep copy of query (will not change the original)
      let resultsQuery = JSON.parse(JSON.stringify(query));
      //change page to -1 to indicate we want to get all data from getOrgQueryUrls (non-paginated)
      resultsQuery.page = -1;
      const resultsDataUrls = getOrgQueryUrls(resultsQuery);
      const resultsData = useAPIGet(resultsDataUrls.organizations);

      /* State code for disabling export button
      const [load, setLoad] = useState(false);
      useEffect( () => {
          if(resultsData.data == null) {
            setLoad(true);
          } else {
            setLoad(false);
          }
      }, [resultsData]);
      */

    const handleCSV = () => {
       let organizationsResultsData = [];
       let name = ''
       let lastUpdated = ''
       let link = ''
       let newData = {name: '', lastUpdated: '', link: ''}
        //make the data array
        for(let i = 0; i < resultsData.data.organizations.length; i++) {
          name = resultsData.data.organizations[i].name;
          lastUpdated = resultsData.data.organizations[i].updated_at;
          link = `/organizations/${resultsData.data.organizations[i]._id}`;
          newData = {name: name, lastUpdated: lastUpdated, link: link}
          organizationsResultsData = organizationsResultsData.concat(newData)
        }

        let finalData = [];
        let filtersApplied = [];
        //apply filters if used
    
        if(filtersApplied.length > 0) {
          filtersApplied.unshift({name: 'Filters Applied', lastUpdated: '', link: ''});
          filtersApplied = filtersApplied.concat({name: '', lastUpdated: '', link: ''});
        }
        filtersApplied = filtersApplied.concat({name: `Results [${resultsData.data.organizations.length}]`, lastUpdated: '', link: ''});
        finalData = filtersApplied.concat(organizationsResultsData);
        const csvExporter = new ExportToCsv(csvOptions);
        csvExporter.generateCsv(finalData);
      }

    return (
        <Button 
        onClick={handleCSV}
        //disabled={load}
        style={{marginLeft: margin}}>Export to CSV</Button>
    );
};

export default ExportToCSVButton;