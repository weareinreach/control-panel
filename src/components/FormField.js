import PropTypes from 'prop-types';
import React from 'react';

import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea
} from '@chakra-ui/core';

import PasswordInput from './PasswordInput';

const FormField = props => {
  const {
    fieldKey,
    formik,
    isRequired,
    placeholder,
    label,
    type,
    ...rest
  } = props;
  let InputComponent = null;
  let isCheckBox = false;

  switch (type) {
    case 'checkbox':
      isCheckBox = true;
      InputComponent = Checkbox;
      break;
    case 'password':
      InputComponent = PasswordInput;
      break;
    case 'textarea':
      InputComponent = Textarea;
      break;
    default:
      InputComponent = Input;
  }

  const inputProps = {
    ...(formik?.getFieldProps(fieldKey) || {}),
    id: fieldKey,
    placeholder
  };

  return (
    <FormControl
      key={fieldKey}
      isInvalid={formik?.errors[fieldKey] && formik?.touched[fieldKey]}
      isRequired={isRequired}
      {...rest}
    >
      {isCheckBox ? (
        <InputComponent {...inputProps} isChecked={inputProps.value}>
          {label}
        </InputComponent>
      ) : (
        <>
          {label && <FormLabel htmlFor={fieldKey}>{label}</FormLabel>}
          <InputComponent {...inputProps} />
        </>
      )}
      <FormErrorMessage>{formik?.errors[fieldKey]}</FormErrorMessage>
    </FormControl>
  );
};

FormField.propTypes = {
  fieldKey: PropTypes.string,
  formik: PropTypes.shape(),
  isRequired: PropTypes.bool,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string
};

export default FormField;
