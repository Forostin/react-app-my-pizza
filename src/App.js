import React from 'react';
import {Routes, Route } from 'react-router-dom';

import './App.css';
import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import NotFoound from './pages/NotFound';
import Cart from './pages/Cart';


function App() {

  return (
    <>
    <div className="wrapper">
      <Header />
      <div className="content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={ <NotFoound />} />
      </Routes> 
      </div>
    </div>

    </>
  );
}

export default App;
