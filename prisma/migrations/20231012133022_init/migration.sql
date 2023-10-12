-- CreateTable
CREATE TABLE "ScheduleCard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day" TEXT NOT NULL,
    "exerciseTitle" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "ScheduleID" TEXT NOT NULL,
    CONSTRAINT "ScheduleCard_ScheduleID_fkey" FOREIGN KEY ("ScheduleID") REFERENCES "WorkoutPlan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ScheduleCardWeight" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "weight" INTEGER NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "ScheduleRecordsID" TEXT NOT NULL,
    CONSTRAINT "ScheduleCardWeight_ScheduleRecordsID_fkey" FOREIGN KEY ("ScheduleRecordsID") REFERENCES "ScheduleCard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "ScheduleCard_ScheduleID_idx" ON "ScheduleCard"("ScheduleID");

-- CreateIndex
CREATE INDEX "ScheduleCardWeight_ScheduleRecordsID_idx" ON "ScheduleCardWeight"("ScheduleRecordsID");
