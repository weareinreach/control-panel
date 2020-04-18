import PropTypes from 'prop-types';
import React from 'react';
import {Box, IconButton, Text} from '@chakra-ui/core';

const Pagination = (props) => {
  const {currentPage, getLastPage, getNextPage, totalPages} = props;
  const isFirstPage = currentPage >= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <Box marginTop={4}>
      <IconButton
        disabled={isFirstPage}
        onClick={getLastPage}
        icon="chevron-left"
        marginRight={2}
      />
      <IconButton
        disabled={isLastPage}
        onClick={getNextPage}
        icon="chevron-right"
        marginRight={4}
      />
      {totalPages !== 0 && (
        <Text display="inline">
          Page {currentPage} of {totalPages}
        </Text>
      )}
    </Box>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  getLastPage: PropTypes.func,
  getNextPage: PropTypes.func,
  totalPages: PropTypes.number,
};

export default Pagination;
