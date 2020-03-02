import React from 'react';
import {Link as RRLink} from 'react-router-dom';
import {Link} from '@chakra-ui/core';

const ButtonLink = ({to, ...rest}) => (
  <Link as={RRLink} to={to} {...rest}>
    Home
  </Link>
);

export default ButtonLink;
