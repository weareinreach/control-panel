import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {Box, Link as ChakraLink, Text} from '@chakra-ui/core';

import {ContextApp} from './ContextApp';
import {ContextFormModal} from './ContextFormModal';
import DropdownButton from './DropdownButton';
import {Layout} from './styles';

const logOutUser = () => {
  window.location = '/login';
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
      onConfirm: handlePasswordChange
    });
  const handlePasswordChange = ({setLoading, setSuccess, setError, values}) => {
    setLoading();

    // TODO: API logic for duplicating
    console.log('handlePasswordChange', values);

    setTimeout(() => {
      setSuccess();

      if (values?.password) {
        window.location.reload();
      }
    }, 3000);
  };

  return (
    <header>
      <Box backgroundColor="blue.300" width="100%" color="white">
        <Layout>
          {hasUser ? (
            <>
              <Box display="inline-block" width="calc(100% - 172px)">
                <ChakraLink as={Link} fontSize="xl" to="/" mr={3}>
                  Home
                </ChakraLink>
                {/* {user?.isAdmin && (
                  <ChakraLink as={Link} fontSize="xl" to="/admin">
                    Admin
                  </ChakraLink>
                )} */}
              </Box>
              <DropdownButton
                buttonProps={{
                  color: 'white',
                  backgroundColor: 'blue.500',
                  _hover: {bg: 'blue.400'}
                }}
                buttonText={user?.email}
                items={[
                  {onClick: openPasswordModal, text: 'Change Password'},
                  {onClick: logOutUser, text: 'Log Out'}
                ]}
              />
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