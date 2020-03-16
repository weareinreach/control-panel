import React, {useContext} from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';

import {ContextApp} from './ContextApp';
import FormLogin from './FormLogin';
import Loading from './Loading';
import {Layout} from './styles';
import Admin from '../pages/Admin';
import NotFound from '../pages/NotFound';
import Organization from '../pages/Organization';
import Organizations from '../pages/Organizations';
import Service from '../pages/Service';
import Services from '../pages/Services';

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
        <Route exact path="/organizations/:id" component={Organization} />
        <Route exact path="/services" component={Services} />
        <Route exact path="/services/:id" component={Service} />
        <Route exact path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default Routes;
