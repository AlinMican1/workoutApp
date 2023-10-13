import { db } from "@/lib/db";
import { NextResponse } from "next/server";



export const POST = async (req: Request) =>{
    
    const {exerciseTitle,weight,email,color} = await req.json();
    
    
    if(exerciseTitle === '' || weight === '' || !parseFloat(weight) || exerciseTitle.length > 25 || weight.length > 4){
      return NextResponse.json(
        { personalBest: null, message: 'Valid exercise title or weight is missing!' },
        { status: 400 }
    );
    }


    const userExist = await db.user.findUnique({
      where: {email: email}
    });
    if(!userExist){
       return NextResponse.json({personalBest: null, message: "User does not exist"}, {status: 404})
    }
    
      try{
        const newRecord = await db.personalBest.create({
            data: {
                exerciseTitle,
                weight: parseFloat(weight),
                color,
                record: { connect : {email: email} },
                
            }
        });
        console.log(userExist);
        return NextResponse.json(
            { personalBest: newRecord, message: 'Record created successfully' },
            { status: 201 }
          );

      }catch(error){
        
        return NextResponse.json(
            { personalBest: null, message: 'An error occurred' },
            { status: 500 }
            );
      }
}