import React from 'react'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import TopNavBar from '@/components/atom/topNavBar';
import { DeletePB } from '@/components/atom/deletePB';
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/lib/auth';

import { EditPB } from '@/components/atom/editPB';
import { GetAllRecords } from '../../../../utils/getAllRecords';


// export async function generateStaticParams() {
//     const bestRecords = await fetch(process.env.URL + '/api/user/newRecord/Find');
//     const data = await bestRecords.json();
    
//     return data.map((record:any) =>{
//         id: record.id
//     })
    
    
//   }

//Get only the Record with that id
async function getBestRecord(id:string,userEmail:string){
    
    const response = await fetch(process.env.URL + `/api/user/newRecord/Find/${id}`,{
        method: 'POST',
        body: JSON.stringify({
            userEmail,
            }),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },})
        if(response.ok){
            const record = await response.json();
            
            return record
        }
        else{
            console.error('Failed to fetch data');
        }

}
   
export default async function BestRecordPage({ params }: { params: { id: string } }) {
    
    const session = await getServerSession(authOptions)
    const userEmail = session?.user.email?.toString();
    
    if(!userEmail){
        return null
    }
    const recordDetail = await getBestRecord(params.id, userEmail)
    await GetAllRecords(params.id, userEmail)
    let personalBest;
    if (!recordDetail){
        return (
            <div className='justify-center flex items-center flex-col h-full text-textError mt-20'>
                <h1 className='text-textError font-semibold text-center'>THIS CARD DOES NOT EXIST! </h1>
                <span>How did you even get here?</span>
            </div>
            
        )
    }
    else{
        personalBest = recordDetail.PersonalBests[0];
    }
   
    
    let date = new Date(personalBest.updatedAt);
    let dateMDY = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
   
    
    
    
    return (
        <div>
        
        <TopNavBar >
            
            <h1 className='p-3 text-lg font-semibold'>
                Record Details <FontAwesomeIcon icon={faStar} />
                
            </h1>
            
            <div className='justify-center  flex flex-cols gap-24'>
                

            </div>
           
        </TopNavBar>
      
        {personalBest ? (
          <div className={`border m-2 mt-24 rounded-xl border-darkgray flex flex-col ${personalBest.color} `}>
            
                <h1 className='justify-center flex text-base font-semibold p-2 text-lg uppercase text-textTitle'>{personalBest.exerciseTitle}</h1>
                <hr className='mx-2'></hr>
                 <div className='flex justify-center mx-2 mt-4'>
                    <h1 className='text-textTitle  text-[20px] mx-2 border rounded-lg px-2 pb-[4px]'>{personalBest.weight} Kg</h1>
                    
                </div>
                <h1 className='text-textColor text-[14px] flex justify-center m-2 '>Achieved on: {dateMDY}</h1>
                <div className='flex justify-end flex-cols mx-2 gap-2'>
                    <EditPB cardId={personalBest.id} />  
                    <DeletePB cardId={personalBest.id} />
                </div>
                <div className='flex justify-center border m-2 rounded-lg h-80'>
                    GRAPH
                </div>
               
               

          </div>
        ) : (
            <div className={`border m-2 mt-24 rounded-xl border-darkgray flex flex-col `}>
                <h1 className="text-textError flex justify-center p-2 uppercase font-bold">This record does not exist!</h1>
            </div>
        )}
          
          
        </div>
       
      
  )
}

