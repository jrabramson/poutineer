import React from 'react';
import { Link } from 'react-router-dom';

export default ({
  nav
}) => {
  return (
    <header className="main-header">
      <Link to='/'>
        <img src='/images/poutineer.png' />
      </Link>
      <nav className="right">
        {nav()}
      </nav>
    </header>
  );
}
