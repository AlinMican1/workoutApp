'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
interface PbCardProps {
  weight:string,
  exerciseTitle:string,
  date: Date,
  color: string,
  id: string,
}

const PbCard = ({weight,exerciseTitle,date,color, id}:PbCardProps) => {
  const parsedDate = new Date(date);
  let dateMDY = `${parsedDate.getDate()}.${parsedDate.getMonth() + 1}.${parsedDate.getFullYear()}`;
  const router = useRouter();
  const OpenCard  = (id:string) =>{
    router.push(`/personalBest/${id}`)
  }
  return (
    
    <button onClick={()=>OpenCard(id)} className={`h-32 m-2 rounded rounded-lg border border-[#a67e39] ${color}`}>
        <h1 className='flex justify-center  text-center text-textTitle uppercase font-semibold flex flex-col m-2'>{exerciseTitle}
        <span className='text-textColor m-1 font-light text-[12px] text-center'>{dateMDY}</span>
         </h1>
        <h1 className='justify-center  text-[18px] text-center text-titleColor font-semibold flex flex-col'>{weight} Kg
        
        </h1>
        
    </button>
    // </button>
  )
}

export default PbCard;