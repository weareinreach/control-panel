import {useFormik} from 'formik';
import _reduce from 'lodash/reduce';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {
  Button,
  Checkbox,
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
  Stack,
  Text
} from '@chakra-ui/core';

import Alert from './Alert';
import PasswordInput from './PasswordInput';

/**
 * TODO: move this code to utils.js
 */
const STATE_ERROR = 'ERROR';
const STATE_IN_PROGRESS = 'IN_PROGRESS';
const STATE_SUCCESS = 'SUCCESS';

const initialValueDict = {
  checkbox: false,
  password: '',
  text: ''
};

export const buildForm = (form = {}) => {
  return _reduce(
    form,
    (values, {initialValue, ...inputInfo}, key) => {
      values.initialValues[key] = initialValue || '';

      // Apply the defaut if we still don't have a value
      if (
        typeof values.initialValues[key] === 'undefined' &&
        typeof initialValueDict?.[inputInfo?.type] !== 'undefined'
      ) {
        values.initialValues[key] = initialValueDict?.[inputInfo?.type];
      }

      values.inputs.push({...inputInfo, key});

      return values;
    },
    {initialValues: {}, inputs: []}
  );
};

const FormModal = props => {
  const {form, header, isAlert, isOpen, onClose, onConfirm} = props;
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
          {inputs && (
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
              {inputs?.map(input => {
                const key = input?.key;
                const label = input?.label;
                let InputComponent = null;
                let isCheckBox = false;

                switch (input?.type) {
                  case 'checkbox':
                    isCheckBox = true;
                    InputComponent = Checkbox;
                    break;
                  case 'password':
                    InputComponent = PasswordInput;
                    break;
                  default:
                    InputComponent = Input;
                }

                const inputProps = {
                  ...(formik?.getFieldProps(key) || {}),
                  id: key,
                  placeholder: input?.placeholder
                };

                return (
                  <FormControl
                    key={key}
                    isInvalid={formik?.errors[key] && formik?.touched[key]}
                  >
                    {isCheckBox ? (
                      <InputComponent
                        {...inputProps}
                        isChecked={inputProps.value}
                      >
                        {label}
                      </InputComponent>
                    ) : (
                      <>
                        {label && <FormLabel htmlFor={key}>{label}</FormLabel>}
                        <InputComponent {...inputProps} />
                      </>
                    )}
                    <FormErrorMessage>{formik?.errors[key]}</FormErrorMessage>
                  </FormControl>
                );
              })}
            </Stack>
          )}
          {isAlert && (
            <Text>Are you sure? You can't undo this action afterwards.</Text>
          )}
        </ModalBody>
        <ModalFooter>
          <Button disabled={isLoading} onClick={onClose} variant="ghost" mr={2}>
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
  form: PropTypes.shape(),
  header: PropTypes.string,
  isAlert: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func
};

export default FormModal;
