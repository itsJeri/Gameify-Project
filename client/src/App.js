import { useState, useEffect, useContext } from 'react';
import { Context } from './context/Context';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginPage from './Components/LoginPage';
import NavBar from './Components/NavBar';
import Gameify from './Components/Gameify';
import Footer from './Components/Footer';

function App() {
  const {user, setUser} = useContext(Context)

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

  if (!user) return <LoginPage />;
  // if (!user) setUser({
  //   username: 'Guest'
  // })

  return (
    <div id='page-container'>
      <NavBar />
      <main>
        <Gameify />
      </main>
      <Footer />
    </div>
  );
}

export default App;
