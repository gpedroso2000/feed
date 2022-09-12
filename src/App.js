import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Components/LoginPage/Login/Login'
import './App.css'
import { UserStorage } from './Context/UserContext'
import Feed from './Components/Feed/Feed'

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserStorage>
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="login/*" element={<Login />} />
          </Routes>
        </UserStorage>
      </BrowserRouter>
    </div>
  )
}

export default App
