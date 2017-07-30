import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, withState, lifecycle } from 'recompose';

import { setDocumentTitle } from '../../utils';

import Home from '../../containers/home';

const mapStateToProps = ({ sessionReducer }) => {
  return {
    location: sessionReducer.location,
    currentUser: sessionReducer.currentUser
  }
};

export default compose(
  lifecycle({
    componentDidMount() {      
      setDocumentTitle('Poutineer');
    }
  })
)(Home)
