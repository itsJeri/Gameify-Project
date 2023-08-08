import { useState, useEffect, useContext } from 'react';
import { Context } from './context/Context';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/NavBar';
import Gameify from './Components/Gameify';
import Footer from './Components/Footer';
import { CURRENT_USER_API_ENDPOINT } from './constants/apiEndpoints';

function App() {
  const {user, setUser} = useContext(Context);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // auto-login
    fetch(CURRENT_USER_API_ENDPOINT).then(r => {
      if (r.ok) {
        r.json().then(user => {
          setUser(user)
          setIsLoading(false);
        });
      }
    });
  }, []);

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
