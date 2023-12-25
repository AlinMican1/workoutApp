import React from 'react'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddWorkoutPlan from '@/components/molecule/addWorkoutPlan'

import { PlanCard } from '@/components/molecule/planCard'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/lib/auth';
import Provider from '@/lib/client-provider';
import TopNavBar from '@/components/atom/topNavBar'



export default async function WorkoutPlanPage() {

    const session = await getServerSession(authOptions)
    
    if(!session?.user){
      return null;
    }

    let plans;
    const response = await fetch (process.env.NEXTAUTH_URL + '/api/user/newPlan/Find',{
      method: 'POST',
      body: JSON.stringify({
        userEmail: session?.user.email as String,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },})
    if (response.ok) {
      plans = await response.json();
    
     
    } else {
      console.error('Failed to fetch data');
    }
    
    
    
    
    return (
        <Provider session={session}>
            <TopNavBar>
                <h1 className='p-3 text-lg font-semibold ' >
                    WORKOUT PLANS <FontAwesomeIcon icon={faDumbbell} className='text-white'/>
                    <AddWorkoutPlan />
                </h1>
            </TopNavBar>
           
            <div className={`border m-2 mt-24 rounded-xl border-darkgray flex flex-col`}>
              {plans && plans.WorkoutPlans.length === 0 ? (
                <h1 className='text-textColor font-semibold flex justify-center m-2 '>Add up to five plans</h1>
              ) : (
                plans && plans.WorkoutPlans.map((plan: any) => (
                  <PlanCard key={plan.id} title={plan.title} cardId={plan.id} />
                ))
              )}
            </div>
        
        </Provider>
        
  )
};

