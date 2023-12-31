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



function AddWorkout (){
    const [title,setTitle] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [titleErrorMsg, setTitleErrorMsg] = useState('');
    const [openModal, setOpenModal] = useState<boolean>(false);
    
    const session = useSession();
    const router = useRouter();

    if(session.status !== "authenticated"){
        return null;
    }

    const onSubmit = async (e: React.FormEvent) =>{
        e.preventDefault()
        
        try {
            const response = await fetch('/api/user/newPlan/Create' ,{
                method: 'POST',
                body: JSON.stringify({
                    title,
                    email: session.data?.user.email?.toString(),
                    
                }),

                headers: {
                    'Content-Type': 'application/json', // Set the content type
                },
            })
            
            if(response.ok){
                const responseData = await response.json();
                setTitleError(false)
                setTitleErrorMsg('');
                setOpenModal(false);
                setTitle('');
                router.refresh();
            
            }else {
                const errorData = await response.json();
                setTitleError(true)
                setTitleErrorMsg(errorData.message);     
            }
        }catch(error){
            setTitleError(true)
            setTitleErrorMsg('Internal error try again.');
        }
    }

    return (
    <div>
        
        <ButtonNavBar onclick={() => setOpenModal(true)}>
            <FontAwesomeIcon icon={faPlus} />
        </ButtonNavBar> 
        
        <PlanModal isOpen={openModal} isClose={() => setOpenModal(false)}> 
            <form  onSubmit={onSubmit}>
                <h3 className='mt-2 justify-center flex text-titleColor'>Workout Plan Title</h3>
                <InputField
                    name="plan"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Workout Plan"
                    error={titleError}
                    errorMessage={titleErrorMsg}
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
export default function AddWorkoutPlan  ()  {
    const session = useSession();
    
    if(session.status !== "authenticated"){
       return (
        <div>
        <h1 className="text-textError flex justify-center p-2 uppercase font-bold">PLEASE SIGN IN TO USE FEATURE!</h1>
        </div>
       )
    }

    return (
        <AddWorkout />
    )
}