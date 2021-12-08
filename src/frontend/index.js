/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Provider } from 'react-redux';
import Home from './components/Home';
import store from './store/index';

ReactDOM.render(
  <Provider store={store}>
    <Home />
  </Provider>,

  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept();
}
