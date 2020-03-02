import React, {createContext, useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import {CSSReset, ThemeProvider} from '@chakra-ui/core';

import ErrorBoundary from './components/ErrorBoundary';
import FormLogin from './components/FormLogin';
import Header from './components/Header';
import Loading from './components/Loading';
import CreateOrganization from './pages/CreateOrganization';
import CreateService from './pages/CreateService';
import CreateUser from './pages/CreateUser';
import EditOrganization from './pages/EditOrganization';
import EditService from './pages/EditService';
import EditUser from './pages/EditUser';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Organization from './pages/Organization';
import OrganizationList from './pages/OrganizationList';
import Service from './pages/Service';
import ServiceList from './pages/ServiceList';
import UserList from './pages/UserList';

export const AppContext = createContext('app');

const App = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const hasUser = user || true;

  // TODO: API logic here
  useEffect(() => {
    // setLoading(false);
  }, []);

  return (
    <ThemeProvider>
      <CSSReset />
      <AppContext.Provider value={{hasUser, loading, setLoading}}>
        <Router>
          <Header hasUser={hasUser} />
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
                {!hasUser && <Redirect to="login" />}
                <Route exact path="/" component={Home} />
                <Route
                  exact
                  path="/organizations"
                  component={OrganizationList}
                />
                <Route
                  exact
                  path="/organizations/create"
                  component={CreateOrganization}
                />
                <Route
                  exact
                  path="/organizations/:id"
                  component={Organization}
                />
                <Route
                  exact
                  path="/organizations/:id/edit"
                  component={EditOrganization}
                />
                <Route exact path="/services" component={ServiceList} />
                <Route
                  exact
                  path="/services/create"
                  component={CreateService}
                />
                <Route exact path="/services/:id" component={Service} />
                <Route
                  exact
                  path="/services/:id/edit"
                  component={EditService}
                />
                <Route exact path="/users" component={UserList} />
                <Route exact path="/users/create" component={CreateUser} />
                <Route exact path="/users/:id/edit" component={EditUser} />
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
