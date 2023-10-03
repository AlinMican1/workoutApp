'use client'
import React from 'react'
import { ButtonNavBar } from '../atom/button'
import '../../app/globals.css'
import { faXmark,faHome, faDumbbell , faStar, faBarsStaggered} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SignOutBtn } from '../atom/authButtons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const NavBar = () => {
    const pathname = usePathname();

    if(pathname === '/login' || pathname === '/register'){
        return;
    }
    return (
    <div className='bg-darkgray max-h-[4rem]  border-t border-specialPink px-6 rounded-t-xl flex fixed bottom-0 left-0 w-full'>
        <div className='w-full'>
            <li className='flex  p-2.5 justify-between'>
            <Link href={'/'}>
                <ButtonNavBar btnColor='bg-transparent' btnText = "Home">
                    <FontAwesomeIcon icon={faHome} className='text-blue-300' />
                </ButtonNavBar> 
            </Link>
            
            <Link href={'/workout'}>
                <ButtonNavBar btnColor='bg-transparent' btnText = "Workout">
                    <FontAwesomeIcon icon={faDumbbell} className='text-red-300'/>
                </ButtonNavBar>
            </Link>
            
            <Link href={'/personalBest'}>
                <ButtonNavBar btnColor='bg-transparent' btnText = "Personal">
                    <FontAwesomeIcon icon={faStar} className='text-yellow-300' />
                </ButtonNavBar>
            </Link>
            
            <div className=''>
                <SignOutBtn/>
            </div>
            


        </li>
        </div>
    </div>
    // <>
    // <span className='absolute text-white text-4xl top-10 left-5 cursor-pointer' onClick={Open}>
    //         <i className='px-2 bg-gray-900 rounded-md'><FontAwesomeIcon icon={faBarsStaggered} /></i>
    //     </span>
    // <div className='sidebar  fixed top top-0 bottom-0  overflow-y-scroll no-scrollbar
    // p-2 w-[300px] left-[-300px] overflow-y-auto text-center bg-gray-900'>
        
    //     <div className='text-gray-100 text-xl'>
    //         <div className=' p-2.5 mt-1 flex items-center  justify-between'> 
    //             <h1 className='font-bold text-gray-200 text-[18px] ml-3'> Tailwindbar </h1>
    //             <i className='cursor-pointer  w-[20px]  mr-3 ' onClick={Open}><FontAwesomeIcon className='text-[23px] p-1 rounded-md hover:bg-red-500' icon={faXmark} /></i>
    //         </div>
    //         <hr className='my-2 text-gray-600' />
    //     </div>
    //     <div className='mt-3 flex flex-col items-center px-4 p-2.5 '>
    //         <div className='mb-2'>
    //         <Link href={'/'}>
    //         <ButtonNavBar btnColor='bg-transparent' btnText = "Home">
    //             <FontAwesomeIcon icon={faHome} className='text-blue-300' />
    //         </ButtonNavBar> 
    //         </Link>
    //         </div>
    //         <div className='mb-2'>
    //         <Link href={'/workout'}>
    //         <ButtonNavBar btnColor='bg-transparent' btnText = "Workout Plans">
    //             <FontAwesomeIcon icon={faDumbbell} className='text-red-300'/>
    //         </ButtonNavBar>
    //         </Link>
    //         </div>
    //         <div className='mb-2'>
    //         <ButtonNavBar btnColor='bg-transparent' btnText = "Personal Bests">
    //             <FontAwesomeIcon icon={faStar} className='text-yellow-300' />
    //         </ButtonNavBar>
    //         </div>
    //     </div>
    //     <div className='relative'>
    //         <hr className='my-2 text-gray-600'/>
    //         <div className='p-2.5 px-4'>
    //             <SignOutBtn/>
    //         </div>
            
    //     </div>
    // </div>
    // </>
  )
}
