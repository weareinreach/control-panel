import React, {useContext} from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';

import {ContextApp} from './ContextApp';
import FormLogin from './FormLogin';
import Loading from './Loading';
import {Layout} from './styles';
import Admin from '../pages/Admin';
import NotFound from '../pages/NotFound';
import Organization from '../pages/Organization';
import OrganizationEdit from '../pages/OrganizationEdit';
import OrganizationNew from '../pages/OrganizationNew';
import Organizations from '../pages/Organizations';
import Service from '../pages/Service';
import ServiceEdit from '../pages/ServiceEdit';
import ServiceNew from '../pages/ServiceNew';

const Routes = () => {
  const {loading, hasUser} = useContext(ContextApp);

  if (loading) {
    return <Loading />;
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
        <Route exact path="/organizations/new" component={OrganizationNew} />
        <Route exact path="/organizations/:orgId" component={Organization} />
        <Route
          exact
          path="/organizations/:orgId/edit"
          component={OrganizationEdit}
        />
        <Route
          exact
          path="/organizations/:orgId/services/new"
          component={ServiceNew}
        />
        <Route
          exact
          path="/organizations/:orgId/services/:serviceId"
          component={Service}
        />
        <Route
          exact
          path="/organizations/:orgId/services/:serviceId/edit"
          component={ServiceEdit}
        />
        <Route exact path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default Routes;
