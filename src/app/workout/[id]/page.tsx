import React from 'react'
import TopNavBar from '@/components/atom/topNavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'

export const  WorkoutPlanSchedule = async() => {

     

    return (
    
    <div>
      <header>
        <TopNavBar>
          <h1 className='p-3 text-lg font-semibold'>
            WORKOUT PLANS <FontAwesomeIcon icon={faDumbbell} className='text-white'/>
          </h1>
        </TopNavBar>
      </header>
      <main>
        {/* Your main content goes here */}
      </main>
    </div>
  )
}

