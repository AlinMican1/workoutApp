import { db } from "@/lib/db"
import { NextResponse } from "next/server"


export async function POST(request: Request, {params}: {params: {id: string}}){
    const id = params.id
    const {userEmail} = await request.json();
    
    if(!userEmail){
        return NextResponse.json({message:"Error email does not exist"} , {status:409});
      }
    if(!id){
        return NextResponse.json({message:"Id Not found"} , {status:409});
    }
    const record = await db.user.findUnique({
        where:{
            email: userEmail,
        },
        select:{
            PersonalBests:{
                where:{
                    id
                }
            }
        }
    })
    
    if(!record || !record.PersonalBests || record.PersonalBests.length === 0){
        
        return NextResponse.json({message:"This Page does not exist"} , {status:404});
    }
    return NextResponse.json(record, {status:201})
}

