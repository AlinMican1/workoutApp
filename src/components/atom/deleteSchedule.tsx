'use client'
import React, { useState } from 'react'
import { DeleteButton } from '@/components/atom/button';
import { useRouter } from 'next/navigation';
import { PlanModal } from './planModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
interface DeleteScheduleProps{
    scheduleId:string,
}
export const DeleteScheduleCard = ({scheduleId}:DeleteScheduleProps) => {
    
    return (
    <div>
        
          <DeleteSchedule scheduleId={scheduleId} />
        
    </div>
  )
}


export const DeleteSchedule = ({ scheduleId }:DeleteScheduleProps) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const router = useRouter();
    const handleClick = async () => {
      
      try{
        
        const response = await fetch ('/api/user/newSchedule/Delete',{
          method: 'POST',
         
          body: JSON.stringify({
            scheduleID: scheduleId
            
          }),
          headers:{
            'Content-type': 'application/json'
          },
          
        })
        if(response.ok){
          router.refresh();
          setOpenModal(false);
        }
      }catch(error){
        
      }
    };
  
    return (
      <div>
        <button onClick={() => setOpenModal(true)} className=''><FontAwesomeIcon icon={faTrash}/></button>
      <PlanModal isOpen={openModal} isClose={() => setOpenModal(false)}> 
       
        <div className='flex justify-center flex-col'>
          <h1 className='text-red-500 text-center mt-2'>Delete schedule card?</h1>
          <button className={`bg-[#f3405f] text-[16px] mt-2  font-bold p-1 rounded-lg  text-titleColor`} onClick={handleClick}>DELETE</button>
        </div>
     
      </PlanModal>
      </div>
    );
  }
  