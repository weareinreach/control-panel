import PropTypes from 'prop-types';
import React from 'react';
import {Box, IconButton} from '@chakra-ui/core';

const Pagination = (props) => {
  const {getLastPage, getNextPage} = props;

  return (
    <Box marginTop={4}>
      <IconButton
        disabled={!getLastPage}
        onClick={getLastPage}
        icon="chevron-left"
        marginRight={2}
      />
      <IconButton
        disabled={!getNextPage}
        onClick={getNextPage}
        icon="chevron-right"
      />
    </Box>
  );
};

Pagination.propTypes = {
  getLastPage: PropTypes.func,
  getNextPage: PropTypes.func,
};

export default Pagination;
