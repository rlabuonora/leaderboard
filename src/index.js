import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <App
    url={"https://fcctop100.herokuapp.com/api/fccusers/top/recent"}
        />,
  document.getElementById('root')
);
