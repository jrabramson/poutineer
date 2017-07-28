import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import MainLayout from '../layouts/main';
import PublicContainer from '../containers/public.js';
import HomeIndexView from '../views/home';
import RegistrationsNew from '../views/registrations/new';
import SessionsNew from '../views/sessions/new';
import { getCurrentUser, getLocation } from '../actions/sessions';
import { compose, lifecycle } from 'recompose';


const Routes = (props) => {
  return (
    <Router>
      <MainLayout>
        <PublicContainer>
          <Route exact path="/" component={HomeIndexView} />
          {( props.currentUser ? <Redirect to='/' /> : <Route path="/sign_up" component={RegistrationsNew} /> )}
          {( props.currentUser ? <Redirect to='/' /> : <Route path="/sign_in" component={SessionsNew} /> )}
        </PublicContainer>
      </MainLayout>
    </Router>
  );
};

const Loader = () => (
  <div id="public_container" className="application-container">
    <div className='main-container'>
      <div style={{ display: 'flex', alignItems: 'center'}} >    
        <img src='/images/poutineer.png' style={{margin: '0 auto'}} />
      </div>
    </div>
  </div>
);


const FetchingAuth = (props) => !props.fetchingAuth ?
  Routes(props) :
  <Router>
      <MainLayout>
        <Route component={Loader}/>
      </MainLayout>
    </Router>;

const mapStateToProps = ({ sessionReducer }) => {
  return {
    currentUser: sessionReducer.currentUser,
    fetchingAuth: sessionReducer.fetchingAuth
  };
};

export default compose(
  connect(mapStateToProps, {
    getCurrentUser: getCurrentUser,
    getLocation: getLocation
  }),
  lifecycle({
    componentDidMount() {
      this.props.getCurrentUser();
      this.props.getLocation();
    }
  })
)(FetchingAuth);
