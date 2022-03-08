import { useState } from 'react';
import LoginForm from './Login/LoginForm';
import SignupForm from './Login/SignupForm';

function LoginPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
      <div>
        {showLogin ?
          <LoginForm setUser={setUser} setShowLogin={setShowLogin}/> :
          <SignupForm setUser={setUser} setShowLogin={setShowLogin}/>
        }
      </div>
  )
}

export default LoginPage;