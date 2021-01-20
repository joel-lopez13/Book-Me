import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
// import SignUpForm from './components/SignUpForm';
import Router from './components/Router';
import './App.css';

function App() {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || {}
  );
  return (
    <BrowserRouter className="App">
      <header className="App-header">
        {/* <SignUpForm /> */}
        <Router user={user} setUser={setUser}/>
      </header>
    </BrowserRouter>
  );
}

export default App;