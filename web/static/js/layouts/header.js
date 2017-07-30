import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, withState, lifecycle } from 'recompose';
import { Link } from 'react-router-dom';
import ReactGravatar from 'react-gravatar';

import Header from '../components/header';
import { setDocumentTitle } from '../utils';
import { signOut } from '../actions/sessions';

const _navLoggedIn = (currentUser, onSignOut) => {
  return (
    <ul>
      <li>
        {_renderCurrentUser(currentUser)}
      </li>
      <li>
        <a href="#" onClick={_handleSignOutClick(onSignOut)}> Sign out</a>
      </li>
    </ul>
  );
};

const _navLoggedOut = () => {
  return (
    <ul>
      <li>
        <Link to="/sign_in">Sign In</Link>
      </li>
      <li>
        <Link to="/sign_up">Sign Up</Link>
      </li>
    </ul>
  );
};

const _renderCurrentUser = (currentUser) => {
  const fullName = [currentUser.first_name, currentUser.last_name].join(' ');

  return (
    <a className="current-user">
      <ReactGravatar className="react-gravatar" email={currentUser.email} /> {fullName}
    </a>
  );
};

const _handleSignOutClick = (onSignOut) => (e) => { e.preventDefault(); onSignOut() };

const mapStateToProps = ({ sessionReducer }) => ({
  currentUser: sessionReducer.currentUser,
  socket: sessionReducer.socket
});

export default compose(
  connect(mapStateToProps, {
    onSignOut: signOut
  }),
  withHandlers({
    nav: ({ currentUser, onSignOut }) => () => {
      return currentUser && _navLoggedIn(currentUser, onSignOut) || _navLoggedOut()
    }
  }),
  lifecycle({
    componentDidMount() {
      setDocumentTitle('Sign up');
    }
  })
)(Header)
