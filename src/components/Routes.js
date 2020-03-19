import React, {useContext} from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';

import {ContextApp} from './ContextApp';
import FormLogin from './FormLogin';
import Loading from './Loading';
import {Layout} from './styles';
import Admin from '../pages/Admin';
import NotFound from '../pages/NotFound';
import Organization from '../pages/Organization';
import OrganizationFormPage from '../pages/OrganizationFormPage';
import Organizations from '../pages/Organizations';
import ServiceFormPage from '../pages/ServiceFormPage';
import Service from '../pages/Service';

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
        <Route
          exact
          path="/organizations/new"
          component={props => <OrganizationFormPage {...props} />}
        />
        <Route exact path="/organizations/:orgId" component={Organization} />
        <Route
          exact
          path="/organizations/:orgId/duplicate"
          component={props => <OrganizationFormPage isDuplicate {...props} />}
        />
        <Route
          exact
          path="/organizations/:orgId/edit"
          component={props => <OrganizationFormPage isEdit {...props} />}
        />
        <Route
          exact
          path="/organizations/:orgId/services/new"
          component={props => <ServiceFormPage {...props} />}
        />
        <Route
          exact
          path="/organizations/:orgId/services/:serviceId"
          component={Service}
        />
        <Route
          exact
          path="/organizations/:orgId/services/:serviceId/duplicate"
          component={props => <ServiceFormPage isDuplicate {...props} />}
        />
        <Route
          exact
          path="/organizations/:orgId/services/:serviceId/edit"
          component={props => <ServiceFormPage isEdit {...props} />}
        />
        <Route exact path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default Routes;
