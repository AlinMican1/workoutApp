import React from "react"
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth";
import  {SignOutBtn} from "@/components/atom/authButtons";

export default async function Home() {
  const session = await getServerSession(authOptions)
  
  return (
    <div className="flex justify-center ">  
      Hello {session?.user.username}
      {session?.user ? (<div>
       <SignOutBtn />
      </div>) : ""}
    </div>
  )
  
}
