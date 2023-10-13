import { db } from "@/lib/db"
import { NextResponse } from "next/server";

// export async function POST(request: Request, {params}: {params: {id: string}}){
//     //CHANGED THIS TO GET METHOD INSTEAD OF POST
    
//     if(!params.id){
//       return NextResponse.json({message:"Error workoutPlanId does not exist"} , {status:409});
//     }

//     const getSchedule = await db.workoutPlan.findMany({
//         where:{
//             id: params.id,
//         },
//         select:{
//             ScheduleCards:{
//                 select:{
//                     day: true,
//                     exerciseTitle: true,
//                     color: true,
//                 }
//             }
//         }
//     })
    
//     if(!getSchedule){
        
//         return NextResponse.json({message:"Schedule doesn't exist"} , {status:404});
//         }
//     return NextResponse.json(getSchedule , {status:201});
// }

export async function GET(request: Request, { params }: { params: { id: string } }) {
    if (!params.id) {
      return NextResponse.json({ message: "Error workoutPlanId does not exist" }, { status: 409 });
    }
  
    const getSchedule = await db.workoutPlan.findMany({
      where: {
        id: params.id,
      },
      select: {
        ScheduleCards: {
          select: {
            id: true,
            day: true,
            exerciseTitle: true,
            weight: true,
            sets: true,
            reps: true,

            //ScheduleCardWeights: true,
          },
        },
      },
    });
  
    if (!getSchedule) {
      return NextResponse.json({ message: "Schedule doesn't exist" }, { status: 404 });
    }
    return NextResponse.json(getSchedule, { status: 201 });
  }
  