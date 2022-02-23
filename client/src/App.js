import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginPage from './Components/LoginPage';
import NavBar from './Components/NavBar';
import MainPage from './Components/MainPage';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch('/me').then(r => {
      if (r.ok) {
        r.json().then(user => {
          setUser(user)
        });
      }
    });
  }, []);

  if (!user) return <LoginPage setUser={setUser} />;

  return (
    <>
      <NavBar user={user} setUser={setUser}/>
      <main>
        <Routes>
          <Route
            path='/'
            element={<MainPage />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
