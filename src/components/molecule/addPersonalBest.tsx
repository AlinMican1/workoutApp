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
import { ColorButton } from '../atom/button'


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


    //I changed this to string in case in dont work from any
    const handleClick = (color:string) =>{
         setColorCard(color);
    };
    const session = useSession();
    const router = useRouter();

    if(session.status !== "authenticated"){
        return null;
    }

    const onSubmit = async (e: React.FormEvent) =>{
        e.preventDefault()
        let modifiedTitle = exerciseTitle; 
        if(exerciseTitle === '') {
            setExerciseTitleError(true);
            setExerciseTitleErrorMsg('Insert a exercise title'); 
        }else if(exerciseTitle.length > 25){
            setExerciseTitleError(true);
            setExerciseTitleErrorMsg('Exercise title too long'); 
        }else if(exerciseTitle.length > 12 && exerciseTitle.length <= 25){
            let count = 0;

            for (let i = 0; i < exerciseTitle.length; i++){
                if(exerciseTitle[i] === ' '){
                    count = 0;
                }
                else{
                    count++;
                }
                if(count > 12){
                    modifiedTitle = modifiedTitle.slice(0, i) + ' ' + modifiedTitle.slice(i);
                    count = 0; // Reset the count
                    i++; // Skip the newly inserted space
                }
            }
            
            
            
        }
        
        else {
        
            setExerciseTitleError(false);
            setExerciseTitleErrorMsg('');
          }
        
        if(weight === '') {
            setWeightError(true);
            setWeightErrorMsg('Insert a weight'); 
        }else if(!parseFloat(weight)){
            setWeightError(true);
            setWeightErrorMsg('Insert a number'); 
        }else if(weight.length > 6){
            setWeightError(true);
            setWeightErrorMsg('Keep it realistic please :)'); 
        }
        else{
            setWeightError(false);
            setWeightErrorMsg('');
        }

        try {
            
            const response = await fetch('/api/user/newRecord/Create' ,{
                method: 'POST',
                body: JSON.stringify({
                    exerciseTitle: modifiedTitle,
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
                <h3 className='m-2 justify-center flex text-titleColor'>Add your Personal Best</h3>
                
                    
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
                <h3 className='flex justify-center font-normal text-textColor mt-4'>Sort by colour</h3>
                <div className='grid grid-cols-4 gap-4 justify-center mt-2 '>
                    <ColorButton btnColor={'bg-red-500'} onClick={() => handleClick("bg-boxDarkPink")} />
                    <ColorButton btnColor={'bg-blue-500'} onClick={() => handleClick("bg-boxDarkBlue")} />
                    <ColorButton btnColor={'bg-boxDarkPurple'} onClick={() => handleClick("bg-boxDarkPurple")} />
                    <ColorButton btnColor={'bg-boxDarkGreen'} onClick={() => handleClick("bg-boxDarkGreen")} />
                </div>
                <div className={`text-textError `}>
                    {mainError && <p> {mainErrorMsg}</p>}
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