import React from "react"
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth";
import  {SignOutBtn} from "@/components/atom/authButtons";
import { DateTime } from "@/components/atom/dateTime";
export default async function Home() {
  const session = await getServerSession(authOptions)
  
  return (
    <div className="flex justify-center ">  
      <DateTime />{ }&nbsp;{session?.user.username}
      {session?.user ? (<div>
       
      </div>) : ""}
    </div>
  )
  
}
