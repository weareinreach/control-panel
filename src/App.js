import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/romello">User</Link>
        </header>
        <Switch>
          <Route exact path="/">
            Home
          </Route>
          <Route path="/about">About</Route>
          <Route path="/:user">User</Route>
          <Route>NoMatch</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
