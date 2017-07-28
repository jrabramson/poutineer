import axios from 'axios';
import { createAction } from 'redux-act';
import { setCurrentUser }   from './sessions';

export const registrationsError = createAction('REGISTRATIONS_ERROR');

export const signUp = (data) => dispatch => {
  return axios({
    url: '/api/registrations', 
    data: { user: data },
    method: 'post'
  })
  .then((data) => {
    localStorage.setItem('phoenixAuthToken', data.jwt);

    setCurrentUser(dispatch, data.user);
  })
  .catch((error) => {
    dispatch(registrationsError({
      errors: [error],
    }));
  });
};
