import React from 'react';
import {Box, Button, Input, Select, Stack, Text} from '@chakra-ui/core';
import PropTypes from 'prop-types';

import {SectionTitle} from '../components/styles';
import {useInputChange} from '../utils/hooks';

const propertyList = ['community-asylum-seeker', 'community-lgbt'];

const Filters = props => {
  const {updateQuery} = props;
  const [name, handleNameChange] = useInputChange();
  const [serviceArea, handleServiceAreaChange] = useInputChange();
  const [propValue, handlePropValueChange] = useInputChange('');
  const [propKey, handlePropKeyChange] = useInputChange('');
  const handleSearch = ev => {
    ev.preventDefault();

    const properties = {};

    if (propKey && propValue) {
      properties[propKey] = propValue;
    }

    if (serviceArea) {
      properties[serviceArea] = 'true';
    }

    updateQuery({name, properties});
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
          onChange={handlePropKeyChange}
          variant="filled"
          placeholder="Select a property"
        >
          {propertyList.map(prop => (
            <option key={prop}>{prop}</option>
          ))}
        </Select>
        {propKey && (
          <Input
            onChange={handlePropValueChange}
            variant="filled"
            placeholder="Enter a value"
            value={propValue}
          />
        )}
        <Box textAlign="right">
          <Button display="inline-block" onClick={handleSearch}>
            Search
          </Button>
        </Box>
      </Stack>
    </form>
  );
};

Filters.propTypes = {
  query: PropTypes.object,
  updateQuery: PropTypes.func
};

export default Filters;
