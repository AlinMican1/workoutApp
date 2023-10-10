import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(){
    
    const record = await db.personalBest.findMany({
        
    })
    return NextResponse.json(record, {status:201})
}

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
          PersonalBests: {
            select:{
                exerciseTitle: true,
                weight: true,
                createdAt:true,
                updatedAt:true,
                color:true,
                id: true,
            }
          },
        }
        
      });
     
      return NextResponse.json(plans , {status:200});
      
    }