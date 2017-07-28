import { createReducer } from 'redux-act';
import { registrationsError } from '../actions/registrations.js';

const registrationsReducer = createReducer({
  [registrationsError]: (state, payload) => ({
    ...state,
    errors: payload.errors
  })
}, { errors: null });

export default registrationsReducer;