import React from 'react'

interface PlanCardProps {
    title?: string
}
export const PlanCard = ({title}:PlanCardProps) => {
  return (
    <div className='bg-boxDarkPink h-24 m-2 rounded rounded-lg border border-specialPink'>
        {title}
    </div>
  )
}

