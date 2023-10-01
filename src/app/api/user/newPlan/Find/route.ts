import { db } from "@/lib/db"
import { NextResponse } from "next/server";


export async function GET() {
    const plans = await db.workoutPlan.findMany({
      select: {
        title: true,
        id: true,
      },
    });

    return NextResponse.json(plans , {status:200});
    
  }