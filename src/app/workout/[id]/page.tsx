import React from 'react'
import TopNavBar from '@/components/atom/topNavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/lib/auth';
import BreakCard from '@/components/atom/breakCard'
export async function generateStaticParams() {
  const plans = await fetch(process.env.URL + '/api/user/newPlan/Find');
  const data = await plans.json();
  
  return data.map((record:any) =>{
      id: record.id
  })
}

async function getPlan(id:string,userEmail:string){
    
  
  const response = await fetch(process.env.URL + `/api/user/newPlan/Find/${id}`,{
      method: 'POST',
      body: JSON.stringify({
          userEmail,
          }),
          headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
          },})
      if(response.ok){
          const plan = await response.json();
          
          return plan
      }
      else{
          console.error('Failed to fetch data');
      }

}
 

export default async function WorkoutPlanSchedule({ params }: { params: { id: string } }){
  const session = await getServerSession(authOptions)
  const userEmail = session?.user.email?.toString();
  
  if(!userEmail){
      return null
  }
  const planDetail = await getPlan(params.id, userEmail)

  let plan;
  if (!planDetail){
    return (
        <div className='justify-center flex items-center flex-col h-full text-textError mt-20'>
            <h1 className='text-textError font-semibold text-center'>THIS CARD DOES NOT EXIST! </h1>
            <span>How did you even get here?</span>
        </div>
        
    )
  }
  else{
    plan = planDetail.WorkoutPlans[0];
  }
    return (
    
    <div>
      <header>
        <TopNavBar>
          <h1 className='p-3 text-lg font-semibold'>
            {plan.title} <FontAwesomeIcon icon={faDumbbell} className='text-white'/>
          </h1>
        </TopNavBar>
      </header>
      <main>
        <div className={`border m-2 mt-24 rounded-xl border-darkgray flex flex-col`}>
          <section>
            <div className='flex justify-center font-bold uppercase m-2'> Monday</div>
            <hr className='m-2'></hr>
            <BreakCard/>
          </section>

          <section>
            <div className='flex justify-center font-bold uppercase m-2'> Tuesday</div>
            <hr className='m-2'></hr>
            <BreakCard/>
          </section>

          <section>
            <div className='flex justify-center font-bold uppercase m-2'> Wednesday</div>
            <hr className='m-2'></hr>
            <BreakCard/>
          </section>

          <section>
            <div className='flex justify-center font-bold uppercase m-2'> Thursday</div>
            <hr className='m-2'></hr>
            <BreakCard/>
          </section>

          <section>
            <div className='flex justify-center font-bold uppercase m-2'> Friday</div>
            <hr className='m-2'></hr>
            <BreakCard/>
          </section>

          <section>
            <div className='flex justify-center font-bold uppercase m-2'> Saturday</div>
            <hr className='m-2'></hr>
            <BreakCard/>
          </section>

          <section>
            <div className='flex justify-center font-bold uppercase m-2'> Sunday</div>
            <hr className='m-2'></hr>
            <BreakCard/>
          </section>
        </div>
      </main>
    </div>
  )
}

