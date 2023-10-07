'use client'
import React, { Children, ReactNode } from 'react';
import '../../app/globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { PlanModal } from './planModal';
interface ButtonConfig {
    btnText?: string
    btnColor?: string;
    onclick?: () => void;
    children?: ReactNode;
    //btnIcon?: React.ReactNode;
  }

export const ButtonNavBar: React.FC<ButtonConfig> = ({btnText,btnColor, onclick, children, ...props}) => {
    
    return (
  
    <button onClick={onclick} 
    className= { `${btnColor} 
    + flex relative text-[14px] 
    min-h-[32px]  rounded rounded-md flex-col  
    hover:bg-indigo-500  items-center duration-150` } {...props} > 
    <div className=''>
    {children}
    </div>
    <div>
    <span className='text-textColor'>{btnText}</span>
    </div>
    
    </button>
    
  )
}

interface ColorButtonProps{
  onClick?: () => void,
  btnColor: string,
}
export const ColorButton = ({onClick,btnColor}:ColorButtonProps) => {
  return(
  <button onClick={onClick} className={`w-12 h-6 rounded rounded-lg bg-pink-300 ${btnColor}`}>
    
  </button>
  )
}
interface DeleteButtonProps{
  onClick?: () => void,
  children: React.ReactNode;
}
export const DeleteButton = ({onClick,children} :DeleteButtonProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <div>
    <button onClick={() => setOpenModal(true)}>
      <FontAwesomeIcon className='text-[14px] text-red-600' icon={faTrash}/>
      </button>
      <PlanModal isOpen={openModal} isClose={() => setOpenModal(false)}>
      
                <h3 className='mt-2 justify-center flex text-textError mt-4'>DELETE WORKOUT PLAN?</h3>

                <div className='flex flex-col justify-center'>
                  {children}
                  {/* <button onClick={onClick} /> */}
                    
                </div>
           
        </PlanModal>
      </div>
  )
}