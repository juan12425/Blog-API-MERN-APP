import React from 'react';
import './App.css';
import {useEffect} from 'react';
import {NavBar} from './features/navbar/navbar'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
