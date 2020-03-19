import PropTypes from 'prop-types';
import React from 'react';
import {Box, IconButton} from '@chakra-ui/core';

const Pagination = props => {
  const {getLastPage, getNextPage} = props;

  return (
    <Box marginTop={4}>
      <IconButton onClick={getLastPage} icon="chevron-left" marginRight={2} />
      <IconButton onClick={getNextPage} icon="chevron-right" />
    </Box>
  );
};

Pagination.propTypes = {
  getLastPage: PropTypes.func,
  getNextPage: PropTypes.func
};

export default Pagination;
