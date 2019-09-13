import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import './Landing.css';

const Landing = () => {
  return (
    <Container className='main-section'>
      <Row>
        <Col>
          <h1 className='main-header'>Welcome.</h1>
          <div className='main-body'>
            Bill Keeper is a simple, notepad-style application for managing your finances.
          </div>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col>
          <Link to={'/login'} className='action-btn'>
            Login
          </Link>
          <Link to={'/register'} className='action-btn'>
            Register
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;