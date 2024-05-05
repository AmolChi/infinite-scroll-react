import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css'
import App from './App'
import { createStore,applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import reducer from './store/reducer';
import { Provider } from 'react-redux';

const store = createStore(reducer,applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
);


