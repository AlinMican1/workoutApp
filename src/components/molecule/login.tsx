'use client'
import React from 'react'
import { useState } from 'react';
import {useRouter} from 'next/navigation';
import { signIn } from 'next-auth/react'
import Link from 'next/link';

export default function Login () {

const router = useRouter();

const [email,setEmail] = useState('')
const [emailError, setEmailError] = useState(false);
const [emailErrorMsg, setEmailErrorMsg] = useState('');

const [password,setPassword] = useState('');
const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
const [passwordError, setPasswordError] = useState(false);

const [mainError, setMainError] = useState(false);
const[mainErrorMsg,setMainErrorMsg] = useState<string | null>(null)

const onSubmit = async (e: React.FormEvent) =>{
  e.preventDefault();

  if(email === ''){
    setEmailErrorMsg("Email is required!");
    setEmailError(true)
  }else{
    setEmailErrorMsg("");
    setEmailError(false);
  }
  
  if(password === ''){
    setPasswordErrorMsg("Password is required!");
    setPasswordError(true);
  }
  else{
    setPasswordErrorMsg("");
    setPasswordError(false);
  }
    try{ 
    const signInData = await signIn('credentials', {
      redirect: false,
      email,
      password
    }) 

    if(!signInData?.error){
      router.refresh();
      router.push('/');
    }else if(email !== '' && password !== ''){
      setMainError(true);
      setMainErrorMsg('Invalid email or password!');
    }
    if(email === ''){
      setEmailError(true);
      setEmailErrorMsg("Email is required!");   
    }else{
      setEmailError(false);
      setEmailErrorMsg('');
    }
    if(password === ''){
      setPasswordError(true);
      setPasswordErrorMsg("Password is required");
    }
    else{
      setPasswordError(false);
      setPasswordErrorMsg('');
    }
  }catch(error:any){

  }
  
}
 
return (
    <div className='flex flex-col justify-center items-center h-screen'>
            <h1 className='text-white text-center font-bold text-lg'>Sign in</h1>
            <div className='flex flex-col justify-center items-center text-white my-5 rounded-md shadow-2xl'>
                <form onSubmit={onSubmit}>
                    
                    <div className='flex flex-col mt-3 mb-1'>
                    <label  className='text-white text-semibold text-base'>Email</label>
                    <input className={`p-2 w-80 rounded border-2 border-[#424549] focus:outline-none focus:border-indigo-500 text-black ${
                        emailError ? 'border-red-500 focus:border-red-500' : '' }`}
                    name='email' autoComplete='email' placeholder='Email' value={email} type='text' onChange={(e) => setEmail(e.target.value) }/>
                     {emailError && <span className='text-red-600 font-bold text-sm p-1'>{emailErrorMsg}</span>}
                    </div> 
                    
                    <div className='flex flex-col mt-3 mb-1'>
                    <label  className='text-white text-semibold text-base'>Password</label>
                    <input className={`p-2 w-80 rounded border-2 border-[#424549] focus:outline-none focus:border-indigo-500 text-black ${
                        passwordError? 'border-red-500 focus:border-red-500' : '' }`}
                        name='password' placeholder='Password' value={password} type='password' onChange={(e) => setPassword(e.target.value) }/>
                        { passwordError && <span className='text-red-600 font-bold text-sm p-1'>{passwordErrorMsg}</span>}
                    </div> 

                    <div className='flex flex-col mt-5 mb-3'>
                    {mainError && <p className='font-bold text-red-600 text-md rounded '>{mainErrorMsg}</p>} 
                    </div>

                    <div className='flex flex-col mt-5 mb-3'>
                    <button className='bg-indigo-500 hover:bg-indigo-600 font-bold p-2 rounded mt-3 text-white'>Submit</button> 
                    </div>

                    </form>

                    <div className="relative flex w-80 py-5 items-center">
                      <div className="flex-grow border-t border-white"></div>
                      <span className="flex-shrink mx-4 text-white">Or</span>
                      <div className="flex-grow border-t border-white"></div>
                    </div>

                    <div className='flex'>
                      <p>Don't have an account?</p>
                      <Link className=" px-3 underline text-yellow hover:text-sky-700"href='/register'>Sign up</Link>  
                    </div>
                </div>
            </div>
    
  )
}

