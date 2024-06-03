/*
  Warnings:

  - You are about to alter the column `cabinClass` on the `Passenger` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.
  - You are about to alter the column `gender` on the `Passenger` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Passenger" (
    "idNumber" TEXT NOT NULL PRIMARY KEY,
    "gender" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cabinClass" BOOLEAN NOT NULL,
    "flightId" TEXT NOT NULL,
    CONSTRAINT "Passenger_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "Flight" ("flightId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Passenger" ("cabinClass", "flightId", "gender", "idNumber", "name", "phone") SELECT "cabinClass", "flightId", "gender", "idNumber", "name", "phone" FROM "Passenger";
DROP TABLE "Passenger";
ALTER TABLE "new_Passenger" RENAME TO "Passenger";
PRAGMA foreign_key_check("Passenger");
PRAGMA foreign_keys=ON;
