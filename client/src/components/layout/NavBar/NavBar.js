import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

import './NavBar.css';

const NavBar = () => {
  return (
<Navbar collapseOnSelect expand="lg">
  <Navbar.Brand id='brand' as={Link} to='/'>Bill Keeper.</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
    </Nav>
    <Nav>
      <Nav.Link as={Link} to='/login'>Login</Nav.Link>
      <Nav.Link as={Link} eventKey={2} to='/register'>
        Register
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
  );
};

export default NavBar;