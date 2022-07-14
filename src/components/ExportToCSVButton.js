import { ExportToCsv } from 'export-to-csv';
import { Button } from '@chakra-ui/react';
import { getOrgQueryUrls } from '../utils';
import { useAPIGet } from '../utils/hooks';
//import { useEffect, useState } from 'react';

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
          //lastUpdated = resultsData.data.organizations[i].updated_at;
          lastUpdated = ''
          //link = `/organizations/${resultsData.data.organizations[i]._id}`;
          link = ''
          newData = {name: name, lastUpdated: lastUpdated, link: link}
          organizationsResultsData = organizationsResultsData.concat(newData)
        }

        let finalData = [];
        let filtersApplied = [];
        let someString = '';
        //apply filters if used
        console.log(query);
        //Name
        if(query.name) {
          filtersApplied = filtersApplied.concat({name: 'Name', lastUpdated: query.name, link: ''});
        }
        //Properties
        if(Object.keys(query.properties).length !== 0) {
          for(var prop in query.properties){
            if(someString === ''){
              someString = someString.concat(prop);
            }else{
              someString = someString.concat(' AND ',prop)
            }
          }
          filtersApplied = filtersApplied.concat({name: 'Properties', lastUpdated: someString, link: ''});
        }
        //Published
        if(!query.pending) {
          filtersApplied = filtersApplied.concat({name: 'Publish Status', lastUpdated: 'IS published', link: ''});
        }
        //Claimed
        if(!query.pendingOwnership) {
          filtersApplied = filtersApplied.concat({name: 'Claimed Status', lastUpdated: 'IS claimed', link: ''});
        }
        //Tags
        if(query.tagLocale != "") {
          let tagString = "";
          if(query.tagLocale == "canada") {
            tagString = "Canada";
          } else if (query.tagLocale == "united_states") {
            tagString = "United States";
          } else {
            //Mexico
            tagString = "Mexico";
          }
          if(query.tags.length > 0) {
            tagString = tagString.concat(" - ");
            for (let i = 0; i < query.tags.length; i++) {
              console.log(query.tags)
              if(i === 0){
                if(query.tags[i].includes(".")){
                  tagString = tagString.concat(query.tags[i].split(".")[1]);
                }else{
                  tagString = tagString.concat(query.tags[i])
                }
              }else{
                if(query.tags[i].includes(".")){
                  tagString = tagString.concat(' AND/OR ',query.tags[i].split(".")[1]);
                }else{
                  tagString = tagString.concat(' AND/OR ',query.tags[i])
                }              
              }
            }
          }
          filtersApplied = filtersApplied.concat({name: 'Tags', lastUpdated: tagString, link: ''});
        }
        //Last Verified
        if(query.lastVerified != "") {
          filtersApplied = filtersApplied.concat({name: 'Last Verified', lastUpdated: query.lastVerified, link: ''});
        }
        //Last Verified Start
        if(query.lastVerifiedStart != "") {
          filtersApplied = filtersApplied.concat({name: 'Last Verified Start', lastUpdated: query.lastVerifiedStart, link: ''});
        }
        //Last Verified End
        if(query.lastVerifiedEnd != "") {
          filtersApplied = filtersApplied.concat({name: 'Last Verified End', lastUpdated: query.lastVerifiedEnd, link: ''});
        }
        //Last Updated
        if(query.lastUpdated != "") {
          filtersApplied = filtersApplied.concat({name: 'Last Updated', lastUpdated: query.lastUpdated, link: ''});
        }
        //Last Updated Start
        if(query.lastUpdatedStart != "") {
          filtersApplied = filtersApplied.concat({name: 'Last Updated Start', lastUpdated: query.lastUpdatedStart, link: ''});
        }
        //Last Updated End
        if(query.lastUpdatedEnd != "") {
          filtersApplied = filtersApplied.concat({name: 'Last Updated End', lastUpdated: query.lastUpdatedEnd, link: ''});
        }
        //Created At
        if(query.createdAt != "") {
          filtersApplied = filtersApplied.concat({name: 'Created At', lastUpdated: query.createdAt, link: ''});
        }
        //Created At Start
        if(query.createdAtStart != "") {
          filtersApplied = filtersApplied.concat({name: 'Created At Start', lastUpdated: query.createdAtStart, link: ''});
        }
        //Created At End
        if(query.createdAtEnd != "") {
          filtersApplied = filtersApplied.concat({name: 'Created At End', lastUpdated: query.createdAtEnd, link: ''});
        }
      
        if(filtersApplied.length > 0) {
          filtersApplied.unshift({name: 'FILTERS APPLIED', lastUpdated: '', link: ''});
          filtersApplied = filtersApplied.concat({name: '', lastUpdated: '', link: ''});
        }
        filtersApplied = filtersApplied.concat({name: `RESULTS [${resultsData.data.organizations.length}]`, lastUpdated: '', link: ''});
        finalData = filtersApplied.concat(organizationsResultsData);
        
        //generate CSV from data
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