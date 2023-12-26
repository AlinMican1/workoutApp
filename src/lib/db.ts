/**
 * From Prisma docs, properly instantiating PrismaClient with Next.js
 *
 * More at: https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices
 */

import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined
  }
  
   const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
      log: ["query"],
    })
  
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export const db = prisma; 