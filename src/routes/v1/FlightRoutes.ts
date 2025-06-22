import express from "express"
import { createFlight } from "../../controllers/FlightController";

export const v1FlightRoutes = express.Router();

v1FlightRoutes.post("/flight", createFlight);