import { db } from '@/lib/db';
import { NextResponse, NextRequest } from "next/server";
import {hash} from "bcrypt";
import * as z from 'zod';
//Define schema for input validation.

const userInputValidation = z.object({
    email: z.string().min(1,'Email is required').email('Invalid email'),
    username: z.string().min(1, 'Username is required').max(100),
    password: z.string()
    .min(1, 'Password is required')
    .min(8, 'Password must have more than 8 characters'),
});

export async function POST(req: Request){
    
    try{
        const body = await req.json();
        const {email, username, password} = userInputValidation.parse(body);
      
     

        //Check if email exists.
        const emailExist = await db.user.findUnique({
           where: {email: email}
        });
        if(emailExist){
            return NextResponse.json({user: null, message: "Email already exists"}, {status: 409})
        }
        
        //Check if username exists.
        const usernameExist = await db.user.findUnique({
            where: {username: username}
         });
        if(usernameExist){
            return NextResponse.json({user: null, message: "Username already exists"}, {status: 409})
        }

        //Hash the password to make it secure.
        const hashPassword = await hash(password, 10);
        
        //Create the new user.
        const newUser = await db.user.create({
            data:{
                email,
                username,
                password: hashPassword,
            }
        });
        console.log(newUser);
        //Don't store the password hash. so return the rest.
        const {password: newUserPassword, ...rest } = newUser;
        
        return NextResponse.json({user: rest, message:"User created successfully"}, {status:201});
    }catch(error: any){
        
        return NextResponse.json({message:"Something went wrong!"}, {status:500});
    }
    
}