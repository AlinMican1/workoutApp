import { db } from "@/lib/db";

import { NextResponse } from "next/server";



export const POST = async (req: Request) =>{
    
    
    const {title,email} = await req.json();
    if(title === ''){
      return NextResponse.json(
        { workoutPlan: null, message: 'Insert a Plan Name' },
        { status: 409 }
    );
    }
    
    const Plans = await db.workoutPlan.count();
    if(Plans >= 6){
      return NextResponse.json(
        { workoutPlan: null, message: 'Only five plans allowed' },
        { status: 409 }
    );
    }

    
   
    
    try {
        // Check if a workout plan with the same title already exists for the user
        const newPlanExists = await db.user.findFirst({
          where: {
            email: email, // Replace with the actual email you're searching for
            WorkoutPlans: {
              some: {
                title: title, // Check if a workout plan with the same title exists for this user
              },
            },
          },
        });
        
       

        if (newPlanExists) {
        return NextResponse.json(
            { workoutPlan: null, message: 'This Plan already exists' },
            { status: 409 }
        );
        }
    
        
    
        // Create a new workout plan with only the title connected to the user
        const newPlan = await db.workoutPlan.create({
        data: {
            title: title,
            plan: { connect: { email: email } }, 
        },
        });
    
        // Return a success response
        return NextResponse.json(
        { workoutPlan: newPlan, message: 'Plan created successfully' },
        { status: 201 }
        );
    } catch (error) {
        console.error(error);
    
        // Handle the error and return an error response
        return NextResponse.json(
        { workoutPlan: null, message: 'An error occurred' },
        { status: 500 }
        );
    }
    }