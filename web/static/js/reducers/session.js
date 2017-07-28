import { createReducer } from 'redux-act';
import {
  currentUser,
  sessionsError,
  userSignedOut,
  located
} from '../actions/sessions.js';

const initialState = {
  getCurrentUser: null,
  socket: null,
  channel: null,
  error: null,
};

const sessionReducer = createReducer({
  [currentUser]: (state, payload) => ({
    ...state,
    fetchingAuth: false,
    currentUser: payload.currentUser,
    socket: payload.socket,
    channel: payload.channel,
    error: null
  }),
  [sessionsError]: (state, payload) => ({
    ...state,
    error: payload.error
  }),
  [userSignedOut]: (state, payload) => ({
    fetchingAuth: false,
    currentUser: null,
    socket: null,
    channel: null,
    error: null
  }),
  [located]: (state, payload) => ({
    ...state,
    location: payload.location.coords
  })
}, {
  fetchingAuth: true,
  currentUser: null,
  socket: null,
  channel: null,
  error: null,
  location: { latitude: 43.6470823, longitude: -79.3932772 }
});

export default sessionReducer;
