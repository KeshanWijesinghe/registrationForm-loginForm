// src/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LogInForm';
import Home from './components/Home';

const App = () => {
  return (
    <Routes>

          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Home />} />

    </Routes>
  );
};

export default App;
