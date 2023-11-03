import { db } from "@/lib/db"
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {cardId} = await request.json();
  
  try{
      const planExist = await db.workoutPlan.findUnique({
        where:{
          id: cardId
        }
      })
      if(planExist){
        
        try{
          const deletePlan = await db.workoutPlan.delete({
            where:{
              id:cardId
            }
          })
          return NextResponse.json(deletePlan , {status:201});
        }catch(error){
          return NextResponse.json({workoutPlan: null, message: "Plan does not exist."}, {status: 409})
        }
      }
    }catch(error){
      
      return NextResponse.json({message:"Plan does not exist"} , {status:500})
    }
    //Added this to fix vercel error
    return NextResponse.json({message:"Plan does not exist"} , {status:500})

}