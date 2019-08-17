import React, { Component } from 'react';

import Navi from './components/Nav';
import './App.css';
import fire from './config/fire';

class App extends Component {

  constructor() {
    super();
    this.state= {
      authenticated: false
    }
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authenticated: true })
      } else {
        this.setState({ authenticated: false })
      }
    })
  }
  render() {
    return (
      <Navi 
          authenticated={this.state.authenticated}
      />
    );
  }
}

export default App;
