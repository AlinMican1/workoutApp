import React from "react"
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth";
import  {SignOutBtn} from "@/components/atom/authButtons";
import { DateTime } from "@/components/atom/dateTime";

export default async function Home() {
  const session = await getServerSession(authOptions)
  
  return (
    <div >  
      <h1 className="text-lg font-bold p-3">
        
        <DateTime />{session?.user.username}
       
      </h1>
      
      {session?.user ? (<div>
       
      </div>) : ""}
      
    </div>
  )
  
}
