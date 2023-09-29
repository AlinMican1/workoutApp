'use client'
import React, { useEffect, useState } from 'react';
import { getServerSession } from 'next-auth/next';
import { FetchWorkoutPlans } from '@/app/api/user/newPlan/Find/route';
import { authOptions } from '@/lib/auth';
import { PlanCard } from '../atom/planCard';
import { fetchData } from 'next-auth/client/_utils';

export default function GetTitle() {
    const [plans, setPlans] = useState<{ title: string }[]>([]);
   
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const fetchedPlans = await FetchWorkoutPlans();
          console.log(fetchedPlans);
          setPlans(fetchedPlans);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, []);
   
return(
    <div className='border m-2 rounded-xl border-darkgray flex flex-col'>
    {plans.map((plan, index) => (
      <PlanCard key={index} title={plan.title} />
    ))}
  </div>
)
    

}