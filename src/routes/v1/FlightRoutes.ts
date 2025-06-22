import express from "express"
import { createFlight, getAllFlights } from "../../controllers/FlightController";

export const v1FlightRoutes = express.Router();

v1FlightRoutes.post("/flight", createFlight);
v1FlightRoutes.get("/flight",  getAllFlights);