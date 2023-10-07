import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(){
    
    const record = await db.personalBest.findMany({
        
    })
    return NextResponse.json(record, {status:201})
}