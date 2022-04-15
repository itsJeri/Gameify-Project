import { useState, useContext } from 'react';
import { Context } from '../../context/Context';
import { Link } from 'react-router-dom';

import { Form, Button } from 'react-bootstrap';
import logo from '../../assets/logo.png'

function LoginForm() {
  const demoLogin = {
    username: 'Demo',
    password: 'abc123'
  }

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState([]);
  const [isLoading , setIsLoading] = useState(false);

  const {setUser, navigate} = useContext(Context);

  function handleOnChange(e) {
    setLoginForm({
      ...loginForm,
      [e.target.id]: e.target.value
    })
  }

  function handleSubmit(e, loginInfo) {
    e.preventDefault();
    setIsLoading(true);
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginInfo),
    })
      .then(r => {
        setIsLoading(false);
        if (r.ok) {
          r.json()
          .then(user => {
            setUser(user);
            navigate('/');
          });
        } else {
          r.json()
          .then(e => setErrors(e.errors))
        }
      });
  }

  return (
    <div className='d-flex justify-content-center' id='form-container'>
      <Form className='text-center rounded p-4 p-sm-3' onSubmit={e => handleSubmit(e, loginForm)} id='login-form'>
      <img id='logo' src={logo} alt='logo'/>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            id='username'
            placeholder='Enter Username'
            autoComplete='off'
            autofocus='true'
            value={loginForm.username}
            onChange={(e) => handleOnChange(e)}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            id='password'
            autoComplete='current-password'
            value={loginForm.password}
            onChange={(e) => handleOnChange(e)}
          />
        </Form.Group>
        {errors ?
          errors.map(e => {
          return (<p className='errors' key={e}>{e}</p>)
          }) :
          null
        }
        <Button color='black' variant='primary' type='submit' style={{marginTop: '10px', marginBottom: '1rem'}}>
          {isLoading ? 'Loading...' : 'Login'}
        </Button>
          <p>Don't have an account?</p>
        <Button variant='primary' as={Link} to={'/signup'}>
          Sign Up
        </Button>
        <p id='demo-login' className='shake' onClick={(e) => handleSubmit(e, demoLogin)} >
          Demo Login
        </p>
      </Form>
    </div>
  )
}

export default LoginForm;