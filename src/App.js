import _isEmpty from 'lodash/isEmpty';
import React, {createContext, useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import {CSSReset, ThemeProvider} from '@chakra-ui/core';

import Admin from './pages/Admin';
import ErrorBoundary from './components/ErrorBoundary';
import FormLogin from './components/FormLogin';
import Header from './components/Header';
import Loading from './components/Loading';
import NotFound from './pages/NotFound';
import Organization from './pages/Organization';
import Organizations from './pages/Organizations';
import Service from './pages/Service';
import Services from './pages/Services';
import User from './pages/User';

export const AppContext = createContext('app');

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const hasUser = user && !_isEmpty(user);

  // TODO: Add API logic for checking/loading the user
  useEffect(() => {
    const fakeUser = {email: 'user@email.com', isAdmin: true};

    setUser(fakeUser);
    setLoading(false);
  }, []);

  return (
    <ThemeProvider>
      <CSSReset />
      <AppContext.Provider value={{hasUser, loading, setLoading}}>
        <Router>
          <Header user={user} />
          <ErrorBoundary>
            {loading ? (
              <Loading />
            ) : (
              <Switch>
                <Route
                  exact
                  path="/login"
                  component={() => (
                    <>
                      {hasUser && <Redirect to="/" />}
                      <FormLogin />
                    </>
                  )}
                />
                {!hasUser && <Redirect to="/login" />}
                <Route exact path="/" component={Organizations} />
                <Route exact path="/organizations" component={Organizations} />
                <Route
                  exact
                  path="/organizations/:id"
                  component={Organization}
                />
                <Route exact path="/services" component={Services} />
                <Route exact path="/services/:id" component={Service} />
                <Route exact path="/admin" component={Admin} />
                <Route exact path="/managers/:id" component={User} />
                <Route component={NotFound} />
              </Switch>
            )}
          </ErrorBoundary>
        </Router>
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default App;
