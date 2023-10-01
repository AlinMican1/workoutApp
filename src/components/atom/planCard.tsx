'use client'
import React from 'react'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { PlanModal } from './planModal'
import { db } from '@/lib/db'
interface PlanCardProps {
    title: string
    cardId: string
    
}
export const PlanCard = ({title,cardId}:PlanCardProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  
  const deleteCard = () => {
    console.log(cardId);
  }

  return (
    <div className='bg-boxDarkPink h-24 m-2 rounded rounded-lg border border-specialPink '>
      <h1 className='flex justify-center text-titleColor m-6'>
        {title}
      </h1>
      <div className='flex justify-end m-2'>
        <button onClick={() => setOpenModal(true)} >
        <FontAwesomeIcon  className='text-[14px] text-red-600' icon={faTrash}></FontAwesomeIcon>
        </button>
        <PlanModal isOpen={openModal} isClose={() => setOpenModal(false)}>
      
                <h3 className='mt-2 justify-center flex text-textError mt-4'>DELETE WORKOUT PLAN?</h3>
              
                
                <div className='flex flex-col justify-center'>
                    <button onClick = {() => deleteCard()} className={`bg-[#f3405f] text-[16px] m-2 font-bold p-1 rounded-lg  text-titleColor`} 
                    >DELETE</button> 
                </div>
           
        </PlanModal>
      </div>
        
    </div>
  )
}

