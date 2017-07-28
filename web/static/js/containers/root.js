import React                        from 'react';
import { Provider }                 from 'react-redux';
import { Router, RoutingContext }   from 'react-router';
import invariant                    from 'invariant';
import Routes                       from '../routes';

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default Root;
