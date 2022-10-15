import React from 'react';
import './App.css';
import {useEffect} from 'react';
import {NavBar} from './features/nav-bar/nav-bar'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
