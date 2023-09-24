'use client'
import React from 'react'
import { useState } from 'react';
import {useRouter} from 'next/navigation';
export default function Login () {

const router = useRouter();

const [email,setEmail] = useState('')
const [emailErrorMsg, setEmailErrorMsg] = useState('');

const [password,setPassword] = useState('');
const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
const [mainError,setMainError] = useState<string | null>(null);

const onSubmit = async (e: React.FormEvent) =>{
    e.preventDefault();


}
 
return (
    // <div className='flex flex-col justify-center items-center h-screen'>
    //         <h1 className='text-white text-center font-bold text-4xl'>Register Account</h1>
    //         <div className='flex flex-col justify-center items-center text-white w-[450px] h-[700px] bg-[#3F4147] my-5 rounded-md shadow-2xl'>
    //             <form onSubmit={onSubmit}>
                    
    //                 <div className='flex flex-col mt-3 mb-1'>
    //                 <label  className='text-white font-bold'>Email</label>
    //                 <input className={`p-2 w-80 rounded border-2 border-[#424549] focus:outline-none focus:border-indigo-500 text-black ${
    //                     emailError ? 'border-red-500 focus:border-red-500' : '' }`}
    //                 name='email' autoComplete='email' placeholder='Email' value={email} type='text' onChange={(e) => setEmail(e.target.value) }/>
    //                  {emailError && <span className='text-red-600 font-bold text-sm p-1'>{emailErrorMsg}</span>}
    //                 </div> 
                    
    //                 <div className='flex flex-col mt-3 mb-1'>
    //                 <label  className='text-white font-bold'>Username</label>
    //                 <input className={`p-2 w-80 rounded border-2 border-[#424549] focus:outline-none focus:border-indigo-500 text-black ${
    //                     nameError? 'border-red-500 focus:border-red-500' : '' }`}
    //                     name='name' placeholder='Username' value={username} type='text' onChange={(e) => setName(e.target.value) }/>
    //                     { nameError && <span className='text-red-600 font-bold text-sm p-1'>{nameErrorMsg}</span>}
    //                 </div> 
    //                 </form>
    //             </div>
    //         </div>
    <div></div>
  )
}

