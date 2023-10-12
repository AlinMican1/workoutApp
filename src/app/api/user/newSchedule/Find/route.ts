import { db } from "@/lib/db"
import { NextResponse } from "next/server";

export async function POST(request: Request){
    const {workoutPlanID} = await request.json()
    
    if(workoutPlanID){
      return NextResponse.json({message:"Error workoutPlanId does not exist"} , {status:409});
    }
    console.log(workoutPlanID);
    const getSchedule = await db.workoutPlan.findMany({
        where:{
            id: 'ca3e4217-5795-4a5a-acbb-58d2c0a13bde'
        },
        select:{
            ScheduleCards:{
                select:{
                    day: true,
                    exerciseTitle: true,
                    color: true,
                }
            }
        }
        
    })
    if(!getSchedule){
        
        return NextResponse.json({message:"Schedule doesn't exist"} , {status:404});
        }
    return NextResponse.json(getSchedule , {status:201});
}