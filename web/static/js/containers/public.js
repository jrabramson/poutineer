import React            from 'react';
import { connect }      from 'react-redux';
import Header           from '../layouts/header';

export default ({ children }) => {
  return (
    <div id="public_container" className="application-container">
      <Header/>

      <div className='main-container'>
        {children}
      </div>
    </div>
  );
}
