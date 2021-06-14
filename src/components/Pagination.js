import PropTypes from 'prop-types';
import React from 'react';
import {Box, IconButton, Text} from '@chakra-ui/react';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';

const Pagination = (props) => {
  const {
    currentPage,
    getLastPage,
    getNextPage,
    renderAdditionalStats,
    totalPages,
  } = props;
  const isFirstPage = currentPage >= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <Box marginTop={4}>
      <IconButton
        disabled={isFirstPage}
        onClick={getLastPage}
        icon={<FaChevronLeft/>}
        marginRight={2}
      />
      <IconButton
        disabled={isLastPage}
        onClick={getNextPage}
        icon={<FaChevronRight/>}
        marginRight={4}
      />
      {totalPages !== 0 && (
        <Text display="inline">
          Page {currentPage} of {totalPages}.
        </Text>
      )}
      {renderAdditionalStats && renderAdditionalStats()}
    </Box>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  getLastPage: PropTypes.func,
  getNextPage: PropTypes.func,
  totalPages: PropTypes.number,
  renderAdditionalStats: PropTypes.func,
};

export default Pagination;
