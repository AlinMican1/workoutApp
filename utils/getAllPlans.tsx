import { db } from "@/lib/db";

export async function GetAllPlans(id:string){
    console.log(id)
    const getSchedule = await db.workoutPlan.findMany({
        where: {
          id: id,
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
              firstWeight: true,
              firstRep: true,
              firstSet: true,
              createdAt:true,
              updatedAt: true,
              //ScheduleCardWeights: true,
            },
          },
        },
      });
    return getSchedule
}