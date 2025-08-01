import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Homepage from './pages/HomePage'
import Loginpage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import{Toaster} from "react-hot-toast"
import { AuthContext } from '../context/AuthContext'


const App = () => {
  const {authUser} = useContext(AuthContext)
  return (
    <div className="bg-[url('./assets/bgImage1.png')]
    bg-contain">
      <Toaster/>
      <Routes>
        <Route  path = '/' element={authUser ? <Homepage  /> :<Navigate to="/login"/>} />
        <Route  path = '/Login' element={!authUser ? <Loginpage/> :<Navigate to="/"/>} />
        <Route  path = '/profile' element={authUser ?<ProfilePage/> :<Navigate to="/login"/>} />


      </Routes>
    </div>
  )
}

export default App
