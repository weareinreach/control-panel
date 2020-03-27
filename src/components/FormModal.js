import {useFormik} from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
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
  Text,
} from '@chakra-ui/core';

import Alert from './Alert';
import FormField from './FormField';
import {buildForm} from '../utils/forms';
import {useStatus} from '../utils/hooks';

const FormModal = (props) => {
  const {children, form, header, isAlert, isOpen, onClose, onConfirm} = props;
  const {
    isError,
    isLoading,
    isSuccess,
    setError,
    setLoading,
    setSuccess,
  } = useStatus();
  const {initialValues, inputs} = buildForm(form);
  const onSubmit = (values) =>
    onConfirm({setLoading, setSuccess, setError, values});
  const formik = useFormik({initialValues, onSubmit});

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            {isSuccess && <Alert title="Success." type="success" />}
            {isError && (
              <Alert
                description="Please try again."
                title="Uh-Oh something went wrong."
                type="error"
              />
            )}
            {isAlert && (
              <Text>Are you sure? You can't undo this action afterwards.</Text>
            )}
            {children}
            {inputs?.map(({key, ...rest}) => {
              return (
                <FormField key={key} fieldKey={key} formik={formik} {...rest} />
              );
            })}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button disabled={isLoading} mr={2} onClick={onClose} variant="ghost">
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            onClick={formik.handleSubmit}
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
    PropTypes.node,
  ]),
  form: PropTypes.shape(),
  header: PropTypes.string,
  isAlert: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default FormModal;
