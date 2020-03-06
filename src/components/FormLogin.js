import React, {useState} from 'react';
import {Box, Button, Flex, Heading, Input, Stack} from '@chakra-ui/core';

import Alert from './Alert';
import PasswordInput from './PasswordInput';
import {STATE_FAIL, STATE_SAVING, STATE_SUCCESS} from '../utils/consts';
import {useInputChange} from '../utils/hooks';

const Login = () => {
  const [email, setEmail] = useInputChange('');
  const [password, setPassword] = useInputChange('');
  const [loginState, setLoginState] = useState('');
  const loginUser = () => {
    // TODO: Logic for checking credentials and saving a cookie
    setLoginState(STATE_SAVING);

    setTimeout(() => {
      setLoginState(STATE_SUCCESS);
    }, 5000);
  };

  return (
    <Flex align="center" justify="center" padding={4}>
      <Box flex="1" padding={5} rounded="md" borderWidth="1px" maxWidth="400px">
        <Heading fontSize="xl">Login</Heading>
        <Stack paddingTop={4} spacing={4}>
          {loginState === STATE_SUCCESS && (
            <Alert
              description="Redirecting to the portal"
              title="Success."
              type="success"
            />
          )}
          {loginState === STATE_FAIL && (
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
          {loginState === STATE_SAVING ? (
            <Button isLoading loadingText="Logging" variant="outline">
              Submit
            </Button>
          ) : (
            <Button onClick={loginUser}>Login</Button>
          )}
        </Stack>
      </Box>
    </Flex>
  );
};

export default Login;
