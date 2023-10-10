'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { DeleteButton } from '../atom/button'
interface PlanCardProps {
    title: string
    cardId: string
    
}
export const PlanCard = ({title,cardId}:PlanCardProps) => {
  const router = useRouter();
  
  const OpenPlan  = (cardId:string) =>{
    router.push(`/workout/${cardId}`)
  }

  return (
    <button onClick={() => OpenPlan(cardId)}>
    <div className='bg-boxDarkPink h-24 m-2 rounded rounded-lg border border-specialPink '>
      <h1 className='flex justify-center text-titleColor m-6'>
        {title}
      </h1>
    
    {/* <div>
      <DeleteButton>
        <DeletePlanBtn cardId={cardId} />
      </DeleteButton>
    </div> */}
    </div>
   </button>
  
  
    
  )
}

interface DeleteBtnProps {
  cardId: string; // Update the type accordingly
}

const DeletePlanBtn: React.FC<DeleteBtnProps> = ({ cardId }) => {
  const router = useRouter();
  const handleClick = async () => {
    
    try{
      
      const response = await fetch ('api/user/newPlan/Delete',{
        method: 'POST',
       
        body: JSON.stringify({
          cardId
          
        }),
        headers:{
          'Content-type': 'application/json'
        },
        
      })
      if(response.ok){
        router.refresh()
      }
    }catch(error){
      
    }
  };

  return (
    <button className={`bg-[#f3405f] text-[16px] m-2 font-bold p-1 rounded-lg  text-titleColor`} onClick={handleClick}>DELETE</button>
  );
}

export default DeletePlanBtn;
