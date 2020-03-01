import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <header className="App-header">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/not-found">Not Found</Link>
    </header>
  );
};

export default Header;
