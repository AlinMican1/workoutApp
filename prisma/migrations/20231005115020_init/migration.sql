-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PersonalBest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "exerciseTitle" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "recordId" TEXT NOT NULL,
    CONSTRAINT "PersonalBest_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "User" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PersonalBest" ("createdAt", "exerciseTitle", "id", "recordId", "updatedAt", "weight") SELECT "createdAt", "exerciseTitle", "id", "recordId", "updatedAt", "weight" FROM "PersonalBest";
DROP TABLE "PersonalBest";
ALTER TABLE "new_PersonalBest" RENAME TO "PersonalBest";
CREATE INDEX "PersonalBest_recordId_idx" ON "PersonalBest"("recordId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
