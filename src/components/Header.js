import PropTypes from 'prop-types';
import React from 'react';
import {Link as RRLink} from 'react-router-dom';
import {Box, Button, Link, Text} from '@chakra-ui/core';

const Header = props => {
  const {hasUser} = props;
  // TODO: get from props
  const user = {};

  return (
    <header>
      <Box bg="blue.300" width="100%" padding={4} color="white">
        {hasUser ? (
          <>
            <Link as={RRLink} to="/" mr={2}>
              Organizations
            </Link>
            <Link as={RRLink} to="/services" mr={2}>
              Services
            </Link>
            {user.isAdmin && (
              <>
                <Link as={RRLink} to="/users">
                  Data Managers
                </Link>
                <Link as={RRLink} to="/users">
                  Users
                </Link>
              </>
            )}
            <Box float="right">
              <Text as={RRLink} to="/users" mr={2}>
                user@email.com
              </Text>
              <Button color="white" variant="link" to="/users">
                Logout
              </Button>
            </Box>
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
