-- CreateTable
CREATE TABLE "PersonalBest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "exerciseTitle" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "recordId" TEXT NOT NULL,
    CONSTRAINT "PersonalBest_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "PersonalBest_recordId_idx" ON "PersonalBest"("recordId");
