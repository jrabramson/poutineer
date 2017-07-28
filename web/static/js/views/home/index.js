import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, withState, lifecycle } from 'recompose';
import classnames from 'classnames';
import {GoogleApiWrapper} from 'google-maps-react';

import { setDocumentTitle } from '../../utils';

import Home from '../../containers/home';

const mapStateToProps = ({ sessionReducer }) => {
  return {
    location: sessionReducer.location,
    currentUser: sessionReducer.currentUser
  }
};

export default compose(
  connect(mapStateToProps, {}),
  withHandlers({

  }),
  lifecycle({
    componentDidMount() {      
      setDocumentTitle('Poutineer');
    }
  })
)(Home)
