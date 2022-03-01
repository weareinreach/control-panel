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
} from '@chakra-ui/react';

import Alert from './Alert';
import FormField from './FormField';
import {buildForm} from '../utils/forms';
import {useStatus} from '../utils/hooks';

const FormModal = (props) => {
  const {
    children,
    childrenProps,
    form,
    message,
    header,
    isAlert,
    isOpen,
    onClose,
    onConfirm,
    onVerify,
    size = 'lg',
  } = props;
  const {
    isError,
    isLoading,
    isSuccess,
    setError,
    setLoading,
    setSuccess,
    errorMessage,
    setErrorMessage
  } = useStatus();
  const {fields, initialValues} = buildForm(form);
  const onSubmit = (values) => {
    if (values.isVerify) {
      onVerify({setLoading, setSuccess, setError, setErrorMessage, values});
    } else {
      onConfirm({setLoading, setSuccess, setError, setErrorMessage, values});
    }
  };   
  const formik = useFormik({
    initialValues: {
      ...initialValues,
      isVerify: false,
    },
    onSubmit,
  });
  const updateField = (field, value) => {
    formik.setFieldValue(field, value);
  };
  const formFields = fields?.map(({key, ...rest}) => {
    return (
      <FormField data-test-id={key} key={key} fieldKey={key} formik={formik} {...rest} />
    );
  })
  const displayMessage = (message) => {
    return (
      <Text data-test-id="modal-message-custom">{message}</Text>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader data-test-id="modal-header">{header}</ModalHeader>
        <ModalCloseButton data-test-id="modal-close-button"/>
        <ModalBody>
          <Stack spacing={4}>
            {isSuccess && <Alert data-test-id="modal-success" title="Success." type="success" />}
            {isError && (
              <Alert
                data-test-id="modal-error"
                description={errorMessage ?? `Please try again.`}
                title="Uh-Oh something went wrong."
                type="error"
              />
            )}
            {isAlert && (
              <Text data-test-id="modal-message">Are you sure? You can't undo this action afterwards.</Text>
            )}
            {displayMessage(message)}
            {children && children({...childrenProps, formik, updateField})}
            {formFields}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button data-test-id="modal-cancel-button" disabled={isLoading} mr={2} onClick={onClose} variant="ghost">
            Cancel
          </Button>
          <Button
            data-test-id="modal-save-button"
            onClick={formik.handleSubmit}
            colorScheme={isAlert ? 'red' : 'blue'}
          >
            Save Changes
          </Button>
          {onVerify && <Button ml={2} onClick={(e) => {
              formik.setFieldValue('isVerify', true, false);
              formik.handleSubmit(e);
            }}
            colorScheme={isAlert ? 'red' : 'blue'}
            data-test-id="modal-save-and-verify-button"
            >
							Save and Verify
						</Button>
          }
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
  childrenProps: PropTypes.shape(),
  form: PropTypes.shape(),
  header: PropTypes.string,
  message: PropTypes.string,
  isAlert: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  onVerify: PropTypes.func,
  size: PropTypes.string,
};

export default FormModal;
