/*
  Warnings:

  - You are about to drop the `ScheduleCardWeight` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `color` on the `ScheduleCard` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ScheduleCardWeight_ScheduleRecordsID_idx";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ScheduleCardWeight";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ScheduleCard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day" TEXT NOT NULL,
    "exerciseTitle" TEXT NOT NULL,
    "weight" INTEGER,
    "sets" INTEGER,
    "reps" INTEGER,
    "ScheduleID" TEXT NOT NULL,
    CONSTRAINT "ScheduleCard_ScheduleID_fkey" FOREIGN KEY ("ScheduleID") REFERENCES "WorkoutPlan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ScheduleCard" ("ScheduleID", "day", "exerciseTitle", "id") SELECT "ScheduleID", "day", "exerciseTitle", "id" FROM "ScheduleCard";
DROP TABLE "ScheduleCard";
ALTER TABLE "new_ScheduleCard" RENAME TO "ScheduleCard";
CREATE INDEX "ScheduleCard_ScheduleID_idx" ON "ScheduleCard"("ScheduleID");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
