import React from 'react'

import { db } from "@/lib/db";
import { NextResponse } from "next/server";



export const POST = async (req: Request) =>{
    
    const {newWeight,cardId} = await req.json();
    
    
    if(newWeight === '' || !parseFloat(newWeight) || newWeight.length > 4){
      return NextResponse.json(
        { personalBest: null, message: 'Valid new weight is missing!' },
        { status: 400 }
    );
    }
    // const userExist = await db.user.findUnique({
    //   where: {email: email}
    // });
    // if(!userExist){
    //    return NextResponse.json({personalBest: null, message: "User does not exist"}, {status: 404})
    // }
    
      try{
        const UpdateRecord = await db.personalBest.update({
           where: {
                id: cardId,
           },
           data: {
            weight: parseFloat(newWeight),
           
           },
        });
        
        return NextResponse.json(
            { personalBest:  UpdateRecord , message: 'Record updated successfully' },
            { status: 201 }
          );

      }catch(error){
        
        return NextResponse.json(
            { personalBest: null, message: 'An error occurred' },
            { status: 500 }
            );
      }
}