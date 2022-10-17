import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import {Layout} from './features/layout/layout'
import {Home} from './features/home/home'
import {Register} from './features/register/register'
import {Login} from './features/login/login'
import {Dashboard} from './features/dashboard/dashboard'
import {LayoutLogged} from './features/layout/layout-logged'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
        </Route>
        <Route path="/resources" element={<LayoutLogged/>} >
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
