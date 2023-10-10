import { db } from "@/lib/db"
import { NextResponse } from "next/server";
import { authOptions } from '@/lib/auth';
import { getServerSession } from "next-auth/next"

export async function POST(request: Request) {
  const {userEmail} = await request.json()
  
  if(!userEmail){
    return NextResponse.json({message:"Error email does not exist"} , {status:409});
  }
  
  const plans = await db.user.findUnique({
      where:{
        email: userEmail,
      },
      select:{
        WorkoutPlans: {
          select: {
            title: true,
            id: true,
          },
        },
      }
      
    });
   
    return NextResponse.json(plans , {status:200});
    
  }