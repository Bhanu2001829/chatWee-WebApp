import React, { useContext, useState} from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {
const [currState, setCurrState] = useState("Sign up")
const [fullName, setFullName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [bio, setBio] = useState("")
const [isDataSublimted, setIsDataSubmitted] = useState(false)


const {login} = useContext(AuthContext)

const onSubmitHandler = (event) => {
  event.preventDefault();

  if (currState === 'Sign up' && !isDataSublimted) {
    setIsDataSubmitted(true);
    return
  }
  
  login(currState === "Sign up" ? 'signup' : 'login',{fullName, email,password,bio})
}



  return (
    <div className='min-h-screen bg-cover bg-center flex items-center
     justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
     {/*-----left side-----*/}
     <img src={assets.logo_big1} alt="" className='w-[min(30vw,500px)]'/>

     {/*-----right side-----*/}
     <form  onSubmit={onSubmitHandler}   className='w-[90%] sm:w-[400px] md:w-[450px] lg:w-[500px] border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>

     <h2 className='font-medium text-2xl flex justify-between items-center'>
      {currState}
      {isDataSublimted && <img onClick={()=>setIsDataSubmitted(false)}    src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />}
      </h2>

    {currState === "Sign up" &&  !isDataSublimted &&(
      <input onChange={(e) => setFullName(e.target.value)} value={fullName}
       type="text" className='p-2 border border-gray-500 rounded-md 
      focus:outline-none'placeholder='Full Name' required />
    )}

    {!isDataSublimted && (
      <> 
      <input onChange={(e) => setEmail(e.target.value)} value={email}
       type="email" placeholder='Email Address' required className='p-2
        border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' />
        <input onChange={(e) => setPassword(e.target.value)} value={password}
       type="password" placeholder='Password' required className='p-2
        border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' />
      </>
      )}

      {currState === "Sign up" && !isDataSublimted && (
      <textarea onChange={(e) => setBio(e.target.value)} value={bio}
       rows={4} className='p-2 border border-gray-500 rounded-md 
       focus:outline-none focus:ring-2 focus:ring-indigo-500'
       placeholder='provide a short bio about yourself....' required>
      </textarea>
      )} 
      <button type='submit' className='py-3 bg-gradient-to-r from-cyan-400 to-green-600 text-white border-none text-sm font-light rounded-full cursor-pointer'>
        {currState === "Sign up" ? "Create Account" : "Login"}
      </button>

      <div className='flex items-center gap-2 text-sm text-gray-500'>
        <input type="checkbox" />
        <p>Agree to the terms of use & privacy.</p>
      </div>
      
      <div className='flex flex-col gap-2'>
        {currState === "Sign up" ? (
          <p className='text-sm text-gray-600'>Already Have a account ? <span onClick={()=>{setCurrState("Login"); setIsDataSubmitted(false)}} className='font-medium text-blue-500 cursor-pointer'>
            Login here</span></p>
        ) :(
          <p className='text-sm text-gray-600'>Create an Account <span onClick={()=>setCurrState("Sign up")}
          className='font-medium text-blue-500 cursor-pointer'>Click here</span></p>
        )}

      </div>


     </form>
    </div>
  )
}

export default LoginPage
