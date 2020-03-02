import PropTypes from 'prop-types';
import React from 'react';
import {
  AlertDialog as ChakraAlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button
} from '@chakra-ui/core';

const AlertDialog = props => {
  const {dialogRef, header, isOpen, onClose, onConfirm} = props;

  return (
    <ChakraAlertDialog
      isOpen={isOpen}
      leastDestructiveRef={dialogRef}
      onClose={onClose}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          {header}
        </AlertDialogHeader>
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
    </ChakraAlertDialog>
  );
};

AlertDialog.propTypes = {
  dialogRef: PropTypes.object,
  header: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func
};

export default AlertDialog;
