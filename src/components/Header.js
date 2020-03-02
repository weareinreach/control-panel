import PropTypes from 'prop-types';
import React from 'react';
import {Link as RRLink} from 'react-router-dom';
import {Box, Link, Text} from '@chakra-ui/core';

const Header = props => {
  const {hasUser} = props;

  return (
    <header>
      <Box bg="blue.300" width="100%" padding={4} color="white">
        {hasUser ? (
          <>
            <Link as={RRLink} to="/" mr={2}>
              Home
            </Link>
            <Link as={RRLink} to="/organizations" mr={2}>
              Organizations
            </Link>
            <Link as={RRLink} to="/services" mr={2}>
              Services
            </Link>
            <Link as={RRLink} to="/users">
              Data Managers
            </Link>
          </>
        ) : (
          <Text>Login</Text>
        )}
      </Box>
    </header>
  );
};

Header.propTypes = {
  hasUser: PropTypes.bool
};

export default Header;
