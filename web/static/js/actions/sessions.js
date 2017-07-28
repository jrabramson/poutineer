import axios from 'axios';
import { createAction } from 'redux-act';
import { Socket } from 'phoenix';

export const currentUser = createAction('CURRENT_USER');
export const located = createAction('LOCATED');
export const sessionsError = createAction('SESSIONS_ERROR');
export const userSignedOut = createAction('USER_SIGNED_OUT');

export const setCurrentUser = (dispatch, user) => {
  const socket = new Socket('/socket', {
    params: { token: localStorage.getItem('phoenixAuthToken') },
    logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data); },
  });

  socket.connect();

  const channel = socket.channel(`users:${user.id}`);

  if (channel.state != 'joined') {
    channel.join().receive('ok', () => {
      dispatch(currentUser({
        currentUser: user,
        socket: socket,
        channel: channel
      }));
    });
  }
};

export const signIn = (email, password) => dispatch => {
  const data = {
    session: {
      email: email,
      password: password,
    },
  };

  return axios({
    url: '/api/sessions',
    data: data,
    method: 'post'
  })
  .then((data) => {
    localStorage.setItem('phoenixAuthToken', data.data.jwt);
    setCurrentUser(dispatch, data.data.user);
  })
  .catch((error) => {
    error.response.json()
    .then((errorJSON) => {
      dispatch(sessionsError({
        error: errorJSON.error
      }));
    });
  });
};

export const getCurrentUser = () => dispatch => {
  const authToken = localStorage.getItem('phoenixAuthToken');

  return axios({
    url: '/api/current_user',
    method: 'get'
  })
  .then(function (data) {
    setCurrentUser(dispatch, data.data);
  })
  .catch(function (error) {
    console.log(error);
  });
};

export const getLocation = () => dispatch => {
  return navigator.geolocation.getCurrentPosition(function(location) {
    dispatch(located({ location: location }));
  });
}

export const signOut = () => dispatch => {
  return axios({
    url: '/api/sessions',
    method: 'delete'
  })
  .then((data) => {
    localStorage.removeItem('phoenixAuthToken');

    dispatch(userSignedOut());
  })
  .catch(function (error) {
    console.log(error);
  });
};
