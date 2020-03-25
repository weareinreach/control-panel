import PropTypes from 'prop-types';
import React from 'react';
import {
  Alert as ChakraAlert,
  AlertDescription,
  AlertIcon,
  AlertTitle
} from '@chakra-ui/core';

const Alert = props => {
  const {description, title, type} = props;

  return (
    <ChakraAlert marginBottom={4} status={type}>
      <AlertIcon />
      {title && <AlertTitle mr={2}>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </ChakraAlert>
  );
};

Alert.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string
};

export default Alert;
