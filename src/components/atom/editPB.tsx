'use client'
import React, { useState } from 'react'
import { EditButton } from '@/components/atom/button';
import { useRouter } from 'next/navigation';
import InputField from './inputBox';
import { useSession } from 'next-auth/react';
import Provider from '@/lib/client-provider';

interface EditPBProps{
    cardId:string,
}
export const EditPB = ({cardId}:EditPBProps) => {
    return (
    <div>
       
        <EditButton>
            <EditRecord cardId={cardId} />
        </EditButton>
       
    </div>
  )
}

interface EditRecordProps {
    cardId: string; 
}
export const EditRecord: React.FC<EditRecordProps> = ({ cardId }) => {
    
    const [newWeight, setNewWeight] = useState('');
    const [newWeightError, setNewWeightError] = useState<boolean>(false);
    const [newWeightErrorMsg, setNewWeightErrorMsg] = useState('');
    
    const router = useRouter();
   

    
    const onSubmit = async (e: React.FormEvent) =>{
        e.preventDefault()
        
        if(newWeight === '' || !parseFloat(newWeight)){
            setNewWeightError(true);
            setNewWeightErrorMsg('Insert a weight');
        }else if(newWeight.length > 4){
            setNewWeightError(true);
            setNewWeightErrorMsg('Keep it realistic please :)'); 
        }
        else{
            setNewWeightError(false);
            setNewWeightErrorMsg('');
        }

        try {
           
            const response = await fetch(`/api/user/newRecord/Edit/${cardId}` ,{
                method: 'PUT',
                body: JSON.stringify({
                    newWeight,
                    
                    
                }),
                headers: {
                    'Content-Type': 'application/json', // Set the content type
                },
            })
            
            if(response.ok){
                router.refresh();
            
            }else {
                const errorData = await response.json();
                
          }
        }catch(error){
            
         
           
        }
       
    }
    return (
     
        <form onSubmit={onSubmit}>
            <InputField
            name="weight"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            placeholder="New Weight"
            error={newWeightError}
            errorMessage={newWeightErrorMsg}
            />
            
            <button className='bg-blue-500 text-[16px] font-bold p-1 rounded-lg w-full text-titleColor'>Update</button>
        </form>
       
    );
  }
  