import _omit from 'lodash/omit';
import React, {useState} from 'react';
import {
  Box,
  Button,
  Checkbox,
  Input,
  Select,
  Stack,
  Text,
} from '@chakra-ui/core';
import PropTypes from 'prop-types';

import {SectionTitle} from '../components/styles';
import {
  additionalInformationProperties,
  communityProperties,
  costProperties,
  eligibilityRequirementProperties,
  languageProperties,
} from '../data/properties.json';
import {useInputChange} from '../utils/hooks';

const propertyList = [
  additionalInformationProperties,
  communityProperties,
  costProperties,
  eligibilityRequirementProperties,
  languageProperties,
]
  .reduce((result, propertyCategory) => {
    result = result.concat(
      propertyCategory
        .filter(({type}) => type === 'checkbox')
        .map(({key}) => key)
    );

    return result;
  }, [])
  .sort();

const Filters = (props) => {
  const {updateQuery} = props;
  const [name, handleNameChange] = useInputChange();
  const [serviceArea, handleServiceAreaChange] = useInputChange();
  const [properties, setProperties] = useState({});
  const handleSelect = (ev) => {
    const value = ev.target.value;

    setProperties({
      ...properties,
      [value]: 'true',
    });
  };
  const propertyKeys = Object.keys(properties);
  const removeProperty = (property) => {
    setProperties(_omit(properties, [property]));
  };
  const handleSearch = (ev) => {
    ev.preventDefault();

    const searchProperties = {...properties};

    if (serviceArea) {
      searchProperties[serviceArea] = 'true';
    }

    updateQuery({name, properties: searchProperties});
  };

  return (
    <form onSubmit={handleSearch}>
      <SectionTitle>Filter Organizations</SectionTitle>
      <Stack>
        <Text>Name Contains:</Text>
        <Input
          onChange={handleNameChange}
          variant="filled"
          placeholder="Search on name"
          value={name}
        />
        <Text>Service Area Coverage:</Text>
        <Input
          onChange={handleServiceAreaChange}
          variant="filled"
          placeholder="Search on a service area"
          value={serviceArea}
        />
        <Text>Properties:</Text>
        <Select
          onChange={handleSelect}
          variant="filled"
          placeholder="Select a property"
          value=""
        >
          {propertyList.map((prop) => (
            <option key={prop}>{prop}</option>
          ))}
        </Select>
        {propertyKeys?.map((key) => (
          <Checkbox
            key={key}
            defaultIsChecked
            onChange={() => removeProperty(key)}
          >
            {key}
          </Checkbox>
        ))}
        <Box textAlign="right">
          <Button
            display="inline-block"
            onClick={handleSearch}
            variantColor="blue"
          >
            Search
          </Button>
        </Box>
      </Stack>
    </form>
  );
};

Filters.propTypes = {
  query: PropTypes.object,
  updateQuery: PropTypes.func,
};

export default Filters;
