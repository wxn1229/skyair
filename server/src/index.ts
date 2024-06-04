import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
prisma.$connect().catch((err: any) => {
  console.log("🚀 ~ err:", err);
});

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://health-food-search-system-client.vercel.app",
      "https://skyair-nu.vercel.app",
    ],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/flight", async (req, res) => {
  try {
    const flights = await prisma.flight.findMany();
    res.status(200).json({ flights });
  } catch (error) {
    console.log("🚀 ~ app.get ~ error:", error);
    res.status(500).send("server error");
  }
});

app.post("/search", async (req, res) => {
  try {
    const { idNumber } = req.body;
    const flights = await prisma.passenger.findMany({
      where: {
        idNumber,
      },
      select: {
        personNumber: true,
        cabinClass: true,
        flight: true,
        name: true,
      },
    });
    const result = flights.map((item) => ({
      name: item.name,
      flightId: item.flight.flightId,
      departure: item.flight.departure,
      departureTime: item.flight.departureTime,
      destination: item.flight.destination,
      arrivalTime: item.flight.arrivalTime,
      flightDuration: item.flight.flightDuration,
      personNumber: item.personNumber,
      cabinClass: item.cabinClass,
    }));
    res.status(200).json({ result });
  } catch (error) {
    console.log("🚀 ~ app.get ~ error:", error);
    res.status(500).send("server error");
  }
});
app.post("/getPassengerInfo", async (req, res) => {
  try {
    const { idNumber, flightId } = req.body;
    const flights = await prisma.passenger.findUnique({
      where: {
        idNumber_flightId: {
          idNumber,
          flightId,
        },
      },
    });

    res.status(200).json({ flights });
  } catch (error) {
    console.log("🚀 ~ app.get ~ error:", error);
    res.status(500).send("server error");
  }
});
app.post("/deletePassengerInfo", async (req, res) => {
  try {
    const { idNumber, flightId } = req.body;
    const flights = await prisma.passenger.delete({
      where: {
        idNumber_flightId: {
          idNumber,
          flightId,
        },
      },
    });

    res.status(200).json({ flights });
  } catch (error) {
    console.log("🚀 ~ app.get ~ error:", error);
    res.status(500).send("server error");
  }
});
app.patch("/updatePassengerInfo", async (req, res) => {
  try {
    const {
      idNumber,
      gender,
      name,
      phone,
      cabinClass,
      personNumber,
      flightId,
    } = req.body;
    const result = await prisma.passenger.update({
      where: {
        idNumber_flightId: {
          idNumber,
          flightId,
        },
      },
      data: {
        gender,
        name,
        phone,
        personNumber,
        cabinClass,
      },
    });

    res.status(200).json({ result });
  } catch (error) {
    console.log("🚀 ~ app.get ~ error:", error);
    res.status(500).send("server error");
  }
});
app.post("/createBook", async (req, res) => {
  try {
    const {
      idNumber,
      gender,
      name,
      phone,
      cabinClass,
      personNumber,
      flightId,
    } = req.body;
    const result = await prisma.passenger.create({
      data: {
        idNumber,
        gender,
        name,
        phone,
        personNumber,
        cabinClass,
        flightId,
      },
    });
    res.status(200).json({ result });
  } catch (error) {
    console.log("🚀 ~ app.get ~ error:", error);
    res.status(500).send("server error");
  }
});

app.listen(3004, () => {
  console.log("sever listening 3004");
});

export default app;
