import _map from 'lodash/map';
import React, {useState} from 'react';
import {Box, Button, Input, Select, Stack, Text} from '@chakra-ui/core';
import PropTypes from 'prop-types';

import {SectionTitle} from '../components/styles';
import {useInputChange} from '../utils/hooks';

const propertyList = ['community-asylum-seeker', 'community-lgbt'];

const Filters = props => {
  const {query, updateQuery} = props;
  const [name, handleNameChange] = useInputChange(query?.name);
  const [properties, setProperties] = useState(query?.properties);
  const handlePropValueChange = prop => ev => {
    const value = ev.target.value;

    setProperties({
      ...properties,
      [prop]: value
    });
  };
  const handleSelect = ev => {
    const prop = ev.target.value;

    setProperties({
      ...properties,
      [prop]: properties?.[prop] || ''
    });
  };
  const handleSearch = ev => {
    ev.preventDefault();

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
        <Text>Properties:</Text>
        <Select
          onChange={handleSelect}
          variant="filled"
          placeholder="Select a property"
        >
          {propertyList.map(prop => (
            <option key={prop}>{prop}</option>
          ))}
        </Select>
        {_map(properties, (value, key) => {
          return (
            <>
              <Text>{key}</Text>
              <Input
                key={key}
                onChange={handlePropValueChange(key)}
                variant="filled"
                placeholder="Enter a value"
                value={value}
              />
            </>
          );
        })}
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
