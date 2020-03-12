import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {
  Box,
  Button,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text
} from '@chakra-ui/core';

import {ContextApp} from './ContextApp';
import FormModal from './FormModal';
import PasswordInput from './PasswordInput';

import {useInputChange, useToggle} from '../utils/hooks';

const logOutUser = () => {
  window.location = '/login';
};

const Header = props => {
  const {hasUser, user} = useContext(ContextApp);
  const [password, setPassword] = useInputChange();
  const [isPasswordModalOpen, togglePasswordModal] = useToggle();
  const changePassword = () => {
    // TODO: API logic for changing the password
    if (password) {
      window.location.reload();
    }
  };

  return (
    <>
      <header>
        <Box backgroundColor="blue.300" width="100%" padding={4} color="white">
          {hasUser ? (
            <>
              <Box display="inline-block" width="calc(100% - 172px)">
                <ChakraLink as={Link} fontSize="xl" to="/" mr={3}>
                  Organizations
                </ChakraLink>
                <ChakraLink as={Link} fontSize="xl" to="/services" mr={3}>
                  Services
                </ChakraLink>
                {user?.isAdmin && (
                  <ChakraLink as={Link} fontSize="xl" to="/admin">
                    Admin
                  </ChakraLink>
                )}
              </Box>
              <Menu>
                <MenuButton
                  as={Button}
                  backgroundColor="blue.500"
                  _hover={{bg: 'blue.400'}}
                  rightIcon="chevron-down"
                >
                  {user?.email}
                </MenuButton>
                <MenuList color="black">
                  <MenuItem onClick={togglePasswordModal}>
                    Change Password
                  </MenuItem>
                  <MenuItem onClick={logOutUser}>Log Out</MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <Text>Login</Text>
          )}
        </Box>
      </header>
      <FormModal
        header="Change Password"
        isOpen={isPasswordModalOpen}
        onClose={togglePasswordModal}
        onConfirm={changePassword}
      >
        <PasswordInput
          placeholder="Password"
          onChange={setPassword}
          value={password}
        />
      </FormModal>
    </>
  );
};

Header.propTypes = {
  hasUser: PropTypes.bool
};

export default Header;
