import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import './LogIn.css'

const LogIn = props => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState }
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
    setFormState({
      email: '',
      password: ''
    });
  }

  return (
    <Container>
      <Row>
        <Col>
          <div>
            <img src={require('./../assets/images/RedCat.png')} width="100%" height="100%" alt="The Red Cat and Co in retro style" />
          </div>
          <div class="text-center">
            <h2 class="h3 mb-3 font-weight-normal">Please Log In</h2>
            <form onSubmit={handleFormSubmit} class="form-signin">
              <input                                                                                                                                                        
                className='form-input form-signin'
                placeholder='Email Address'
                name='email'
                type='email'
                id='email'
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className='form-input form-signin'
                placeholder='Password'
                name='password'
                type='password'
                id='password'
                value={formState.password}
                onChange={handleChange}
              />
              <button class="btn btn-lg btn-danger btn-block" type='submit'>
                Submit
            </button>
            </form>
            {error && <div>Login failed.</div>}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default LogIn;