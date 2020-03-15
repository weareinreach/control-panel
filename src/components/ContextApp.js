import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, {createContext, useEffect, useState} from 'react';

export const ContextApp = createContext('app');

export const ContextAppProvider = props => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const hasUser = user && !_isEmpty(user);
  const value = {hasUser, loading, user};

  // TODO: Add API logic for checking/loading the user
  useEffect(() => {
    const fakeUser = {email: 'user@email.com', isAdmin: true};

    setUser(fakeUser);
    setLoading(false);
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
