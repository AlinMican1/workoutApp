import { db } from "@/lib/db"
import { NextResponse } from "next/server";

export async function FetchWorkoutPlans() {
    try {
      const plans = await db.workoutPlan.findMany({
        select: {
          title: true,
        },
      });
      return plans;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching workout plans');
    }
  }