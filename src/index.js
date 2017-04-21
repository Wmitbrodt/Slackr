import './style/css/style.css'
import './style/scss/style.scss'
/* eslint-disable import/default */
import 'babel-polyfill' ;
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { AppContainer } from 'react-hot-loader'
import App from './components';


const store = configureStore();
render(
  <AppContainer>
    <App/>
  </AppContainer>
  , document.getElementById('main')
);

if (module.hot) {
  module.hot.accept('./components', () => { render(App) })
}
