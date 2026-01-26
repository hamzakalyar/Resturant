/**
 * Main App Component
 * Application root with routing
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="app__main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<div className="container section"><h1>Menu Page - Coming Soon</h1></div>} />
            <Route path="/reservations" element={<div className="container section"><h1>Reservations Page - Coming Soon</h1></div>} />
            <Route path="/about" element={<div className="container section"><h1>About Page - Coming Soon</h1></div>} />
            <Route path="/contact" element={<div className="container section"><h1>Contact Page - Coming Soon</h1></div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
