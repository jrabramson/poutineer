import { createReducer } from 'redux-act';
import { placesReceived } from '../actions/map.js';

const mapReducer = createReducer({
  [placesReceived]: (state, payload) => ({
    ...state,
    places: payload.places
  })
}, { places: [] });

export default mapReducer;