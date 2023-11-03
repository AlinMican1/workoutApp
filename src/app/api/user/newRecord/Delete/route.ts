import { db } from "@/lib/db"
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {cardId} = await request.json();
  
  try{
      const recordExist = await db.personalBest.findUnique({
        where:{
          id: cardId
        }
      })
      if(recordExist){
        
        try{
          const deleteBest = await db.personalBest.delete({
            where:{
              id:cardId
            }
          })
          return NextResponse.json(deleteBest , {status:201});
        }catch(error){
          return NextResponse.json({personalBest: null, message: "Personal best record does not exist."}, {status: 409})
        }
      }
    }catch(error){
      console.log(error)
      return NextResponse.json({message:"Personal best record does not exist"} , {status:500})
    }
    return NextResponse.json({message:"Plan does not exist"} , {status:500})

}