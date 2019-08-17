import React, { Component } from 'react';
import { Card, Button, InputGroup, FormControl } from 'react-bootstrap';

import './styles.css';
import fire from '../../config/fire';

class Login extends Component {

  constructor(props) {
    super(props)
    this.register = this.register.bind(this)
    this.state = {
      firstName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  register(e) {
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
      console.log(u)
    }).catch((error) => {
      console.log(error)
    })
  }

  render() {
    return (
      <div className='container'>
        <Card className='card mx-auto mt-4 rounded-0'>
          <Card.Header className='card-header font-weight-bold'>Register</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to Bill Keeper.</Card.Title>
            <InputGroup size="default">
              <InputGroup.Prepend>
                <InputGroup.Text className='rounded-0'>
                  First Name
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl 
                aria-label='First Name' 
                aria-describedby='inputGroup-sizing-sm'
                name='firstName' 
                value={this.state.firstName} 
                id='inputGroup-sizing-default' 
                className='rounded-0'
                onChange={e => this.handleChange(e)} 
              />
            </InputGroup>
            <InputGroup size='default' className='mt-2'>
              <InputGroup.Prepend>
                <InputGroup.Text className='rounded-0'>
                  Email
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl 
                aria-label='Email' 
                aria-describedby='inputGroup-sizing-sm'
                name='email' 
                value={this.state.email} 
                id='inputGroup-sizing-default' 
                className='rounded-0'
                onChange={e => this.handleChange(e)} 
              />
            </InputGroup>
            <InputGroup size='default' className='mt-2'>
              <InputGroup.Prepend>
                <InputGroup.Text className='rounded-0'>
                  Password
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl 
                aria-label='Password' 
                aria-describedby='inputGroup-sizing-sm' 
                name='password' 
                value={this.state.password} 
                id='inputGroup-sizing-default'
                className='rounded-0'
                onChange={e => this.handleChange(e)} 
                type='password'
              />
            </InputGroup>
            <InputGroup size='default' className='mt-2'>
              <InputGroup.Prepend>
                <InputGroup.Text className='rounded-0'>
                  Confirm Password
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl 
                aria-label='Confirm Password' 
                aria-describedby='inputGroup-sizing-sm' 
                name='confirmPassword' 
                value={this.state.confirmPassword} 
                id='inputGroup-sizing-default'
                className='rounded-0'
                onChange={e => this.handleChange(e)} 
                type='password'
              />
            </InputGroup>
            <Button 
              variant='primary' 
              className='button mt-3 rounded-0'
              onClick={e => this.register(e)}
            >
            Create Account
            </Button>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default Login;