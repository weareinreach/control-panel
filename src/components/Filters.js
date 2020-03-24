// import {get} from 'axios';
// import _debounce from 'lodash/debounce';
import React, {useEffect, useState} from 'react';
import {Box, Button, Input, Select} from '@chakra-ui/core';

import {getAPIUrl} from '../utils';
import {useInputChange} from '../utils/hooks';

const Filters = props => {
  const {query, updateQuery} = props;
  // const {handleQuery} = props;
  const [search, handleSearchChange] = useInputChange();

  const handleSearch = ev => {
    ev.preventDefault();

    console.log('handleSearch', query);

    updateQuery({...query, name: search});
  };

  return (
    <Box>
      <form onSubmit={handleSearch}>
        <Input
          onChange={handleSearchChange}
          display="inline-block"
          width="25%"
          variant="filled"
          placeholder="Filled"
          value={search}
        />
        <Select
          rootProps={{display: 'inline-block', width: '25%', color: 'red'}}
          variant="filled"
          placeholder="Filled"
        >
          <option>hello</option>
          <option>hello</option>
          <option>hello</option>
        </Select>
        <Button display="inline-block" onClick={handleSearch} width="25%">
          Search
        </Button>
      </form>
    </Box>
  );
};

export default Filters;
