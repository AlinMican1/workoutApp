import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PbCard from "@/components/atom/pbCard"
import AddPersonalBest from "@/components/molecule/addPersonalBest"
import Provider from '@/lib/client-provider';
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/lib/auth';
import { db } from "@/lib/db";
import TopNavBar from "@/components/atom/topNavBar";

export default async function PersonalBestPage() {
    
    const session = await getServerSession(authOptions)
    
    let records;
    const response = await fetch (process.env.URL + '/api/user/newRecord/Find',{
        method: 'POST',
        body: JSON.stringify({
        userEmail: session?.user.email as String,
        }),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },})
        if(response.ok){
            records = await response.json()
        }else {
        console.error('Failed to fetch data');
      }

    console.log(records);
    return(
        <Provider session={session}>
            <TopNavBar>
                <h1 className='p-3 text-lg font-semibold ' >
                    PERSONAL BEST <FontAwesomeIcon icon={faStar} className='text-white'/>
                    <AddPersonalBest />
                </h1>
            </TopNavBar>
            
            <div className="border m-2 mt-24 rounded-xl border-darkgray">
            {records.length === 0 ? (
                <h1 className='text-textColor font-semibold flex justify-center m-2  '>Add your personal best</h1>
              ) : (
                <div className={`grid grid-cols-2 gap-0`}>
                     
                {records.PersonalBests.map((record: any) => (

                    <PbCard
                        key={record.id}
                        exerciseTitle={record.exerciseTitle}
                        weight={record.weight}
                        date={record.updatedAt}
                        color={record.color} 
                        id={record.id}
                    />
                   
                ))}
            </div>
            
              )}
            </div>
               
            
        </Provider>
    )
}