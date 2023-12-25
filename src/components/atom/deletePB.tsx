'use client'
import React from 'react'
import { DeleteButton2 } from '@/components/atom/button';
import { useRouter } from 'next/navigation';

interface DeletePBProps{
    cardId:string,
}
export const DeletePB = ({cardId}:DeletePBProps) => {
  
    return (
    <div>
        <DeleteButton2>
            <DeleteRecord cardId={cardId} />
        </DeleteButton2>
    </div>
  )
}

interface DeleteRecordProps {
    cardId: string; // Update the type accordingly
}
export const DeleteRecord: React.FC<DeleteRecordProps> = ({ cardId }) => {
    
    const router = useRouter();
    const handleClick = async () => {
        
      try{
        
        const response = await fetch ('/api/user/newRecord/Delete',{
          method: 'POST',
         
          body: JSON.stringify({
            cardId
            
          }),
          headers:{
            'Content-type': 'application/json'
          },
          
        })
        if(response.ok){
          router.push('/personalBest');
          router.refresh()
        }
      }catch(error){
        
      }
    };
  
    return (
      <button className={`bg-[#f3405f] text-[16px] m-2 font-bold p-1 rounded-lg  text-titleColor`} onClick={handleClick}>DELETE</button>
    );
  }
  