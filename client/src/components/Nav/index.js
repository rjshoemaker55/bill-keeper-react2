import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Register from '../../pages/Register'

import './styles.css';

class Navi extends Component {
  render() {
      return(
      <>
        <Router>
          <Navbar id='nav-top'>
            <Nav.Item className='mr-auto'></Nav.Item>
            <Navbar.Brand as={Link} to='/' id='nav-brand' className='mx-auto'>Bill Keeper</Navbar.Brand>
            {this.props.authenticated
              ? <Nav.Link as={Link} to='/login' id='nav-login-profile' className='ml-auto'>Account</Nav.Link>
              : <Nav.Link as={Link} to='/login' id='nav-login-profile' className='ml-auto'>Login</Nav.Link>
            }
            
          </Navbar>
        
          <Route path='/' exact component={Home} />
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
        </Router>

        

        <Navbar fixed='bottom' id='nav-bottom' className='justify-content-center'>
          Created by RJ Shoemaker © 2019
        </Navbar>   
      </>
    )
  }
}

export default Navi;