'use client'
import React from 'react'

import { ButtonNavBar } from '../atom/button'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PlanModal } from '../atom/planModal'
import { useState } from 'react'
import InputField from '../atom/inputBox'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';



function AddSchedule ({ id }: { id: string }){
    
    
    const [day,setDay] = useState('');
    const [dayError, setDayError] = useState(false);
    const [dayErrorMsg, setDayErrorMsg] = useState('');
    
    const [exerciseTitle,setExerciseTitle] = useState('');
    const [exerciseTitleError, setExerciseTitleError] = useState(false);
    const [exerciseTitleErrorMsg, setExerciseTitleErrorMsg] = useState('');

    const [weight,setWeight] = useState('');
    const [weightError, setWeightError] = useState(false);
    const [weightErrorMsg, setWeightErrorMsg] = useState('');

    const [sets,setSets] = useState('');
    const [setsError, setSetsError] = useState(false);
    const [setsErrorMsg, setSetsErrorMsg] = useState('');

    const [reps,setReps] = useState('');
    const [repsError, setRepsError] = useState(false);
    const [repsErrorMsg, setRepsErrorMsg] = useState('');
    
    
    const [openModal, setOpenModal] = useState<boolean>(false);
    
    const session = useSession();
    const router = useRouter();

    if(session.status !== "authenticated"){
        return null;
    }

    if(id === ''){
        return null;
    }

    const onSubmit = async (e: React.FormEvent) =>{
        e.preventDefault()
        
        try {
            const response = await fetch('/api/user/newSchedule/Create' ,{
                method: 'POST',
                body: JSON.stringify({
                    day,
                    exerciseTitle,
                    weight,
                    reps,
                    sets,
                    id,
                    email: session.data?.user.email?.toString(),
                    
                }),

                headers: {
                    'Content-Type': 'application/json', // Set the content type
                },
            })
            
            if(response.ok){
                const responseData = await response.json();
                
                setExerciseTitleError(false)
                setExerciseTitleErrorMsg('');

                setDayError(false);
                setDayErrorMsg('');

                setWeightError(false);
                setWeightErrorMsg('');

                setRepsError(false);
                setRepsErrorMsg('');
                
                setSetsError(false);
                setSetsErrorMsg('');

                setOpenModal(false);
                
                setExerciseTitle('');
                setDay('');
                setWeight('');
                setReps('');
                setSets('');

                router.refresh();
            
            }else {
                const errorData = await response.json();
                  
            }
        }catch(error){
            
        }
    }

    return (
    <div>
        
        <ButtonNavBar onclick={() => setOpenModal(true)}>
            <FontAwesomeIcon icon={faPlus} />
        </ButtonNavBar> 
        
        <PlanModal isOpen={openModal} isClose={() => setOpenModal(false)}> 
            <form  onSubmit={onSubmit}>
                <h3 className='mt-2 justify-center flex text-titleColor'>Add Card</h3>
                
                <InputField
                    name="day"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    placeholder="day"
                    error={dayError}
                    errorMessage={dayErrorMsg}
                />

                <InputField
                    name="exercise"
                    value={exerciseTitle}
                    onChange={(e) => setExerciseTitle(e.target.value)}
                    placeholder="exercise"
                    error={exerciseTitleError}
                    errorMessage={exerciseTitleErrorMsg}
                />

                <InputField
                    name="weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="weight"
                    error={weightError}
                    errorMessage={weightErrorMsg}
                />

                <InputField
                    name="sets"
                    value={sets}
                    onChange={(e) => setSets(e.target.value)}
                    placeholder="sets"
                    error={setsError}
                    errorMessage={setsErrorMsg}
                />

                <InputField
                    name="reps"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    placeholder="reps"
                    error={repsError}
                    errorMessage={repsErrorMsg}
                />
                
                <div className='flex flex-col mt-2 '>
                    <button className={`bg-[#f3405f] text-[16px]  font-semibold p-1 rounded-lg w-[25%] text-titleColor`} 
                    >Add</button> 
                </div>
            </form>
        </PlanModal> 
            
        
    </div>
  )
}

//Call function here so we don't render everything if not authenticated.
export default function AddScheduleCard  ({ id }: { id: string })  {
    const session = useSession();
    
    if(session.status !== "authenticated"){
       return (
        <div>
        <h1 className="text-textError flex justify-center p-2 uppercase font-bold">PLEASE SIGN IN TO USE FEATURE!</h1>
        </div>
       )
    }

    return (
        <AddSchedule id={id}/>
    )
}