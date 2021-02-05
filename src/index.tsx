import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { store } from './store';

// TODO: Barrels
// TODO: Fix tests
// TODO: Preservable tree fine
// TODO: Bug with moving to the previously cleared cell

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
