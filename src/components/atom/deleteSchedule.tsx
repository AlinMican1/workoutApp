'use client'
import React from 'react'
import { DeleteButton } from '@/components/atom/button';
import { useRouter } from 'next/navigation';

interface DeleteScheduleProps{
    scheduleId:string,
}
export const DeleteScheduleCard = ({scheduleId}:DeleteScheduleProps) => {
  
    return (
    <div>
        <DeleteButton>
            <DeleteSchedule scheduleId={scheduleId} />
        </DeleteButton>
    </div>
  )
}


export const DeleteSchedule = ({ scheduleId }:DeleteScheduleProps) => {
    
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
        }
      }catch(error){
        
      }
    };
  
    return (
      <button className={`bg-[#f3405f] text-[16px] m-2 font-bold p-1 rounded-lg  text-titleColor`} onClick={handleClick}>DELETE</button>
    );
  }
  