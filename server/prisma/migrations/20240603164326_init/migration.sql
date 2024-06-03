-- CreateTable
CREATE TABLE "Flight" (
    "flightId" TEXT NOT NULL PRIMARY KEY,
    "departure" TEXT NOT NULL,
    "departureTime" DATETIME NOT NULL,
    "destination" TEXT NOT NULL,
    "arrivalTime" DATETIME NOT NULL,
    "flightDuration" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Passenger" (
    "idNumber" TEXT NOT NULL PRIMARY KEY,
    "gender" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cabinClass" TEXT NOT NULL,
    "flightId" TEXT NOT NULL,
    CONSTRAINT "Passenger_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "Flight" ("flightId") ON DELETE RESTRICT ON UPDATE CASCADE
);
