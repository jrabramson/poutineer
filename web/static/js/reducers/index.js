import { combineReducers } from 'redux';
import sessionReducer from './session';
import registrationReducer from './registration';
import mapReducer from './map';

export default combineReducers({
  sessionReducer,
  registrationReducer,
  mapReducer
});
