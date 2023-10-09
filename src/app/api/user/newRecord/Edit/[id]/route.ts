import React from 'react'

import { db } from "@/lib/db";
import { NextResponse } from "next/server";



export const PUT = async (request: Request,{params}: {params: {id: string}}) =>{
    
    const id = params.id
    const {newWeight} = await request.json();
    
    console.log(newWeight);
    
    if(newWeight === '' || !parseFloat(newWeight) || newWeight.length > 4){
      
      return NextResponse.json(
        { personalBest: null, message: 'Valid new weight is missing!' },
        { status: 400 }
    );
    }
    
      try{
        const UpdateRecord = await db.personalBest.update({
           where: {
            id,
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