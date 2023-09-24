'use client'

import Link from 'next/link';
import '../../app/globals.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function Register(){

    const router = useRouter();
    const [email,setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    
    const [username,setName] = useState('');
    const [nameError, setNameError] = useState(false);
    const [nameErrorMsg, setNameErrorMsg] = useState('');

    const [password,setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

    const [password2,setPassword2] = useState('')
    const [password2Error, setPassword2Error] = useState(false);
    const [password2ErrorMsg, setPassword2ErrorMsg] = useState('');
   
    const [mainError, setMainError] = useState(false);
    const[mainErrorMsg,setMainErrorMsg] = useState<string | null>(null)

    let errorUserName: boolean = false
    let errorEmail: boolean = false
    let errorPassword: boolean = false
    let errorPassword2: boolean = false


    const isValidEmail = (emailValid: string): boolean => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(emailValid).toLowerCase());
      };

    const onSubmit = async (e: React.FormEvent) =>{
        e.preventDefault()
        
        if (email === '') {
            setEmailError(true);
            errorEmail = true;
            setEmailErrorMsg('Email is required');
          } else if (!isValidEmail(email)) {
            setEmailError(true);
            errorEmail = true;
            setEmailErrorMsg('Provide a valid email address');
          } else {
            setEmailError(false);
            errorEmail = false;
            setEmailErrorMsg('');
          }
        
        if(username === '') {
            setNameError(true);
            errorUserName = true
            setNameErrorMsg('Username is required');
            
        } else if(username.length > 16){
            setNameError(true);
            errorUserName = true
            setNameErrorMsg('Username must be under 16 characters');
        }else {
            setNameError(false);
            errorUserName = false
            setNameErrorMsg('');
        }

        if(password === '') {
            setPasswordError(true);
            errorPassword = true;
            setPasswordErrorMsg('Password is required');
            
          } else if (password.length < 8 ) {
            setPasswordError(true);
            errorPassword = true;
            setPasswordErrorMsg('Password must be at least 8 characters.');
           
          } else {
            setPasswordError(false);
            errorPassword = false;
            setPasswordErrorMsg('');
          }
    
          if(password2 === '') {
            setPassword2Error(true);
            errorPassword2 = true;
            setPassword2ErrorMsg('Please confirm your password.');
              
          } else if (password2 !== password) {
            setPassword2Error(true);
            errorPassword2 = true;
            setPassword2ErrorMsg('Passwords doesn\'t match.');
              
             
          } else {
            setPassword2Error(false);
            errorPassword2 = false;
            setPassword2ErrorMsg('');
          }
          
          
          if(errorEmail === false && errorPassword === false && errorPassword2 === false && errorUserName === false){
            
            try{
                
                const response = await fetch ('api/user/register',{
                  method: 'POST',
                 
                  body: JSON.stringify({
                    email,
                    username,
                    password
                    
                  }),
                  headers:{
                    'Content-type': 'application/json'
                  },
                  
                })
                
          if(response.ok){
            setMainError(false);
            router.push('/login')
          }else{
            const errorData = await response.json();
            setMainError(true);
            setMainErrorMsg(/*(await res.json()).error*/ errorData.message)
          }
        }catch(error:any){
            setMainError(true);
            setMainErrorMsg(/*error?.message*/ "Internal error, please try again!")
            
        }
      }
    };
    

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <h1 className='text-white text-center font-bold text-4xl'>Register Account</h1>
            <div className='flex flex-col justify-center items-center text-white w-[450px] h-[700px] bg-[#3F4147] my-5 rounded-md shadow-2xl'>
                <form onSubmit={onSubmit}>
                    
                    <div className='flex flex-col mt-3 mb-1'>
                    <label  className='text-white font-bold'>Email</label>
                    <input className={`p-2 w-80 rounded border-2 border-[#424549] focus:outline-none focus:border-indigo-500 text-black ${
                        emailError ? 'border-red-500 focus:border-red-500' : '' }`}
                    name='email' autoComplete='email' placeholder='Email' value={email} type='text' onChange={(e) => setEmail(e.target.value) }/>
                     {emailError && <span className='text-red-600 font-bold text-sm p-1'>{emailErrorMsg}</span>}
                    </div> 
                    
                    <div className='flex flex-col mt-3 mb-1'>
                    <label  className='text-white font-bold'>Username</label>
                    <input className={`p-2 w-80 rounded border-2 border-[#424549] focus:outline-none focus:border-indigo-500 text-black ${
                        nameError? 'border-red-500 focus:border-red-500' : '' }`}
                        name='name' placeholder='Username' value={username} type='text' onChange={(e) => setName(e.target.value) }/>
                        { nameError && <span className='text-red-600 font-bold text-sm p-1'>{nameErrorMsg}</span>}
                    </div> 

                    <div className='flex flex-col mt-3 mb-1'>
                    <label  className='text-white font-bold'>Password</label>
                    <input className={`p-2 w-80 rounded border-2 border-[#424549] focus:outline-none focus:border-indigo-500 text-black ${
                        passwordError ? 'border-red-500 focus:border-red-500' : '' }`}
                        name='password' placeholder='Password' value={password} type='password' onChange={(e) => setPassword(e.target.value) }/>
                        { passwordError && <span className='text-red-600 font-bold text-sm p-1'>{passwordErrorMsg}</span>}
                    </div>

                    <div className='flex flex-col mt-3 mb-1'>
                    <label  className='text-white font-bold'>Confirm Password</label>
                    <input className={`p-2 w-80 rounded border-2 border-[#424549] focus:outline-none focus:border-indigo-500 text-black ${
                        password2Error ? 'border-red-500 focus:border-red-500' : '' }`}
                        name='password' placeholder='Confirm Password' value={password2} type='password' onChange={(e) => setPassword2(e.target.value) }/>
                        { password2Error && <span className='text-red-600 font-bold text-sm p-1'>{password2ErrorMsg}</span>}
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
                    <p>Already have an account?</p>
                    <Link className=" px-3 underline text-yellow hover:text-sky-700"href='/login'>Sign In</Link>
                    
                    
                </div>
            
            </div> 
        </div>
        
    )
}