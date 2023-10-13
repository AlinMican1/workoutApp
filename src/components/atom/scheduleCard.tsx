import React from 'react'


interface ScheduleCardProp {
    color: string,
    exerciseTitle: string,
    children?: React.ReactNode,
    weight: number,
}
export const ScheduleCard = ({color,exerciseTitle ,children, weight}: ScheduleCardProp) => {
  return (
    <main className={`rounded rounded-lg m-2 p-2 ${color}`}>
        <h1 className='text-textTitle capitalize text-lg font-semibold'>{exerciseTitle} {weight} kg</h1>
        <span >{children}</span>
    </main>
  )
}
