import { connect } from 'react-redux';
import { compose, withHandlers, withState, lifecycle } from 'recompose';

import { signIn } from '../../actions/sessions';

import Session from '../../components/sessions';

import { setDocumentTitle } from '../../utils';

const mapStateToProps = ({ sessionReducer }) => {
  return {
    error: sessionReducer.error,
    currentUser: sessionReducer.currentUser
  }
};

export default compose(
  connect(mapStateToProps, {
    onSignIn: signIn
  }),
  withState('creds', 'setCreds', { email: 'fake@poutineer.com', password: '12345678' }),
  withHandlers({
    handleSubmit: ({ creds, onSignIn }) => (e) => {
      e.preventDefault();
      onSignIn(creds.email, creds.password);
    },
    setEmail: ({ setCreds }) => val => {
      setCreds(c => ({ ...c, email: val }));
    },
    setPassword: ({ setCreds }) => val => {
      setCreds(c => ({ ...c, password: val }));
    },
    renderError: ({ error }) => () => {
      if (!error) return false;

      return (
        <div className="error">
          {error}
        </div>
      );
    }
  }),
  lifecycle({
    componentDidMount() {      
      setDocumentTitle('Sign in');
    }
  })
)(Session)
