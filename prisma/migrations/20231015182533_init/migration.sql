/*
  Warnings:

  - You are about to drop the column `FirstRep` on the `ScheduleCard` table. All the data in the column will be lost.
  - You are about to drop the column `FirstSet` on the `ScheduleCard` table. All the data in the column will be lost.
  - You are about to drop the column `FirstWeight` on the `ScheduleCard` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ScheduleCard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day" TEXT NOT NULL,
    "exerciseTitle" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "firstWeight" INTEGER,
    "firstSet" INTEGER,
    "firstRep" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "ScheduleID" TEXT NOT NULL,
    CONSTRAINT "ScheduleCard_ScheduleID_fkey" FOREIGN KEY ("ScheduleID") REFERENCES "WorkoutPlan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ScheduleCard" ("ScheduleID", "createdAt", "day", "exerciseTitle", "id", "reps", "sets", "updatedAt", "weight") SELECT "ScheduleID", "createdAt", "day", "exerciseTitle", "id", "reps", "sets", "updatedAt", "weight" FROM "ScheduleCard";
DROP TABLE "ScheduleCard";
ALTER TABLE "new_ScheduleCard" RENAME TO "ScheduleCard";
CREATE INDEX "ScheduleCard_ScheduleID_idx" ON "ScheduleCard"("ScheduleID");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
