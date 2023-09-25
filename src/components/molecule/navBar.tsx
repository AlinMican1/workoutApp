'use client'
import React from 'react'
import { ButtonNavBar } from '../atom/button'
import '../../app/globals.css'
import { faXmark,faHome, faDumbbell , faStar, faBarsStaggered} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SignOutBtn } from '../atom/authButtons'

const Open = () => {
    document.querySelector('.sidebar')?.classList.toggle('left-[-300px]')
}
export const NavBar = () => {
  return (
    <>
    <span className='absolute text-white text-4xl top-10 left-5 cursor-pointer' onClick={Open}>
            <i className='px-2 bg-gray-900 rounded-md'><FontAwesomeIcon icon={faBarsStaggered} /></i>
        </span>
    <div className='sidebar  fixed top top-0 bottom-0  overflow-y-scroll no-scrollbar
    p-2 w-[300px] left-[-300px] overflow-y-auto text-center bg-gray-900'>
        
        <div className='text-gray-100 text-xl'>
            <div className=' p-2.5 mt-1 flex items-center  justify-between'> 
                <h1 className='font-bold text-gray-200 text-[18px] ml-3'> Tailwindbar </h1>
                <i className='cursor-pointer  w-[20px]  mr-3 ' onClick={Open}><FontAwesomeIcon className='text-[23px] p-1 rounded-md hover:bg-red-500' icon={faXmark} /></i>
            </div>
            <hr className='my-2 text-gray-600' />
        </div>
        <div className='mt-3 flex flex-col items-center px-4 p-2.5 '>
            <div className='mb-2'>
            <ButtonNavBar btnColor='bg-transparent' btnText = "Home">
                <FontAwesomeIcon icon={faHome} className='text-blue-300' />
            </ButtonNavBar> 
            </div>
            <div className='mb-2'>
            <ButtonNavBar btnColor='bg-transparent' btnText = "Workout Plans">
                <FontAwesomeIcon icon={faDumbbell} className='text-red-300'/>
            </ButtonNavBar>
            </div>
            <div className='mb-2'>
            <ButtonNavBar btnColor='bg-transparent' btnText = "Personal Bests">
                <FontAwesomeIcon icon={faStar} className='text-yellow-300' />
            </ButtonNavBar>
            </div>
        </div>
        <div className='relative bottom-[-630px]'>
            <hr className='my-2 text-gray-600'/>
            <div className='p-2.5 px-4'>
                <SignOutBtn/>
            </div>
            
        </div>
    </div>
    </>
  )
}
