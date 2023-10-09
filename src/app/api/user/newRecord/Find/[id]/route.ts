import { db } from "@/lib/db"
import { NextResponse } from "next/server"


export async function GET(request: Request, {params}: {params: {id: string}}){
    const id = params.id
    
    const record = await db.personalBest.findUnique({
        where:{
            id
        }
    })
    return NextResponse.json(record, {status:201})
}

