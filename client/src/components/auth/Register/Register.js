import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col, Form } from 'react-bootstrap';

import { register } from '../../../actions/auth';
import { setAlert } from '../../../actions/alert';

import './Register.css';

const Register = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e => setFormData({
    ...formData, [e.target.name]: e.target.value
  });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger')
    } else {
      const newUser = {
        name,
        email,
        password
      };
      register(newUser);
    }
  }

  return (
    <Container className='main-section'>
      <Row>
        <Col>
          <h1 className='main-header'>
            Register.
          </h1>
        </Col>
      </Row>
      <Row>
        <Col lg='8'>
          <Form onSubmit={e => onSubmit(e)}>
            <Form.Control 
              className='form-inputs' 
              size="lg" 
              type="text" 
              name='name' 
              value={name}
              onChange={e => onChange(e)} 
              placeholder="First Name" 
            />
            <Form.Control 
              className='form-inputs' 
              size="lg" 
              type="email" 
              name='email' 
              value={email} 
              onChange={e => onChange(e)}
              placeholder="Email" 
            />
            <Form.Control 
              className='form-inputs' 
              size="lg" 
              type="password" 
              name='password' 
              value={password} 
              onChange={e => onChange(e)}
              placeholder="Password" 
            />
            <Form.Control 
              className='form-inputs'  
              size="lg" 
              type="password" 
              name='password2' 
              value={password2} 
              onChange={e => onChange(e)}
              placeholder="Confirm Password" 
            />
            <input type='submit' className='action-btn mt-2' value='Register'/>
          </Form>
        </Col>
        <Col lg='4'>
          <div id='dec-square'>
            
          </div>
        </Col>
      </Row>
    </Container>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default connect(
  null,
  { register, setAlert }
)(Register);