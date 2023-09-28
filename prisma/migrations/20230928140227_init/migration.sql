/*
  Warnings:

  - The primary key for the `WorkoutPlan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `WorkoutPlan` table. All the data in the column will be lost.
  - The required column `id` was added to the `WorkoutPlan` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `planId` to the `WorkoutPlan` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WorkoutPlan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT DEFAULT 'My workout plan',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "planId" TEXT NOT NULL,
    CONSTRAINT "WorkoutPlan_planId_fkey" FOREIGN KEY ("planId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WorkoutPlan" ("createdAt", "title", "updatedAt") SELECT "createdAt", "title", "updatedAt" FROM "WorkoutPlan";
DROP TABLE "WorkoutPlan";
ALTER TABLE "new_WorkoutPlan" RENAME TO "WorkoutPlan";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
