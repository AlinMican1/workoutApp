import React from 'react'
import { faStar, faClipboard} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/lib/auth';
import { useRouter } from 'next/navigation';

import TopNavBar from '@/components/atom/topNavBar';
import { DeletePB } from '@/components/atom/deletePB';
import Provider from '@/lib/client-provider'

//Get all personal Best 
export async function generateStaticParams() {
    const bestRecords = await fetch(process.env.URL + '/api/user/newRecord/Find');
    const data = await bestRecords.json();
    
    return data.map((record:any) =>{
        id: record.id
    })
  }

//Get only the Record with that id
async function getBestRecord(id:string){
    const response = await fetch(process.env.URL + `/api/user/newRecord/Find/${id}`)
    const data = await response.json();
    return data
}
   
export default async function BestRecordPage({ params }: { params: { id: string } }) {
    const recordDetail = await getBestRecord(params.id)
   
    // const session = await getServerSession(authOptions)
    let date = new Date(recordDetail.updatedAt);
    let dateMDY = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
   
    
  
    
    return (
        <div>
        
        <TopNavBar >
            
            <h1 className='p-3 text-lg font-semibold'>
                Record Details <FontAwesomeIcon icon={faStar} />
                
            </h1>
            
            <div className='justify-center  flex flex-cols gap-24'>
                <FontAwesomeIcon className='text-[14px] mt-[5px] text-blue-600' icon={faClipboard} />
                <DeletePB cardId={recordDetail.id} />

            </div>
           
        </TopNavBar>
      
        {recordDetail ? (
          <div className={`border m-2 mt-24 rounded-xl border-darkgray flex flex-col ${recordDetail.color} `}>
            
                <h1 className='justify-center flex text-base font-semibold p-2 uppercase text-textTitle'>{recordDetail.exerciseTitle}</h1>
                <hr className='m-2'></hr>
                 <div className='flex justify-center m-2'>
                    <h1 className='text-textTitle  text-[20px] border rounded-lg px-2 pb-[4px]'>{recordDetail.weight} Kg</h1>
                </div>
                <h1 className='text-textColor text-[14px] flex justify-center m-2 '>Achieved on: {dateMDY}</h1>
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

