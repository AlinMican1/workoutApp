import React from 'react'
import { db } from '@/lib/db'
import { ButtonNavBar } from '../atom/button'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const AddWorkoutPlan = () => {
  return (
    <div>
        <ButtonNavBar>
            <FontAwesomeIcon icon={faPlus} />
        </ButtonNavBar>
    </div>
  )
}

