/*
  Warnings:

  - Made the column `title` on table `WorkoutPlan` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WorkoutPlan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "planId" TEXT NOT NULL,
    CONSTRAINT "WorkoutPlan_planId_fkey" FOREIGN KEY ("planId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WorkoutPlan" ("createdAt", "id", "planId", "title", "updatedAt") SELECT "createdAt", "id", "planId", "title", "updatedAt" FROM "WorkoutPlan";
DROP TABLE "WorkoutPlan";
ALTER TABLE "new_WorkoutPlan" RENAME TO "WorkoutPlan";
CREATE INDEX "WorkoutPlan_planId_idx" ON "WorkoutPlan"("planId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
