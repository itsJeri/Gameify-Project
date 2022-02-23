import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch('/hello')
      .then(r => r.json())
      .then(data => setCount(data.count));
  }, []);

  return (
    <Router>
    <div className="App">
      
        <Routes>
          <Route 
            path='/testing'
            element={<h1>Test Route</h1>}  
          />
          <Route 
            path='/'
            element={<h1>Page Count: {count}</h1>}  
          />
        </Routes>
    
    </div>
    </Router>
  );
}

export default App;
