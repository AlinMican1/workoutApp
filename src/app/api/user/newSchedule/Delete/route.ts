import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const {scheduleID} = await request.json();
    console.log(scheduleID)
    try{
        const scheduleExist = await db.scheduleCard.findUnique({
          where:{
            id: scheduleID
          }
        })
        if(scheduleExist){
          
          try{
            const deleteSchedule = await db.scheduleCard.delete({
              where:{
                id: scheduleID
              }
            })
            return NextResponse.json(deleteSchedule , {status:201});
          }catch(error){
            return NextResponse.json({scheduleCard: null, message: "Schedule Card does not exist."}, {status: 409})
          }
        }
      }catch(error){
        
        return NextResponse.json({message:"Schedule Card does not exist"} , {status:500})
      }
    
    

}