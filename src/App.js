import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={() => <p>about</p>} />
        <Route exact path="/user" component={() => <p>user</p>} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
