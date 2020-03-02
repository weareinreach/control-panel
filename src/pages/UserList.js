import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from '@chakra-ui/core';

const UserList = () => (
  <>
    <Link to="/users/create">
      <Button>Create User</Button>
    </Link>
    <p>UserList</p>
  </>
);

export default UserList;
