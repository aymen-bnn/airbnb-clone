import React, { useContext, useState } from 'react'
import {Link, Navigate} from "react-router-dom"
import axios from 'axios'
import { UserContext } from '../hooks/authContext'

function LoginPage() {
  const {user , setUser} = useContext(UserContext)
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const [redirect , setRedirect] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post('/login' , {
        email ,
        password
      })
      console.log(data)
      setUser(data)
      console.log(user)
      setRedirect(true)
      console.log('login done')
    } catch (error) {
      console.log('login failed')
    }
  }
  if(redirect){
    return <Navigate to={"/"}/>
  }
  
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <h1 className='text-center text-5xl mb-10'>Login </h1>
        <form action="" className='w-1/2 cla' onSubmit={handleSubmit}>
            <input value={email} onChange={e=>setEmail(e.target.value)}  className='w-full border-[1px] border-gray-700 p-3 rounded-md mb-5' type="email" name="" id="" placeholder='your@email.com' />
            <input value={password} onChange={e=>setPassword(e.target.value)}  className='w-full border-[1px] border-gray-700 p-3 rounded-md mb-5'  type="password" placeholder='password' />
            <input onClick={()=>handleSubmit} onSubmit={handleSubmit} className='w-full border-[1px] border-gray-700 p-3 rounded-2xl mb-2 text-white bg-primary cursor-pointer'  type="submit" value="Login" />
            <div className='text-center font-normal'>
                don't have account yet <Link className='font-bold underline ' to={'/register'}>Register</Link>
            </div>
        </form>
    </div>
  )
}

export default LoginPage