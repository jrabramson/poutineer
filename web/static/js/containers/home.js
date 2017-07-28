import React            from 'react';
import { connect }      from 'react-redux';
import PoutineMap from '../components/map';

export default () => {
  return (
    <div className="view-container index">
      <div style={{ width: '100%', height: '100%', position: 'relative' }}> 
        <PoutineMap />
      </div>
    </div>
  );
};