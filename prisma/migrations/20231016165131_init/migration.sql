/*
  Warnings:

  - You are about to alter the column `firstWeight` on the `ScheduleCard` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal`.
  - You are about to alter the column `weight` on the `ScheduleCard` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal`.
  - You are about to alter the column `weight` on the `PersonalBest` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal`.
  - Made the column `firstRep` on table `ScheduleCard` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstSet` on table `ScheduleCard` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstWeight` on table `ScheduleCard` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ScheduleCard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day" TEXT NOT NULL,
    "exerciseTitle" TEXT NOT NULL,
    "weight" DECIMAL NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "firstWeight" DECIMAL NOT NULL,
    "firstSet" INTEGER NOT NULL,
    "firstRep" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "ScheduleID" TEXT NOT NULL,
    CONSTRAINT "ScheduleCard_ScheduleID_fkey" FOREIGN KEY ("ScheduleID") REFERENCES "WorkoutPlan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ScheduleCard" ("ScheduleID", "createdAt", "day", "exerciseTitle", "firstRep", "firstSet", "firstWeight", "id", "reps", "sets", "updatedAt", "weight") SELECT "ScheduleID", "createdAt", "day", "exerciseTitle", "firstRep", "firstSet", "firstWeight", "id", "reps", "sets", "updatedAt", "weight" FROM "ScheduleCard";
DROP TABLE "ScheduleCard";
ALTER TABLE "new_ScheduleCard" RENAME TO "ScheduleCard";
CREATE INDEX "ScheduleCard_ScheduleID_idx" ON "ScheduleCard"("ScheduleID");
CREATE TABLE "new_PersonalBest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "exerciseTitle" TEXT NOT NULL,
    "weight" DECIMAL NOT NULL,
    "color" TEXT NOT NULL DEFAULT 'boxDarkPink',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "recordId" TEXT NOT NULL,
    CONSTRAINT "PersonalBest_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PersonalBest" ("color", "createdAt", "exerciseTitle", "id", "recordId", "updatedAt", "weight") SELECT "color", "createdAt", "exerciseTitle", "id", "recordId", "updatedAt", "weight" FROM "PersonalBest";
DROP TABLE "PersonalBest";
ALTER TABLE "new_PersonalBest" RENAME TO "PersonalBest";
CREATE INDEX "PersonalBest_recordId_idx" ON "PersonalBest"("recordId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
