import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare} from '@fortawesome/free-solid-svg-icons'

interface ScheduleCardProp {
    color: string,
    exerciseTitle: string,
    children?: React.ReactNode,
    date: string
    scheduleId: string
}
export const ScheduleCard = ({color,exerciseTitle ,children, date, scheduleId}: ScheduleCardProp) => {
  
  return (
    <main className={`rounded rounded-lg m-2 p-2  ${color}`}>
        <h1 className='text-textTitle capitalize text-lg font-semibold'>{exerciseTitle} <span className='text-textColor text-[14px]'> {date}</span>  </h1>
        {children}
        {/* <div className='flex justify-start mt-2 gap-2 '>
          <span className='border rounded p-[4px] text-textTitle text-normal'>{weight} kg</span>
          <span className='border rounded p-[4px] text-textTitle text-normal' > {children} </span>
          </div> */}
        {/* <div className='flex justify-end gap-4 text-lg '>
        <FontAwesomeIcon icon={faPenToSquare} /> 
        <FontAwesomeIcon icon={faTrash} />
       
        </div> */}
    </main>
  )
}
