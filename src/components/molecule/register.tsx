
import Link from 'next/link';
import '../../app/globals.css';

export default function Register(){
    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <h1 className='text-white text-center font-bold text-4xl'>Register Account</h1>
            <div className='flex flex-col justify-center items-center text-white w-1/3 h-[700px] bg-[#3F4147] my-5 rounded-md shadow-2xl'>
                <form>
                    <div className='flex flex-col mt-2 mb-1'>
                    <h3 className='text-white font-bold'>Email</h3>
                    <input className='p-2 w-80 border border-gray-300 rounded shadow-2xl' placeholder='Email' />
                    <span className='text-red-600 p-1'>*Email is Required</span>
                    </div>
                    <div className='flex flex-col mt-2 mb-1'>
                    <h3 className='text-white font-bold'>Email</h3>
                    <input className='p-2 w-80 border border-gray-300 rounded shadow-2xl' placeholder='Email' />
                    <span className='text-red-600 p-1'>*Email is Required</span>
                    </div>
                    <div className='flex flex-col mt-2 mb-1'>
                    <h3 className='text-white font-bold'>Email</h3>
                    <input className='p-2 w-80 border border-gray-300 rounded shadow-2xl' placeholder='Email' />
                    <span className='text-red-600 p-1'>*Email is Required</span>
                    </div>
                    <div className='flex flex-col mt-2 mb-1'>
                    <h3 className='text-white font-bold'>Email</h3>
                    <input className='p-2 w-80 border border-gray-300 rounded shadow-2xl' placeholder='Email' />
                    <span className='text-red-600 p-1'>*Email is Required</span>
                    </div>
                    <div className='flex flex-col mt-5 mb-3'>
                    <button className='bg-indigo-500 p-2 rounded mt-3 text-white'>Submit</button>
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