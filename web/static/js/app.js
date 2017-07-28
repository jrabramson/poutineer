import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import configureStore from './store';
import Root from './containers/root';

axios.defaults.headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: localStorage.getItem('phoenixAuthToken')
};

const store = configureStore();

const target = document.getElementById('poutineer-container');
const node = <Root store={store} />;

ReactDOM.render(node, target);
