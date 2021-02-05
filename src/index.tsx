import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { store } from './store';

// TODO: Preservable tree fine
// TODO: Errored cell highlight
// TODO: Bug with moving to the previously cleared cell
// TODO: Mobile layout
// TODO: Enforce width for log
// TODO: Barrels
// TODO: Fix tests
// TODO: Cover remaining places with tests

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
