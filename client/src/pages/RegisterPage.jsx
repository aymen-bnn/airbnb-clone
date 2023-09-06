import axios from 'axios'
import React, { useState } from 'react'
import {Link } from "react-router-dom"
function RegisterPage() {
    const [name , setName] = useState("")
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const registerUser = async(e) => {
        e.preventDefault()
        const {data} = await axios.post('/register' , {
            name ,
            email , 
            password
        })  
        console.log(data)
      }
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <h1 className='text-center text-5xl mb-10'>Register </h1>
        <form action="" className='w-1/2 ' onSubmit={registerUser}>
            <input value={name} onChange={e=>setName(e.target.value)} className='w-full border-[1px] border-gray-700 p-3 rounded-md mb-5' type="text" name="name" id="name" placeholder='John Doe' />
            <input value={email} onChange={e=>setEmail(e.target.value)} className='w-full border-[1px] border-gray-700 p-3 rounded-md mb-5' type="email" name="email" id="email" placeholder='your@email.com' />
            <input value={password} onChange={e=>setPassword(e.target.value)} className='w-full border-[1px] border-gray-700 p-3 rounded-md mb-5'  type="password" placeholder='password' id='password' name='password' />
            <input onClick={registerUser} className='w-full border-[1px] border-gray-700 p-3 rounded-2xl mb-2 text-white bg-primary cursor-pointer'  type="submit" value="Register" />
            <div className='text-center font-normal'>
                already a member <Link className='font-bold underline ' to={'/login'}>Register</Link>
            </div>
        </form>
    </div>
  )
}

export default RegisterPage