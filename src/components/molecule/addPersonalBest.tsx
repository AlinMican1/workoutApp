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



function AddPersonalRecord (){
    const [exerciseTitle,setExerciseTitle] = useState('');
    const [exerciseTitleError, setExerciseTitleError] = useState(false);
    const [exerciseTitleErrorMsg, setExerciseTitleErrorMsg] = useState('');
    
    const [weight,setWeight] = useState('');
    const [weightError, setWeightError] = useState(false);
    const [weightErrorMsg, setWeightErrorMsg] = useState('');

    const [mainError, setMainError] = useState<boolean>(false);
    const [mainErrorMsg, setMainErrorMsg] = useState('');
    
    const [openModal, setOpenModal] = useState<boolean>(false);

    const [colorCard,setColorCard] = useState('boxDarkPink');

    const handleClick = (color:any) =>{
         setColorCard(color);
    };
    const session = useSession();
    const router = useRouter();

    if(session.status !== "authenticated"){
        return null;
    }

    const onSubmit = async (e: React.FormEvent) =>{
        e.preventDefault()
        
        if(exerciseTitle === '') {
            setExerciseTitleError(true);
            setExerciseTitleErrorMsg('Insert a title'); 
        }else {
            setExerciseTitleError(false);
            setExerciseTitleErrorMsg(''); 
        }

        if(weight === '') {
            setWeightError(true);
            setWeightErrorMsg('Insert a weight'); 
        }else if(!parseFloat(weight)){
            setWeightError(true);
            setWeightErrorMsg('Insert a number'); 
        }
        else{
            setWeightError(false);
            setWeightErrorMsg('');
        }

        try {
            
            const response = await fetch('/api/user/newRecord/Create' ,{
                method: 'POST',
                body: JSON.stringify({
                    exerciseTitle,
                    weight,
                    color: colorCard,
                    email: session.data?.user.email?.toString(),
                    
                }),
                headers: {
                    'Content-Type': 'application/json', // Set the content type
                },
            })
            
            if(response.ok){
                const responseData = await response.json();
                console.log(responseData);
                
                setExerciseTitle('');
                setExerciseTitleError(false);

                setWeight('');
                setWeightError(false);

                setMainError(false)
                setMainErrorMsg('');
                setOpenModal(false);
                
                router.refresh();
            
            }else {
                const errorData = await response.json();
                
          }
        }catch(error){
            
            setMainError(true)
            setMainErrorMsg('Internal error try again.');
           
        }
       
    }

    return (
    <div>
        
        <ButtonNavBar onclick={() => setOpenModal(true)}>
            <FontAwesomeIcon icon={faPlus} />
        </ButtonNavBar> 
        
        <PlanModal isOpen={openModal} isClose={() => setOpenModal(false)}> 
            <form onSubmit={onSubmit}>
                <h3 className='mt-2 justify-center flex text-titleColor'>Add your Personal Best</h3>
                
                    
                <InputField
                    name="exercise"
                    value={exerciseTitle}
                    onChange={(e) => setExerciseTitle(e.target.value)}
                    placeholder="Exercise"
                    error={exerciseTitleError}
                    errorMessage={exerciseTitleErrorMsg}
                />
             
                 <InputField
                    name="weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Weight"
                    error={weightError}
                    errorMessage={weightErrorMsg}
                />
                <button type="button" className='bg-pink-300 mb-7' onClick={() => handleClick("red-500")}>Pink</button>
                
                <div className={`text-textError `}>
                    {mainError && <p> {mainErrorMsg}</p>}
                </div>
                
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
export default function AddPersonalBest ()  {
    const session = useSession();
    
    if(session.status !== "authenticated"){
       return (
        <div>
        <h1 className="text-red-500">PLEASE SIGN IN TO USE FEATURE!</h1>
        </div>
       )
    }
    return (
        <AddPersonalRecord />
    )
}