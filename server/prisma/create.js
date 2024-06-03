const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const flightData = [
  {
    flightId: "FL001",
    departure: "台北",
    departureTime: new Date("2024-06-10T08:00:00Z"),
    destination: "首爾",
    arrivalTime: new Date("2024-06-10T11:00:00Z"),
    flightDuration: 3.0,
  },
  {
    flightId: "FL002",
    departure: "大阪",
    departureTime: new Date("2024-06-11T09:00:00Z"),
    destination: "台北",
    arrivalTime: new Date("2024-06-11T11:00:00Z"),
    flightDuration: 2.0,
  },
  {
    flightId: "FL003",
    departure: "首爾",
    departureTime: new Date("2024-06-12T10:00:00Z"),
    destination: "大阪",
    arrivalTime: new Date("2024-06-12T12:30:00Z"),
    flightDuration: 2.5,
  },
  {
    flightId: "FL004",
    departure: "台北",
    departureTime: new Date("2024-06-13T07:00:00Z"),
    destination: "大阪",
    arrivalTime: new Date("2024-06-13T09:00:00Z"),
    flightDuration: 2.0,
  },
  {
    flightId: "FL005",
    departure: "首爾",
    departureTime: new Date("2024-06-14T14:00:00Z"),
    destination: "台北",
    arrivalTime: new Date("2024-06-14T16:30:00Z"),
    flightDuration: 2.5,
  },
  {
    flightId: "FL006",
    departure: "大阪",
    departureTime: new Date("2024-06-15T15:00:00Z"),
    destination: "首爾",
    arrivalTime: new Date("2024-06-15T17:30:00Z"),
    flightDuration: 2.5,
  },
  {
    flightId: "FL007",
    departure: "台北",
    departureTime: new Date("2024-06-16T16:00:00Z"),
    destination: "首爾",
    arrivalTime: new Date("2024-06-16T19:00:00Z"),
    flightDuration: 3.0,
  },
  {
    flightId: "FL008",
    departure: "大阪",
    departureTime: new Date("2024-06-17T18:00:00Z"),
    destination: "台北",
    arrivalTime: new Date("2024-06-17T20:00:00Z"),
    flightDuration: 2.0,
  },
  {
    flightId: "FL009",
    departure: "首爾",
    departureTime: new Date("2024-06-18T19:00:00Z"),
    destination: "大阪",
    arrivalTime: new Date("2024-06-18T21:30:00Z"),
    flightDuration: 2.5,
  },
  {
    flightId: "FL010",
    departure: "台北",
    departureTime: new Date("2024-06-19T20:00:00Z"),
    destination: "大阪",
    arrivalTime: new Date("2024-06-19T22:00:00Z"),
    flightDuration: 2.0,
  },
  {
    flightId: "FL011",
    departure: "首爾",
    departureTime: new Date("2024-06-20T06:00:00Z"),
    destination: "台北",
    arrivalTime: new Date("2024-06-20T08:30:00Z"),
    flightDuration: 2.5,
  },
  {
    flightId: "FL012",
    departure: "大阪",
    departureTime: new Date("2024-06-21T07:00:00Z"),
    destination: "首爾",
    arrivalTime: new Date("2024-06-21T09:30:00Z"),
    flightDuration: 2.5,
  },
  {
    flightId: "FL013",
    departure: "台北",
    departureTime: new Date("2024-06-22T08:00:00Z"),
    destination: "首爾",
    arrivalTime: new Date("2024-06-22T11:00:00Z"),
    flightDuration: 3.0,
  },
  {
    flightId: "FL014",
    departure: "大阪",
    departureTime: new Date("2024-06-23T09:00:00Z"),
    destination: "台北",
    arrivalTime: new Date("2024-06-23T11:00:00Z"),
    flightDuration: 2.0,
  },
  {
    flightId: "FL015",
    departure: "首爾",
    departureTime: new Date("2024-06-24T10:00:00Z"),
    destination: "大阪",
    arrivalTime: new Date("2024-06-24T12:30:00Z"),
    flightDuration: 2.5,
  },
  {
    flightId: "FL016",
    departure: "台北",
    departureTime: new Date("2024-06-25T07:00:00Z"),
    destination: "大阪",
    arrivalTime: new Date("2024-06-25T09:00:00Z"),
    flightDuration: 2.0,
  },
  {
    flightId: "FL017",
    departure: "首爾",
    departureTime: new Date("2024-06-26T14:00:00Z"),
    destination: "台北",
    arrivalTime: new Date("2024-06-26T16:30:00Z"),
    flightDuration: 2.5,
  },
  {
    flightId: "FL018",
    departure: "大阪",
    departureTime: new Date("2024-06-27T15:00:00Z"),
    destination: "首爾",
    arrivalTime: new Date("2024-06-27T17:30:00Z"),
    flightDuration: 2.5,
  },
  {
    flightId: "FL019",
    departure: "台北",
    departureTime: new Date("2024-06-28T16:00:00Z"),
    destination: "首爾",
    arrivalTime: new Date("2024-06-28T19:00:00Z"),
    flightDuration: 3.0,
  },
  {
    flightId: "FL020",
    departure: "大阪",
    departureTime: new Date("2024-06-29T18:00:00Z"),
    destination: "台北",
    arrivalTime: new Date("2024-06-29T20:00:00Z"),
    flightDuration: 2.0,
  },
];

async function main() {
  await prisma.flight.createMany({
    data: flightData,
  });

  console.log("Data seeded successfully.");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
