'use client'
import React, { useState } from 'react'
import { ButtonNavBar, UpdateButton } from '@/components/atom/button';
import { useRouter } from 'next/navigation';
import InputField from './inputBox';
import { PlanModal } from './planModal';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
interface EditPBProps{
    cardId:string,
}
export const EditPB = ({cardId}:EditPBProps) => {
    return (
    <div>
       
        
        <EditRecord cardId={cardId} />
       
       
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
    
    const [openModal, setOpenModal] = useState<boolean>(false);
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
                setOpenModal(false);
                router.refresh();
            
            }else {
                const errorData = await response.json();
                
          }
        }catch(error){
            
         
           
        }
       
    }
    return (
        <>
        <UpdateButton onClick={() => setOpenModal(true)}>
         Update
        </UpdateButton> 
        <PlanModal isOpen={openModal} isClose={() => setOpenModal(false)}> 
       
        <form onSubmit={onSubmit}>
            <div className='mt-2'>
            <InputField
            name="weight"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            placeholder="New Weight"
            error={newWeightError}
            errorMessage={newWeightErrorMsg}
            />
            </div>
            <button className='bg-blue-500 text-[16px] mt-[2px] font-bold p-1 rounded-lg w-full text-titleColor'>Update</button>
           
        </form>
        </PlanModal>
        </>
    );
  }
  