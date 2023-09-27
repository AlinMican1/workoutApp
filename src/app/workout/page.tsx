import React from 'react'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddWorkoutPlan from '@/components/molecule/addWorkoutPlan'


import { getServerSession } from "next-auth/next"
import { authOptions } from '@/lib/auth';
import Provider from '@/lib/client-provider';

export default async function WorkoutPlanPage() {
    
    const session = await getServerSession(authOptions)
    return (
        <Provider session={session}>
        <div className=''>
            <div className= "">
                <h1 className='p-3 text-lg font-semibold ' >
                    WORKOUT PLANS <FontAwesomeIcon icon={faDumbbell} className='text-white'/>
                    <AddWorkoutPlan />
                </h1>
                {/* GET CARDS AND PUT THEM IN HERE AWAIT PRISMA CLIENT and verification */}
            </div>
        
        </div>
        </Provider>
        
  )
}


