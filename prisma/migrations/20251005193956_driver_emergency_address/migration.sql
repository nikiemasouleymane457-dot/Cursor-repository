/*
  Warnings:

  - Added the required column `emergencyContactAddress` to the `Driver` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Driver" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "nationalIdNumber" TEXT NOT NULL,
    "emergencyContact" TEXT NOT NULL,
    "emergencyContactPhone" TEXT NOT NULL,
    "emergencyContactAddress" TEXT NOT NULL,
    "homeAddress" TEXT NOT NULL,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "vehicleType" TEXT,
    "licensePlate" TEXT,
    CONSTRAINT "Driver_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Driver" ("emergencyContact", "emergencyContactPhone", "homeAddress", "id", "isOnline", "licensePlate", "nationalIdNumber", "userId", "vehicleType") SELECT "emergencyContact", "emergencyContactPhone", "homeAddress", "id", "isOnline", "licensePlate", "nationalIdNumber", "userId", "vehicleType" FROM "Driver";
DROP TABLE "Driver";
ALTER TABLE "new_Driver" RENAME TO "Driver";
CREATE UNIQUE INDEX "Driver_userId_key" ON "Driver"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
