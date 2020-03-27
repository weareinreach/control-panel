import PropTypes from 'prop-types';
import React from 'react';
import {Button, Input, InputGroup, InputRightElement} from '@chakra-ui/core';

import {useToggle} from '../utils/hooks';

const PasswordInput = (props) => {
  const {onChange, placeholder, value, ...rest} = props;
  const [showPassword, toggleShowPassword] = useToggle();

  return (
    <InputGroup size="md" {...rest}>
      <Input
        pr="4.5rem"
        type={showPassword ? 'text' : 'password'}
        onChange={onChange}
        placeholder={placeholder || 'Enter password'}
        value={value}
        {...rest}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={toggleShowPassword}>
          {showPassword ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

PasswordInput.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default PasswordInput;
