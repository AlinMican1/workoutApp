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
    
    const bestRecord = await db.user.findUnique({
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

       if(!bestRecord){
        
        return NextResponse.json({message:"This Page does not exist"} , {status:404});
        }
      return NextResponse.json(bestRecord , {status:200});
      
    }