import React from "react"
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth";
import  {SignOutBtn} from "@/components/atom/authButtons";
import { DateTime } from "@/components/atom/dateTime";

export default async function Home() {
  const session = await getServerSession(authOptions)
  
  return (
    <div className="border m-2 rounded-xl border-darkgray">  
      <h1 className="text-lg font-bold px-3 pt-3 ">
        
        <DateTime />{session?.user.username}

      </h1>
      <hr className=" my-2 mx-3"></hr>
      
      {session?.user ? (<div>
       
      </div>) : ""}
      
    </div>
  )
  
}
