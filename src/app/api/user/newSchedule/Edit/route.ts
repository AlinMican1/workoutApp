import { db } from "@/lib/db"
import { NextResponse } from "next/server"


export async function PUT(request: Request) {
    const {id,newWeight,newReps,newSets} = await request.json()
    
    if(!id){
        return NextResponse.json({message: "Schedule ID does not exist"} , {status:404})
    }
    if(typeof(id) !== 'string'){
        return NextResponse.json({message: "Schedule ID does is not of type string"} , {status:409})
    }
    

    if(!parseFloat(newWeight) || !parseFloat(newSets) || !parseFloat(newReps)){
        return NextResponse.json({scheduleCard: null , message: "Input is not a number"}, {status:409})
    }

    if(newWeight.length > 4 || newSets.length > 3 || newReps.length > 4){
        return NextResponse.json({scheduleCard: null , message: "Keep the values realistic"}, {status:409})
    }

    try{
        const updateSchedule = await db.scheduleCard.update({
            where:{
                id,
            },
            data:{
                weight: parseFloat(newWeight),
                sets: parseFloat(newSets),
                reps: parseFloat(newReps),
            }
        })
        return NextResponse.json(updateSchedule, {status:201})
    }catch(error){  
        return NextResponse.json({ message: "Error updating schedule" }, { status: 500 });
    }
}