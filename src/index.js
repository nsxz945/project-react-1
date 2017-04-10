import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'bulma/css/bulma.css'
import Welcome from './Welcome'

ReactDOM.render(
  <Welcome name="nsxz"/>,
  document.getElementById('container')
)