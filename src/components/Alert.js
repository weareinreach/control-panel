import PropTypes from 'prop-types';
import React from 'react';
import {
  Alert as ChakraAlert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';

const Alert = (props) => {
  const {description, title, type} = props;

  return (
    <ChakraAlert data-test-id="alert-container" marginBottom={4} status={type} flexDirection="column">
      <AlertIcon data-test-id="alert-icon"/>
      {title && <AlertTitle mr={2} data-test-id="alert-title">{title}</AlertTitle>}
      {description && <AlertDescription data-test-id="alert-description">{description}</AlertDescription>}
    </ChakraAlert>
  );
};

Alert.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
};

export default Alert;
