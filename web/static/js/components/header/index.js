import React from 'react';
import { Link } from 'react-router-dom';

export default ({
  nav
}) => {
  return (
    <header className="main-header">
      <Link to='/'>
        <span className='logo'/>
      </Link>
      <nav className="right">
        {nav()}
      </nav>
    </header>
  );
}
