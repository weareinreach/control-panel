import {get, post} from 'axios';
import Cookies from 'js-cookie';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, {createContext, useEffect, useState} from 'react';

import {COOKIE_LOGIN, getAPIUrl} from '../utils';

export const ContextApp = createContext('app');

export const ContextAppProvider = props => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const hasUser = user && !_isEmpty(user);
  const value = {hasUser, loading, user};

  useEffect(() => {
    const token = Cookies.get(COOKIE_LOGIN);
    const handleUserErr = err => {
      console.error('An error occured while logging in users');
      console.error(err);
      setLoading(false);
    };

    if (!token) {
      return setLoading(false);
    }

    const url = `${getAPIUrl()}/auth/check`;
    const body = {token};

    post(url, body)
      .then(({data}) => {
        const userUrl = `${getAPIUrl()}/users/${data._id}`;

        get(userUrl)
          .then(({data}) => {
            setUser(data);
            setLoading(false);
          })
          .catch(handleUserErr);
      })
      .catch(handleUserErr);
  }, []);

  return (
    <ContextApp.Provider value={value}>{props.children}</ContextApp.Provider>
  );
};

ContextAppProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
