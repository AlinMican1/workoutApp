'use client'
import React from 'react'
interface PbCardProps {
  weight:string,
  exerciseTitle:string,
  date: Date,
  color: string,
}

const PbCard = ({weight,exerciseTitle,date,color}:PbCardProps) => {
  let dateMDY = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  const OpenCard  = () =>{
    console.log("hello")
  }
  return (
    // <button onClick={() => OpenCard()}>
    <button onClick={()=>OpenCard()} className={`h-32 m-2 rounded rounded-lg border border-[#a67e39] ${color}`}>
        <h1 className='flex justify-center  text-center text-textTitle   uppercase font-semibold flex flex-col m-2'>{exerciseTitle}
        <span className='text-textColor m-1 font-light text-[12px] text-center'>{dateMDY}</span>
         </h1>
        <h1 className='justify-center  text-[18px] text-center text-titleColor font-semibold flex flex-col'>{weight} Kg
        
        </h1>
        
    </button>
    // </button>
  )
}

export default PbCard;