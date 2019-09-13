import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import Landing from './components/layout/Landing/Landing';
import NavBar from './components/layout/NavBar/NavBar';
import { Container } from 'react-bootstrap';
import './App.css';

import Alert from './components/layout/Alert/Alert'
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Container>
        <Alert />
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Switch>
        <Route exact path='/' component={Landing} />
        </Container>
      </Router>
    </Provider>
  );
};

export default App;
