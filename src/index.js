import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './components/Header';
import Main from './components/Main';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
