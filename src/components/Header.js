import {patch} from 'axios';
import Cookies from 'js-cookie';
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {Box, Link as ChakraLink, Text} from '@chakra-ui/react';

import {ContextApp} from './ContextApp';
import {ContextFormModal} from './ContextFormModal';
import DropdownButton from './DropdownButton';
import {Layout} from './styles';
import {passwordFields} from '../data/fields.json';
import {CATALOG_API_URL, COOKIE_LOGIN} from '../utils';

const logOutUser = () => {
  Cookies.remove(COOKIE_LOGIN);

  // Add a timeout to avoid a race condition with the cookie
  setTimeout(() => {
    window.location = '/login';
  }, 250);
};

const Header = () => {
  const {hasUser, user} = useContext(ContextApp);
  const {closeModal, openModal} = useContext(ContextFormModal);
  const openPasswordModal = () =>
    openModal({
      form: {fields: passwordFields},
      header: `Change Password`,
      onClose: closeModal,
      onConfirm: ({setLoading, setSuccess, setError, values}) => {
        const url = `${CATALOG_API_URL}/users/${user._id}/password`;

        if (!values.password) {
          return setError();
        }

        setLoading();
        patch(url, values)
          .then(() => {
            window.location.reload();
            setSuccess();
          })
          .catch((err) => {
            console.error('An error occured while editing users');
            console.error(err);
            setError();
          });
      },
    });

  return (
    <header>
      <Box backgroundColor="blue.300" width="100%" color="white">
        <Layout>
          {hasUser ? (
            <>
              <Box display="inline-block" width="75%">
                <ChakraLink data-test-id="header-home-link" as={Link} fontSize="xl" to="/" mr={3}>
                  Home
                </ChakraLink>
                {user?.isAdminDataManager && (
                  <ChakraLink data-test-id="header-admin-link" as={Link} fontSize="xl" to="/admin" mr={3}>
                    Admin
                  </ChakraLink>
                )}
                  <ChakraLink data-test-id="header-dashboard-link" as={Link} fontSize="xl" to="/dashboard" mr={3}>
                    Dashboard
                  </ChakraLink>
                <ChakraLink data-test-id="header-stats-link" as={Link} fontSize="xl" to="/stats">
                    Stats
                </ChakraLink>
              </Box>
              <Box display="inline-block" data-test-id="header-profile-box" textAlign="right" width="25%">
                <DropdownButton
                  data-test-
                  buttonProps={{
                    color: 'white',
                    backgroundColor: 'blue.500',
                    _hover: {bg: 'blue.400'},
                  }}
                  buttonText={user?.name || user?.email}
                  items={[
                    {onClick: openPasswordModal, text: 'Change Password'},
                    {onClick: logOutUser, text: 'Log Out'},
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
