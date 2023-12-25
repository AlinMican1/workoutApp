import { db } from "@/lib/db";

export async function GetAllRecords(id:string, userEmail:string){
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
    return record
}