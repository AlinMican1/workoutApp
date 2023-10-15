'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import InputField from './inputBox';
import { PlanModal } from './planModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

interface EditScheduleProps{
    scheduleId:string,
}

export const EditScheduleCard = ({scheduleId}:EditScheduleProps) => {
    return (
    <div>
        <EditSchedule scheduleId={scheduleId} />
    </div>
  )
}


export const EditSchedule = ({ scheduleId }:EditScheduleProps) => {
    
    const [newWeight,setNewWeight] = useState('');
    const [newWeightError, setNewWeightError] = useState(false);
    const [newWeightErrorMsg, setNewWeightErrorMsg] = useState('');

    const [newSets,setNewSets] = useState('');
    const [newSetsError, setNewSetsError] = useState(false);
    const [newSetsErrorMsg, setNewSetsErrorMsg] = useState('');

    const [newReps,setNewReps] = useState('');
    const [newRepsError, setNewRepsError] = useState(false);
    const [newRepsErrorMsg, setNewRepsErrorMsg] = useState('');
    
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

        if(newSets === '' || !parseFloat(newSets)){
            setNewSetsError(true);
            setNewSetsErrorMsg('Insert a set number');
        }else if(newSets.length > 3){
            setNewSetsError(true);
            setNewSetsErrorMsg('Keep it realistic please :)'); 
        }
        else{
            setNewSetsError(false);
            setNewSetsErrorMsg('');
        }

        if(newReps === '' || !parseFloat(newReps) ) {
            setNewRepsError(true);
            setNewRepsErrorMsg('Insert a rep number'); 
        }else if(newReps.length > 4){
            setNewRepsError(true);
            setNewRepsErrorMsg('Keep it realistic please :)'); 
        }
        else{
            setNewRepsError(false);
            setNewRepsErrorMsg('');
        }

        try {
            
            const response = await fetch(`/api/user/newSchedule/Edit` ,{
                method: 'PUT',
                body: JSON.stringify({
                    id: scheduleId,
                    newWeight,
                    newReps,
                    newSets,
                    
                    
                }),
                headers: {
                    'Content-Type': 'application/json', // Set the content type
                },
            })
            
            if(response.ok){
                setOpenModal(false);
                setNewRepsError(false);
                setNewRepsErrorMsg('');
                setNewSetsError(false);
                setNewSetsErrorMsg('');
                setNewWeightError(false);
                setNewWeightErrorMsg('');
                setNewWeight('');
                setNewReps('')
                setNewSets('')
                router.refresh();
            
            }else {
                const errorData = await response.json();
                
          }
        }catch(error){

        }
       
    }
    return (
        <>
        <button onClick={() => setOpenModal(true)}>
         <FontAwesomeIcon icon={faPenToSquare} />
        </button> 
        <PlanModal isOpen={openModal} isClose={() => setOpenModal(false)}> 
       
        <form onSubmit={onSubmit}>
            <div className='mt-4'>
            <InputField
            name="weight"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            placeholder="New Weight"
            error={newWeightError}
            errorMessage={newWeightErrorMsg}
            />

            <InputField
            name="sets"
            value={newSets}
            onChange={(e) => setNewSets(e.target.value)}
            placeholder="New Set"
            error={newSetsError}
            errorMessage={newSetsErrorMsg}
            />

            <InputField
            name="reps"
            value={newReps}
            onChange={(e) => setNewReps(e.target.value)}
            placeholder="New Rep"
            error={newRepsError}
            errorMessage={newRepsErrorMsg}
            />
            </div>
            <button className='bg-blue-500 text-[16px] mt-[2px] font-bold p-1 rounded-lg w-full text-titleColor'>Update</button>
           
        </form>
        </PlanModal>
        </>
    );
  }
  