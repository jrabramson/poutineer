import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, withState, lifecycle } from 'recompose';

import { signUp } from '../../actions/registrations.js';

import Registration from '../../components/registrations';

import { setDocumentTitle, renderErrorsFor } from '../../utils';

const mapStateToProps = ({ registrationReducer }) => ({
  errors: registrationReducer.errors,
  renderErrorsFor: renderErrorsFor
});

export default compose(
  connect(mapStateToProps, {
    onSignUp: signUp
  }),
  withState('creds', 'setCreds', {}),
  withHandlers({
    handleSubmit: ({ creds, onSignUp }) => (e) => {
      e.preventDefault();
      onSignUp(creds);
    },
    setFirstName: ({ setCreds }) => val => {
      setCreds(p => ({ ...p, first_name: val }));
    },
    setLastName: ({ setCreds }) => val => {
      setCreds(p => ({ ...p, last_name: val }));
    },
    setEmail: ({ setCreds }) => val => {
      setCreds(p => ({ ...p, email: val }));
    },
    setPassword: ({ setCreds }) => val => {
      setCreds(p => ({ ...p, password: val }));
    },
    setPasswordConfirmation: ({ setCreds }) => val => {
      setCreds(p => ({ ...p, password_confirmation: val }));
    }
  }),
  lifecycle({
    componentDidMount() {
      setDocumentTitle('Sign up');
    }
  })
)(Registration)
