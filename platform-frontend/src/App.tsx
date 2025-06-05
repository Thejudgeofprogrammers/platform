import React from 'react';
import Home from './pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Desktop from './pages/Desktop/Desktop';

const App: React.FC = () => {
  return (
    <div className="app-root">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/desktop" element={<Desktop />} />
      </Routes>
    </div>
  );
};

export default App;
