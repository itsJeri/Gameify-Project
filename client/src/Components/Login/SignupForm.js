import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function SignupForm({ setUser, setShowLogin }) {
  const [signupForm, setSignupForm] = useState({
    username: '',
    password: '',
    password_confirmation: '',
    email: ''
  });
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleOnChange(e) {
    setSignupForm({
      ...signupForm,
      [e.target.id]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupForm)
    })
      .then(r => {
        setIsLoading(false);
        if (r.ok) {
          r.json()
          .then(user => setUser(user));
        } else {
          r.json()
          .then(e => setErrors(e.errors));
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
            autoComplete='off'
            value={signupForm.username}
            onChange={e => handleOnChange(e)}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            id='password'
            value={signupForm.password}
            onChange={e => handleOnChange(e)}
            autoComplete='current-password'
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password Confirmation</Form.Label>
          <Form.Control
            type='password'
            id='password_confirmation'
            value={signupForm.passwordConfirmation}
            onChange={e => handleOnChange(e)}
            autoComplete='current-password'
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>E-mail</Form.Label>
          <Form.Control
            type='text'
            id='email'
            value={signupForm.email}
            onChange={e => handleOnChange(e)}
          />
        </Form.Group>  
        {errors ?
          errors.map(e => {
            if (e === "Password digest can't be blank") {
              return null
            }
          return (<p className='errors' key={e}>{e}</p>)
          }) :
          null
        }
        <Button type='submit' style={{marginTop: '10px', marginBottom: '2rem'}}>{isLoading ? 'Loading...' : 'Sign Up'}</Button>
            <p>Already have an account? </p>
        <Button onClick={() => setShowLogin(true)}>
            Log In
        </Button>
      </Form>
    </div>
  )
}

export default SignupForm;