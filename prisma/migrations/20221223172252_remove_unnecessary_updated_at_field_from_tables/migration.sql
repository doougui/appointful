/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `dentists` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `patients` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_appointments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startsAt" DATETIME NOT NULL,
    "endsAt" DATETIME NOT NULL,
    "canceledAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "patientId" TEXT NOT NULL,
    "dentistId" TEXT NOT NULL,
    CONSTRAINT "appointments_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "appointments_dentistId_fkey" FOREIGN KEY ("dentistId") REFERENCES "dentists" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_appointments" ("canceledAt", "createdAt", "dentistId", "endsAt", "id", "patientId", "startsAt") SELECT "canceledAt", "createdAt", "dentistId", "endsAt", "id", "patientId", "startsAt" FROM "appointments";
DROP TABLE "appointments";
ALTER TABLE "new_appointments" RENAME TO "appointments";
CREATE TABLE "new_dentists" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_dentists" ("createdAt", "email", "id", "name") SELECT "createdAt", "email", "id", "name" FROM "dentists";
DROP TABLE "dentists";
ALTER TABLE "new_dentists" RENAME TO "dentists";
CREATE UNIQUE INDEX "dentists_email_key" ON "dentists"("email");
CREATE TABLE "new_patients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_patients" ("createdAt", "email", "id", "name", "phone") SELECT "createdAt", "email", "id", "name", "phone" FROM "patients";
DROP TABLE "patients";
ALTER TABLE "new_patients" RENAME TO "patients";
CREATE UNIQUE INDEX "patients_email_key" ON "patients"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
