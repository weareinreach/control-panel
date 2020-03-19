import React from 'react';
import {Box, Button, Input, Select} from '@chakra-ui/core';

const Filters = props => {
  return (
    <Box>
      <Select
        rootProps={{display: 'inline-block', width: '25%', color: 'red'}}
        variant="filled"
        placeholder="Filled"
      >
        <option>hello</option>
        <option>hello</option>
        <option>hello</option>
      </Select>
      <Input
        display="inline-block"
        width="25%"
        variant="filled"
        placeholder="Filled"
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
      <Button display="inline-block" width="25%" />
    </Box>
  );
};

export default Filters;
