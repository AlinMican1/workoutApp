'use client'
import React from 'react'

import { ButtonNavBar, SelectDayButton } from '../atom/button'
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

    const handleClick = (day:string) =>{
        setDay(day);
      
        
    };
    

    const onSubmit = async (e: React.FormEvent) =>{
        e.preventDefault()

        if(day === ''){
            setDayError(true);
            setDayErrorMsg('Select a day');
        }
        else{
            setDayError(false);
            setDayErrorMsg('');
        }

        if(exerciseTitle === '') {
            setExerciseTitleError(true);
            setExerciseTitleErrorMsg('Insert a exercise title'); 
        }else if(exerciseTitle.length > 25){
            setExerciseTitleError(true);
            setExerciseTitleErrorMsg('Exercise title too long'); 
        }else{
            setExerciseTitleError(false);
            setExerciseTitleErrorMsg(''); 
        }

        if(weight === '') {
            setWeightError(true);
            setWeightErrorMsg('Insert a weight'); 
        }else if(!parseFloat(weight)){
            setWeightError(true);
            setWeightErrorMsg('Insert a number'); 
        }else if(weight.length > 5){
            setWeightError(true);
            setWeightErrorMsg('Keep it realistic please :)'); 
        }
        else{
            setWeightError(false);
            setWeightErrorMsg('');
        }

        if(sets === '') {
            setSetsError(true);
            setSetsErrorMsg('Insert sets'); 
        }else if(!parseFloat(sets)){
            setSetsError(true);
            setSetsErrorMsg('Insert a number'); 
        }else if(sets.length > 3){
            setSetsError(true);
            setSetsErrorMsg('Keep it realistic please :)'); 
        }
        else{
            setSetsError(false);
            setSetsErrorMsg(''); 
        }

        if(reps === '') {
            setRepsError(true);
            setRepsErrorMsg('Insert reps'); 
        }else if(!parseFloat(reps)){
            setRepsError(true);
            setRepsErrorMsg('Insert a number'); 
        }else if(reps.length > 6){
            setRepsError(true);
            setRepsErrorMsg('Keep it realistic please :)'); 
        }
        else{
            setRepsError(false);
            setRepsErrorMsg('');
        }

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
                <div className='text-textColor mt-2'>Tap a day</div>
                <div className='flex mt-2 mb-2 flex-cols gap-[10px] justify-center border p-2 rounded-lg'>
                    <SelectDayButton nameButton='Mo' onClick={() => handleClick("monday")} day={day} />
                    <SelectDayButton nameButton='Tu' onClick={() => handleClick("tuesday")}  day={day} />
                    <SelectDayButton nameButton='We' onClick={() => handleClick("wednesday")} day={day} />
                    <SelectDayButton nameButton='Th' onClick={() => handleClick("thursday")} day={day}/>
                    <SelectDayButton nameButton='Fr' onClick={() => handleClick("friday")} day={day}/>
                    <SelectDayButton nameButton='Sa' onClick={() => handleClick("saturday")} day={day}/>
                    <SelectDayButton nameButton='Su' onClick={() => handleClick("sunday")} day={day}/>
                </div>
                {dayError && <p className="text-red-500 text-sm ">{dayErrorMsg}</p>}
                {/* <InputField
                    name="day"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    placeholder="day"
                    error={dayError}
                    errorMessage={dayErrorMsg}
                /> */}
                <div className='text-titleColor uppercase font-semibold flex justify-center m-2'>{day}</div>
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