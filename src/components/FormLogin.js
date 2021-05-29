import {post} from 'axios';
import Cookies from 'js-cookie';
import React from 'react';
import {Box, Button, Flex, Input, Stack} from '@chakra-ui/react';

import Alert from './Alert';
import PasswordInput from './PasswordInput';
import {SectionTitle} from './styles';
import {CATALOG_API_URL, COOKIE_LOGIN} from '../utils';
import {useStatus, useInputChange} from '../utils/hooks';

const Login = () => {
  const [email, setEmail] = useInputChange('');
  const {
    isError,
    isLoading,
    isSuccess,
    setError,
    setLoading,
    setSuccess,
  } = useStatus();
  const [password, setPassword] = useInputChange('');
  const loginUser = () => {
    const url = `${CATALOG_API_URL}/auth`;
    const body = {email, password};

    setLoading();

    post(url, body)
      .then(({data}) => {
        if (!data.token || !data.valid) {
          return setError();
        }

        Cookies.set(COOKIE_LOGIN, data.token);
        setSuccess();
        // Add a timeout to avoid a race condition with the cookie
        setTimeout(() => {
          window.location = '/';
        }, 250);
      })
      .catch((err) => {
        console.error('An error occured while logging in users');
        console.error(err);

        setError();
      });
  };

  return (
    <Flex align="center" justify="center" padding={4}>
      <Box flex="1" padding={5} rounded="md" borderWidth="1px" maxWidth="400px">
        <SectionTitle>Login</SectionTitle>
        <Stack paddingTop={4} spacing={4}>
          {isSuccess && (
            <Alert
              description="Redirecting to the portal"
              title="Success."
              type="success"
            />
          )}
          {isError && (
            <Alert
              description="Please try again."
              title="Unable to login"
              type="error"
            />
          )}
          <Input placeholder="Email" onChange={setEmail} value={email} />
          <PasswordInput
            placeholder="Password"
            onChange={setPassword}
            value={password}
          />
          <Button
            isLoading={isLoading}
            onClick={loginUser}
            loadingText="Logging..."
            colorScheme="blue"
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Login;
