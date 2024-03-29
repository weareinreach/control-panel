import PropTypes from 'prop-types';
import React from 'react';
import {Box as ChakraBox, Heading as ChakraHeading} from '@chakra-ui/react';

export const Container = ({children, ...rest}) => (
  <ChakraBox data-test-id="box" padding={5} rounded="md" borderWidth="1px" {...rest}>
    {children}
  </ChakraBox>
);

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export const Layout = ({children, ...rest}) => (
  <ChakraBox data-test-id="layout" maxWidth="1500px" margin="auto" padding={4} {...rest}>
    {children}
  </ChakraBox>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export const SectionTitle = ({children, ...rest}) => (
  <ChakraHeading data-test-id="section-title" fontSize="xl" marginBottom={2} {...rest}>
    {children}
  </ChakraHeading>
);

SectionTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export const Title = ({children, ...rest}) => (
  <ChakraHeading data-test-id="title" fontSize="2xl" marginBottom={6} {...rest}>
    {children}
  </ChakraHeading>
);

Title.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
