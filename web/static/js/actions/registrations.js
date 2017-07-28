import axios from 'axios';
import { createAction } from 'redux-act';
import { setCurrentUser }   from './sessions';

export const registrationsError = createAction('REGISTRATIONS_ERROR');

export const signUp = data => dispatch => {
  return axios({
    url: '/api/registrations', 
    data: { user: data },
    method: 'post'
  })
  .then((response) => {
    localStorage.setItem('phoenixAuthToken', response.data.jwt);

    axios.defaults.headers['Authorization'] = response.data.jwt;

    setCurrentUser(dispatch, response.data.user);
  })
  .catch((error) => {
    console.log(error);
    dispatch(registrationsError({
      errors: [error],
    }));
  });
};
