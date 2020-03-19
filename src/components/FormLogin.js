import React from 'react';
import {Box, Button, Flex, Input, Stack} from '@chakra-ui/core';

import Alert from './Alert';
import PasswordInput from './PasswordInput';
import {SectionTitle} from './styles';
import {useStatus, useInputChange} from '../utils/hooks';

const Login = () => {
  const [email, setEmail] = useInputChange('');
  const {
    isError,
    isLoading,
    isSuccess,
    setError,
    setLoading,
    setSuccess
  } = useStatus();
  const [password, setPassword] = useInputChange('');
  const loginUser = () => {
    // TODO: Logic for checking credentials and saving a cookie
    setLoading();

    setTimeout(() => {
      setError();
    }, 1500);

    setTimeout(() => {
      setSuccess();
    }, 3000);
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
            variantColor="blue"
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Login;
