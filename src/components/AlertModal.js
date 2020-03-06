import PropTypes from 'prop-types';
import React, {useRef} from 'react';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  ModalCloseButton
} from '@chakra-ui/core';

const AlertModal = props => {
  const {header, isOpen, onClose, onConfirm} = props;
  const dialogRef = useRef();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={dialogRef}
      onClose={onClose}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>{header}</AlertDialogHeader>
        <ModalCloseButton />
        <AlertDialogBody>
          Are you sure? You can't undo this action afterwards.
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={dialogRef} onClick={onClose}>
            Cancel
          </Button>
          <Button variantColor="red" onClick={onConfirm} ml={3}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

AlertModal.propTypes = {
  dialogRef: PropTypes.object,
  header: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func
};

export default AlertModal;
