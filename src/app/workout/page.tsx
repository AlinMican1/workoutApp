import React from 'react'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AddWorkoutPlan } from '@/components/molecule/addWorkoutPlan'
export default async function WorkoutPlanPage() {
    //const session = await getServerSession(authOptions)

    return (
        <div className=''>
            <div className= "">
                <h1 className='p-3 text-lg font-semibold ' >
                    WORKOUT PLANS <FontAwesomeIcon icon={faDumbbell} className='text-white'/>
                    <AddWorkoutPlan />
                </h1>
                {/* GET CARDS AND PUT THEM IN HERE AWAIT PRISMA CLIENT and verification */}
            </div>
        
        </div>
        
  )
}


