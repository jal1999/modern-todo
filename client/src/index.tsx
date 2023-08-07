import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './Router'
import css from './styles/global.css';
import { Provider } from 'react-redux';
import store from './redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
    <Router />
    </Provider>
  </BrowserRouter>
);