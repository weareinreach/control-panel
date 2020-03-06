import PropTypes from 'prop-types';
import React from 'react';
import {Link as RRLink} from 'react-router-dom';
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text
} from '@chakra-ui/core';

import FormModal from '../components/FormModal';
import {useInputChange, useToggle} from '../utils/hooks';

const logOutUser = () => {
  window.location = '/login';
};

const Header = props => {
  const {user} = props;
  const [isPasswordModalOpen, togglePasswordModal] = useToggle();
  const [showPassword, toggleShowPassword] = useToggle();
  const [password, setPassword] = useInputChange();
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
          {user ? (
            <>
              <Box display="inline-block" width="calc(100% - 172px)">
                <Link as={RRLink} to="/" mr={2}>
                  Organizations
                </Link>
                <Link as={RRLink} to="/services" mr={2}>
                  Services
                </Link>
                {user?.isAdmin && (
                  <Link as={RRLink} to="/admin" mr={2}>
                    Admin
                  </Link>
                )}
              </Box>
              <Menu>
                <MenuButton
                  as={Button}
                  backgroundColor="blue.400"
                  _hover={{bg: 'blue.500'}}
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
        renderBody={() => (
          <>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={showPassword ? 'text' : 'password'}
                onChange={setPassword}
                placeholder="Enter password"
                value={password}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={toggleShowPassword}>
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </>
        )}
        renderFooter={() => (
          <>
            <Button onClick={changePassword} variantColor="blue" mr={3}>
              Change Password
            </Button>
            <Button onClick={togglePasswordModal} variant="ghost">
              Cancel
            </Button>
          </>
        )}
      />
    </>
  );
};

Header.propTypes = {
  hasUser: PropTypes.bool
};

export default Header;
