import PropTypes from 'prop-types';
import React from 'react';
import {
  Box,
  CircularProgress,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/core';

const Loading = () => {
  return (
    <Flex align="center" justify="center" padding={4}>
      <Box color="white" isOpen>
        <CircularProgress isIndeterminate color="gray"></CircularProgress>
      </Box>
    </Flex>
  );
};

export default Loading;

export const LoadingModal = (props) => {
  const {isOpen} = props;

  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay bg="rgba(255,255,255,0.4)" />
      <ModalContent bg="none" shadow="none">
        <Loading />
      </ModalContent>
    </Modal>
  );
};

LoadingModal.propTypes = {
  isOpen: PropTypes.bool,
};
