import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Switch, Router, Route } from 'react-router-dom';
// import './index.css';
import App from './App.jsx';
import Landing from '../src/components/layout/Landing';
import Login from "../src/components/auth/Login";
import Register from "../src/components/auth/Register";
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path='/' component={Landing} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />

    <App /></Router>
  </React.StrictMode>  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
