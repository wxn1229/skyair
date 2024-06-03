/*
  Warnings:

  - The primary key for the `Passenger` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Passenger" (
    "idNumber" TEXT NOT NULL,
    "gender" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cabinClass" BOOLEAN NOT NULL,
    "personNumber" INTEGER NOT NULL,
    "flightId" TEXT NOT NULL,

    PRIMARY KEY ("idNumber", "flightId"),
    CONSTRAINT "Passenger_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "Flight" ("flightId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Passenger" ("cabinClass", "flightId", "gender", "idNumber", "name", "personNumber", "phone") SELECT "cabinClass", "flightId", "gender", "idNumber", "name", "personNumber", "phone" FROM "Passenger";
DROP TABLE "Passenger";
ALTER TABLE "new_Passenger" RENAME TO "Passenger";
PRAGMA foreign_key_check("Passenger");
PRAGMA foreign_keys=ON;
