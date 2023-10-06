import React from 'react'
import { useEffect } from 'react'

interface PlanModalProps{
    //children: React.ReactChildren | React.ReactChild;
    isOpen: boolean;
    isClose: () => void;
    children: React.ReactNode;
}




export const PlanModal = ({isOpen,isClose,children}: PlanModalProps) => {
  
    
        if(!isOpen) return null;

        const handleClose = (e:any) => {
            if(e.target.id === 'wrapper'){
                isClose();
            } 
        }
    
        return (
        <div className={`fixed flex inset-0 transition-colors backdrop-blur-sm justify-center items-center 
        `} onClick={handleClose} id='wrapper' >
            
            <div className={`bg-darkgray-2 rounded-xl  shadow p-6 transition-all max-w-md w-9/12
            ${isOpen ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`} onClick={(e) => e.stopPropagation()}>
            
            <button onClick={isClose} className=' absolute top-2 right-2 z-10 font-semibold text-titleColor'>Close</button>
            <div className=' p-2 rounded text-black'>{children}</div>
            
            
                
            </div>
           
           
        </div>
  )
}

