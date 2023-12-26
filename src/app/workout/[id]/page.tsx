
import React from 'react'
import TopNavBar from '@/components/atom/topNavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell, faTrash } from '@fortawesome/free-solid-svg-icons'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/lib/auth';
import BreakCard from '@/components/atom/breakCard'
import DaySection from '@/components/atom/daySection'
import AddScheduleCard from '@/components/molecule/addScheduleCard'
import Provider from '@/lib/client-provider'
import { ScheduleCard } from '@/components/atom/scheduleCard'
import { DeleteScheduleCard } from '@/components/atom/deleteSchedule'
import { EditScheduleCard } from '@/components/atom/editSchedule'
import DeletePlanBtn, {   PlanCard } from '@/components/molecule/planCard'
import { DeleteButton, DeleteButton2 } from '@/components/atom/button'
import { GetAllPlans } from '../../../../utils/getAllPlans'


// export async function generateStaticParams(id:string) {
//   // const plans = await fetch(process.env.URL + '/api/user/newPlan/Find');
//   // const data = await plans.json();
  
//   // return data.map((record:any) =>{
//   //     id: record.id
//   // })
  
  
// }

async function getPlan(id:string,userEmail:string){
    
  
  const response = await fetch( process.env.NEXTAUTH_URL + `/api/user/newPlan/Find/${id}`,{
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


async function getScheduleCard(WorkoutId: string) {
  const response = await fetch(process.env.URL + `/api/user/newSchedule/Find/${WorkoutId}`, {
    method: 'GET', // Use the GET method
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (response.ok) {
    const scheduleCard = await response.json();
    return scheduleCard;
  } else {
    console.log('Failed to fetch data');
  }
}



export default async function WorkoutPlanSchedule({ params }: { params: { id: string } }){
  
  await GetAllPlans(params.id)
  console.log(GetAllPlans(params.id))
  const session = await getServerSession(authOptions)
  const userEmail = session?.user.email?.toString();
  
  if(!userEmail){
      return null
  }
  const scheduleCard = await getScheduleCard(params.id);
  const planDetail = await getPlan(params.id, userEmail);
  
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
      <Provider session={session}>
      <header>
        <TopNavBar>
          <h1 className='p-3 text-lg font-semibold'>
            {plan.title} <FontAwesomeIcon icon={faDumbbell} className='text-white'/>
            
          </h1>
          <div className='flex justify-between '>
            <div className='flex justify-start gap-2 '>
              <div className='justify-start px-3'>
                <AddScheduleCard id={params.id}/>
              </div>
              </div>
              <div className='flex justify-end gap-4 text-lg mx-2'>
                
                <DeleteButton2>
                  <DeletePlanBtn cardId={params.id} />
                </DeleteButton2>
              </div>
            
          </div>
         
        </TopNavBar>
      </header>
      <main>
      <div className={`border m-2 mt-24 rounded-xl border-darkgray flex flex-col`}>
      {scheduleCard && scheduleCard[0].ScheduleCards.length > 0 ? (
  ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
    <DaySection key={day} day={day}>
      {scheduleCard.map((card:any, index:any) => {
        if (card.ScheduleCards && Array.isArray(card.ScheduleCards)) {
          const matchingCards = card.ScheduleCards.filter((schedule:{ day: string }) => schedule.day.toLowerCase() === day.toLowerCase());
          let color:string;

          // Set color based on the day
          switch (day.toLowerCase()) {
            case 'monday':
              color = 'bg-red-500';
              break;
            case 'tuesday':
              color = 'bg-blue-500';
              break;
            case 'wednesday':
              color = 'bg-[#C147E9]';
              break;
            case 'thursday':
              color = 'bg-[#46C2CB]';
              break;
            case 'friday':
              color = 'bg-[#FB2576]';
              break;
            case 'saturday':
              color = 'bg-[#AF0171]';
              break;
            case 'sunday':
              color = 'bg-[#7A0BC0]';
              break;
            default:
              color = ''; // Default color when day doesn't match
          }

          if (matchingCards.length === 0) {
            return <BreakCard key={`break-${index}`} />;
          }

          return matchingCards.map((matchingCard:any, cardIndex:any) => {
            const date = new Date(matchingCard.createdAt);
            const dateMDY = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

            const updateDate = new Date(matchingCard.updatedAt);
                
              
                 
                  
                  //Check for updated weight to display message. If everything is the same then card hasn't been updated else check for all possible outcomes.
                 let updatedWeight = "";
                 let dateDifference ;
                 let increase = 0;
                 if(matchingCard.weight === matchingCard.firstWeight){
                   updatedWeight = '';
                   increase = 0
                 }
                 
                 else if(matchingCard.weight > matchingCard.firstWeight){
                   updatedWeight = `${matchingCard.weight - matchingCard.firstWeight}`
                   dateDifference = updateDate.getDay() - date.getDay() 
                   increase = 1
     
                 }
                 else if(matchingCard.weight < matchingCard.firstWeight){
                   updatedWeight = `${matchingCard.firstWeight - matchingCard.weight}`
                   increase = 2
                 }
                 else{
                   updatedWeight = ''
                   increase = 0
                 }

            return (
              
              <ScheduleCard key={index + cardIndex} color={color} exerciseTitle={matchingCard.exerciseTitle} date={dateMDY} scheduleId={matchingCard.id}>
                <div className='flex justify-start mt-2 gap-2 '>
                  <span className='border rounded p-[4px] text-textTitle text-normal'>{matchingCard.weight} kg</span>
                  <span className='border rounded p-[4px] text-textTitle text-normal'> {matchingCard.sets} x {matchingCard.reps}</span>
                </div>
                <div className='flex justify-between mt-2'>
                  <div className='flex justify-start gap-4 '>
                    <div className='justify-start'>
                      { increase === 1 ? (
                        <h1 className='font-semibold text-green-500'>{`+${updatedWeight} kg in ${dateDifference} days`}</h1>
                      ) : increase === 2 ? (
                        <h1 className='text-red-900'>{`-${updatedWeight} kg`}</h1>
                      ) : null}
                    </div>
                  </div>
                  <div className='flex justify-end gap-4 text-lg'>
                    <EditScheduleCard scheduleId={matchingCard.id} />
                    <DeleteScheduleCard scheduleId={matchingCard.id} />
                  </div>
                </div>
              </ScheduleCard>
            );
          });
        }
        return null;
      })}
    </DaySection>
  ))
) : (
  <div>
    <p className='text-textColor font-semibold flex justify-center m-2 '>Add your exercises</p>
  </div>
)}
  
</div>
    
      </main>
      </Provider>
    </div>
  )
}

