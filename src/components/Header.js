import {patch} from 'axios';
import Cookies from 'js-cookie';
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {Box, Link as ChakraLink, Text} from '@chakra-ui/core';

import {ContextApp} from './ContextApp';
import {ContextFormModal} from './ContextFormModal';
import DropdownButton from './DropdownButton';
import {Layout} from './styles';
import {COOKIE_LOGIN, getAPIUrl} from '../utils';

const logOutUser = () => {
  Cookies.remove(COOKIE_LOGIN);

  // Add a timeout to avoid a race condition with the cookie
  setTimeout(() => {
    window.location = '/login';
  }, 250);
};

const passwordForm = {
  password: {
    placeholder: 'Enter your new password',
    type: 'password'
  }
};

const Header = () => {
  const {hasUser, user} = useContext(ContextApp);
  const {closeModal, openModal} = useContext(ContextFormModal);
  const openPasswordModal = () =>
    openModal({
      form: passwordForm,
      header: `Change Password`,
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError, values}) => {
        const url = `${getAPIUrl()}/users/${user._id}/password`;

        if (!values.password) {
          return setError();
        }

        setLoading();
        patch(url, values)
          .then(() => {
            window.location.reload();
            setSuccess();
          })
          .catch(err => {
            console.error('An error occured while editing users');
            console.error(err);
            setError();
          });
      }
    });

  return (
    <header>
      <Box backgroundColor="blue.300" width="100%" color="white">
        <Layout>
          {hasUser ? (
            <>
              <Box display="inline-block" width="75%">
                <ChakraLink as={Link} fontSize="xl" to="/" mr={3}>
                  Home
                </ChakraLink>
                {user?.isAdminDataManager && (
                  <ChakraLink as={Link} fontSize="xl" to="/admin">
                    Admin
                  </ChakraLink>
                )}
              </Box>
              <Box display="inline-block" textAlign="right" width="25%">
                <DropdownButton
                  buttonProps={{
                    color: 'white',
                    backgroundColor: 'blue.500',
                    _hover: {bg: 'blue.400'}
                  }}
                  buttonText={user?.name || user?.email}
                  items={[
                    {onClick: openPasswordModal, text: 'Change Password'},
                    {onClick: logOutUser, text: 'Log Out'}
                  ]}
                />
              </Box>
            </>
          ) : (
            <Text>Login</Text>
          )}
        </Layout>
      </Box>
    </header>
  );
};

export default Header;
