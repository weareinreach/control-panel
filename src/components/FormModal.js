import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Stack,
  Text
} from '@chakra-ui/core';

import Alert from './Alert';

/**
 * TODO: move this code to utils.js
 */
const STATE_ERROR = 'ERROR';
const STATE_IN_PROGRESS = 'IN_PROGRESS';
const STATE_SUCCESS = 'SUCCESS';

const FormModal = props => {
  const {children, header, isAlert, isOpen, onClose, onConfirm, values} = props;
  const [status, setStatus] = useState();
  const isLoading = status === STATE_IN_PROGRESS;
  const setFail = () => setStatus(STATE_ERROR);
  const setLoading = () => setStatus(STATE_IN_PROGRESS);
  const setSuccess = () => setStatus(STATE_SUCCESS);
  const onSubmit = () =>
    onConfirm({
      setLoading,
      setSuccess,
      setFail,
      values
    });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            {status === STATE_SUCCESS && (
              <Alert title="Success." type="success" />
            )}
            {status === STATE_ERROR && (
              <Alert
                description="Please try again."
                title="Unable to login"
                type="error"
              />
            )}
            {children}
          </Stack>
          {isAlert && (
            <Text>Are you sure? You can't undo this action afterwards.</Text>
          )}
        </ModalBody>
        <ModalFooter>
          <Button disabled={isLoading} mr={2} onClick={onClose} variant="ghost">
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            onClick={onSubmit}
            loadingText="Waiting..."
            variantColor={isAlert ? 'red' : 'blue'}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

FormModal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  header: PropTypes.string,
  isAlert: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  values: PropTypes.shape()
};

export default FormModal;
