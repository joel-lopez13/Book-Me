import React, { useState } from 'react'
// import { BrowserRouter } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SignUpForm />
      </header>
    </div>
  );
}

export default App;