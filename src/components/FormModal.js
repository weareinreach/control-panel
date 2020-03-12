import {useFormik} from 'formik';
import _reduce from 'lodash/reduce';
import React, {useState} from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Stack
} from '@chakra-ui/core';

import Alert from './Alert';

/**
 * TODO: move this code to utils.js
 */
const STATE_ERROR = 'ERROR';
const STATE_IN_PROGRESS = 'IN_PROGRESS';
const STATE_SUCCESS = 'SUCCESS';

const initialValueDict = {
  password: '',
  text: ''
};

const buildForm = form => {
  return _reduce(
    form,
    (values, {initialValue, ...inputInfo}, key) => {
      console.log('values', values);

      values.initialValues[key] =
        initialValue || initialValueDict?.[inputInfo?.type] || '';
      values.inputs.push({...inputInfo, key});

      return values;
    },
    {initialValues: {}, inputs: []}
  );
};

const FormModal = props => {
  const {form, header, isOpen, onClose, onConfirm} = props;
  const [status, setStatus] = useState();
  const setFail = () => setStatus(STATE_ERROR);
  const setLoading = () => setStatus(STATE_IN_PROGRESS);
  const setSuccess = () => setStatus(STATE_SUCCESS);
  const isLoading = status === STATE_IN_PROGRESS;
  const {initialValues, inputs} = buildForm(form);
  const onSubmit = values =>
    onConfirm({setLoading, setSuccess, setFail, values});
  const formik = useFormik({initialValues, onSubmit});

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            {status === STATE_SUCCESS && (
              <Alert
                description="Redirecting to the portal"
                title="Success."
                type="success"
              />
            )}
            {status === STATE_ERROR && (
              <Alert
                description="Please try again."
                title="Unable to login"
                type="error"
              />
            )}
            {inputs?.map(input => {
              const key = input?.key;

              return (
                <FormControl
                  isInvalid={formik?.errors[key] && formik?.touched[key]}
                >
                  <FormLabel htmlFor={key}>{key}</FormLabel>
                  <Input
                    {...(formik?.getFieldProps(key) || {})}
                    id={key}
                    placeholder={input?.placeholder}
                  />
                  <FormErrorMessage>{formik?.errors[key]}</FormErrorMessage>
                </FormControl>
              );
            })}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button disabled={isLoading} onClick={onClose} variant="ghost" mr={2}>
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            onClick={formik.handleSubmit}
            loadingText="Waiting..."
            variantColor="blue"
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FormModal;
