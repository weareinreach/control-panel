import PropTypes from 'prop-types';
import React from 'react';
import {Box, Flex, Text} from '@chakra-ui/react';

import {SectionTitle} from './styles';

const MessagePage = (props) => {
  const {message, title} = props;

  return (
    <Flex align="center" justify="center" padding={4}>
      <Box flex="1" padding={5} rounded="md" borderWidth="1px" maxWidth="400px">
        <SectionTitle>{title}</SectionTitle>
        <Text>{message}</Text>
      </Box>
    </Flex>
  );
};

MessagePage.propTypes = {
  message: PropTypes.string,
  title: PropTypes.string,
};

export default MessagePage;
