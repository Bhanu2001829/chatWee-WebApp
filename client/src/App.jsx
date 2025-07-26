import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/HomePage'
import Loginpage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'

const App = () => {
  return (
    <div className="bg-[url('./assets/bgImage1.png')]
    bg-contain">
      <Routes>
        <Route  path = '/' element={<Homepage  />} />
        <Route  path = '/Login' element={<Loginpage/>} />
        <Route  path = '/profile' element={<ProfilePage/>} />


      </Routes>
    </div>
  )
}

export default App
