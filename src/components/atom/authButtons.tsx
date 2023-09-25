'use client'
import React from 'react'
import {signOut} from 'next-auth/react';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export const SignOutBtn = () => {
  return (
    <button className={
     `flex relative items-center w-[250px] px-3 text-[17px] 
    py-2 min-h-[32px] font-semibold rounded rounded-md bg-transparent 
    hover:bg-red-500   duration-150 hover:px-5`}  onClick={() => signOut({
      redirect: true,
      callbackUrl: `/login`
    })}>
    <div className='w-4 h-6 mr-5'>
    <FontAwesomeIcon icon={faRightFromBracket} />
    </div>
    Sign Out</button>
  )
}
