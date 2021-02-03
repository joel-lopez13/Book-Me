import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import Router from './components/Router';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || {}
  );
  return (
    <BrowserRouter className="App">
      <header className="App-header">
        <NavBar user={user} setUser={setUser}/>
        <Router user={user} setUser={setUser}/>
      </header>
    </BrowserRouter>
  );
}

export default App;