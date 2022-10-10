import PropTypes from 'prop-types';
import React from 'react';

import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  Select,
  Text,
  Textarea,
  Tooltip,
  Divider,
} from '@chakra-ui/react';
import {FetchLatLongBtn} from './ButtonFetchLatLong';

import PasswordInput from './PasswordInput';

const FormField = (props) => {
  const {
    description,
    fieldKey,
    formik,
    isRequired,
    label,
    options,
    placeholder,
    type,
    ...rest
  } = props;
  let isDivider = false;
  let InputComponent = null;
  let isCheckBox = false;
  let isSelect = false;
  let isButton = false;

  switch (type) {
    case 'checkbox':
      isCheckBox = true;
      InputComponent = Checkbox;
      break;
    case 'password':
      InputComponent = PasswordInput;
      break;
    case 'select':
      isSelect = true;
      InputComponent = Select;
      break;
    case 'divider':
      isDivider = true;
      InputComponent = Divider;
      break;
    case 'textarea':
      InputComponent = Textarea;
      break;
    case 'latlonbtn':
      isButton = true;
      InputComponent = FetchLatLongBtn;
      break;
    default:
      InputComponent = Input;
  }

  const inputProps = {
    ...(formik?.getFieldProps(fieldKey) || {}),
    id: fieldKey,
    placeholder,
  };
  const toolTipIcon = description && (
    <Tooltip hasArrow label={description} placement="top" zIndex={9999}>
      <Icon name="info-outline" />
    </Tooltip>
  );

  return (
    <FormControl
      key={fieldKey}
      isInvalid={formik?.errors[fieldKey] && formik?.touched[fieldKey]}
      isRequired={isRequired}
      {...rest}
    >
      {isCheckBox ? (
        <InputComponent {...inputProps} isChecked={inputProps.value}>
          <Text display="inline">{label}</Text> {toolTipIcon}
        </InputComponent>
      ) : (
        <>
          {label && (
            <>
              <FormLabel htmlFor={fieldKey}>{label}</FormLabel> {toolTipIcon}
            </>
          )}
          {isDivider ? (
            <InputComponent {...inputProps} size={inputProps.size} />
          ) : null}
          {isSelect ? (
            <InputComponent {...inputProps}>
              {options.map(({label, value}) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </InputComponent>
          ) : isButton ? (
            <InputComponent formik={formik} />
          ) : (
            <InputComponent {...inputProps} />
          )}
        </>
      )}
      <FormErrorMessage>{formik?.errors[fieldKey]}</FormErrorMessage>
    </FormControl>
  );
};

FormField.propTypes = {
  description: PropTypes.string,
  fieldKey: PropTypes.string,
  formik: PropTypes.shape(),
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape()),
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

export default FormField;
