import React, {useState} from 'react';
import {Box, Button, Input, Select, Stack, Text} from '@chakra-ui/core';
import PropTypes from 'prop-types';

import {SectionTitle} from '../components/styles';
import {useInputChange} from '../utils/hooks';

const Filters = props => {
  const {query, updateQuery} = props;
  const [name, handleNameChange] = useInputChange(query?.name);
  const [properties, setProperties] = useState(query?.properties);

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
          display="inline-block"
          variant="filled"
          placeholder="Search on name"
          value={name}
        />
        <Text>Properties:</Text>
        <Select
          rootProps={{display: 'inline-block', color: 'red'}}
          variant="filled"
          placeholder="Select a property"
        >
          {/* <option>hello</option> */}
        </Select>
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
  query: PropTypes.string,
  updateQuery: PropTypes.func
};

export default Filters;
