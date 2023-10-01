import React from 'react'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddWorkoutPlan from '@/components/molecule/addWorkoutPlan'
import { db } from '@/lib/db'
import { PlanCard } from '@/components/atom/planCard'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/lib/auth';
import Provider from '@/lib/client-provider';



export default async function WorkoutPlanPage() {
  
    const session = await getServerSession(authOptions)
    
    
    let plans;
    const response = await fetch (process.env.URL + '/api/user/newPlan/Find',{
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },})
    if (response.ok) {
      plans = await response.json();
      // You can now use the data received from the API
     
    } else {
      console.error('Failed to fetch data');
    }
    
    return (
        <Provider session={session}>
       
            <div className=' border m-2 rounded-xl border-darkgray'>
                <h1 className='p-3 text-lg font-semibold ' >
                    WORKOUT PLANS <FontAwesomeIcon icon={faDumbbell} className='text-white'/>
                    <AddWorkoutPlan />
                </h1>
                {/* GET CARDS AND PUT THEM IN HERE AWAIT PRISMA CLIENT and verification */}
            </div>
            <div className={`border m-2 rounded-xl border-darkgray flex flex-col`}>
              {plans.length === 0 ? (
                <h1 className='text-textColor font-semibold flex justify-center m-2 '>Add up to five plans</h1>
              ) : (
                plans.map((plan: any) => <PlanCard key={plan.id} title={plan.title} cardId={plan.id}
                 /> )
              )}
            </div>
        
        </Provider>
        
  )
};

