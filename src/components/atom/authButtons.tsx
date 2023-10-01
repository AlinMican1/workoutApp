
import React from 'react'
import {signOut} from 'next-auth/react';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { db } from '@/lib/db';

export const SignOutBtn = () => {
  return (
    <button className={
     `flex relative text-[14px] 
     min-h-[32px]  rounded rounded-md flex-col  
     hover:bg-indigo-500  items-center text-red-500 duration-150`}  onClick={() => signOut({
      redirect: true,
      callbackUrl: `/login`
    })}>
    <div className=''>
    <FontAwesomeIcon icon={faRightFromBracket} />
    </div>
    Sign Out</button>
  )
}

export const deletebtn = async ({cardId,children}:any) => {
  const deleteCard = await db.workoutPlan.delete({
    where: {
      id: cardId,
    },
  })
  {children}
}
