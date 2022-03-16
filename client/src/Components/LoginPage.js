import { useState } from 'react';
import LoginForm from './Login/LoginForm';
import SignupForm from './Login/SignupForm';

import logo from '../assets/logo.png';

function LoginPage() {
  const [showLogin, setShowLogin] = useState(true);

  return (
      <div>
        {showLogin ?
          <LoginForm setShowLogin={setShowLogin}/> :
          <SignupForm setShowLogin={setShowLogin}/>
        }
      </div>
  )
}

export default LoginPage;