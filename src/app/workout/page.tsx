import React from 'react'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddWorkoutPlan from '@/components/molecule/addWorkoutPlan'
import { db } from '@/lib/db'
import { PlanCard } from '@/components/atom/planCard'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/lib/auth';
import Provider from '@/lib/client-provider';
import GetTitle from '@/components/molecule/getTitle'

async function getPlanTitle() {
    
    try {
        const plans = await db.workoutPlan.findMany({
          select: {
            title: true,
          },
        });
        return JSON.stringify(plans);
      } catch (error) {
        
        return error
      }
    };
  
export default async function WorkoutPlanPage() {
    
    const session = await getServerSession(authOptions)
    
    // try {
    //     const plans = await db.workoutPlan.findMany({
    //       select: {
    //         title: true,
    //       },
    //     });
    //     return plans
    // } catch (error) {
        
        
    // }
    
    
    return (
        <Provider session={session}>
       
            <div className=' border m-2 rounded-xl border-darkgray'>
                <h1 className='p-3 text-lg font-semibold ' >
                    WORKOUT PLANS <FontAwesomeIcon icon={faDumbbell} className='text-white'/>
                    <AddWorkoutPlan />
                </h1>
                {/* GET CARDS AND PUT THEM IN HERE AWAIT PRISMA CLIENT and verification */}
            </div>
            <div className='border m-2 rounded-xl border-darkgray flex flex-col' >
                
               <GetTitle />
          {/* {plans.map((plan:any, index:any) => (
            <PlanCard key={index} title={plan.title} />
          ))} */}
        </div>
        
        </Provider>
        
  )
};

