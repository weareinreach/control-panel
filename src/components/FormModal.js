import React from 'react';

import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from '@chakra-ui/core';

const Modal = props => {
  const {header, isOpen, onClose, renderBody, renderFooter} = props;

  return (
    <ChakraModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        {renderBody && <ModalBody>{renderBody()}</ModalBody>}
        {renderFooter && <ModalFooter>{renderFooter()}</ModalFooter>}
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
