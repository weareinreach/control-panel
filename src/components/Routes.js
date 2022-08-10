import React, {useContext} from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';

import {ContextApp} from './ContextApp';
import FormLogin from './FormLogin';
import Loading from './Loading';
import UnauthorizedPage from './UnauthorizedPage';
import {Layout} from './styles';
import Admin from '../pages/Admin';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import Organization from '../pages/Organization';
import Organizations from '../pages/Organizations';
import Service from '../pages/Service';
import Stats from '../pages/Stats';

const Routes = () => {
  const {loading, hasUser, user} = useContext(ContextApp);

  if (loading) {
    return <Loading />;
  }

  if (hasUser && !user.isAdminDataManager && !user.isDataManager) {
    return <UnauthorizedPage />;
  }
  return (
    <Layout>
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
        <Route exact path="/organizations/:orgId" component={Organization} />
        <Route
          exact
          path="/organizations/:orgId/services/:serviceId"
          component={Service}
        />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/stats" component={Stats} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default Routes;
