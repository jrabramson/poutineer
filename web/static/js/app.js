import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import configureStore from './store';
import Root from './containers/root';

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

function buildHeaders() {
  const authToken = localStorage.getItem('phoenixAuthToken');

  return { ...defaultHeaders, Authorization: authToken };
}

axios.defaults.headers = buildHeaders();

const store = configureStore();

const target = document.getElementById('poutineer-container');
const node = <Root store={store} />;

ReactDOM.render(node, target);
