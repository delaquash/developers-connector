import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import './App.css';
// Redux packages
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
    return ( < Provider store = { store } >
        <
        Router >
        <
        Fragment >
        <
        Navbar / >
        <
        Route exact path = '/'
        component = { Landing }
        /> <
        section className = 'container' >
        <
        Alert / >
        <
        Switch >
        <
        Route exact path = '/login'
        component = { Login }
        /> <
        Route exact path = '/register'
        component = { Register }
        /> < /
        Switch > <
        /section> < /
        Fragment > <
        /Router> < /
        Provider >
    );
};

export default App;