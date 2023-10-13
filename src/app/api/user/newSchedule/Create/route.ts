import { db } from "@/lib/db";
import { NextResponse } from "next/server";




export const POST = async (req: Request) =>{
    
    const {day, exerciseTitle,weight,sets,reps,email,id} = await req.json();

    if(day ==='' || exerciseTitle === '' || weight === '' || sets === '' || reps === ''){
        return NextResponse.json({scheduleCard: null , message: "Empty input field"}, {status:409})
    }

    if(!parseFloat(weight) || !parseFloat(sets) || !parseFloat(reps)){
        return NextResponse.json({scheduleCard: null , message: "Input not a number"}, {status:409})
    }
    if(!id){
        return NextResponse.json({scheduleCard: null , message: "ID not found"}, {status:409})
    }

    const userExist = await db.user.findUnique({
        where: {email: email}
      });
      if(!userExist){
         return NextResponse.json({personalBest: null, message: "User does not exist"}, {status: 404})
      }
      //This creates a new card where user can input their reps sets weight and exerciseTitle.
      try{
        const newScheduleCard = await db.scheduleCard.create({
            data: {
                exerciseTitle,
                day,
                weight: parseFloat(weight),
                sets: parseFloat(sets),
                reps: parseFloat(reps),
                Schedule: { connect: { id: id } },
                
            }
        });

        // const newScheduleCardWeight = await db.scheduleCardWeight.create({
        //     data: {
               
        //         ScheduleRecords: { connect: { id: newScheduleCard.id } }, // Use the ID of the newScheduleCard
        //     }
        // });
        return NextResponse.json(
            {  scheduleCard: newScheduleCard,
                message: 'Record created successfully' },
            { status: 201 }
          );

      }catch(error){
        
        return NextResponse.json(
            { scheduleCard: null, message: 'An error occurred' },
            { status: 500 }
            );
      } 

    
}