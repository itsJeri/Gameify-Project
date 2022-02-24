import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function LoginForm({ setUser, setShowLogin }) {
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState([]);
  const [isLoading , setIsLoading] = useState(false);

  function handleOnChange(e) {
    setLoginForm({
      ...loginForm,
      [e.target.id]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginForm),
    })
      .then(r => {
        setIsLoading(false);
        if (r.ok) {
          r.json()
          .then(user => setUser(user));
        } else {
          r.json()
          .then(e => setErrors(e.errors))
        }
      });
  }

  return (
    <div className='d-flex justify-content-center' id='form-container'>
      <Form className='text-center rounded p-4 p-sm-3' onSubmit={e => handleSubmit(e)} id='login-form'>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            id='username'
            placeholder='Enter Username'
            autoComplete='off'
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
        <Button color='black' variant='primary' type='submit' style={{marginTop: '10px', marginBottom: '2rem'}}>
            {isLoading ? 'Loading...' : 'Login'}
        </Button>
            <p>Don't have an account?</p>
        <Button variant='primary' onClick={() => setShowLogin(false)}>
            Sign Up
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm;