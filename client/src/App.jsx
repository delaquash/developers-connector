import React, { Fragment } from 'react';
import { BrowserRouter as Switch, Router, Route } from 'react-router-dom';
import Navbar from '../src/components/layout/Navbar';
import Landing from '../src/components/layout/Landing';
import Login from "../src/components/auth/Login";
import Register from "../src/components/auth/Register";
import './App.css';

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Fragment>
    </Router>
  );
};

export default App;
