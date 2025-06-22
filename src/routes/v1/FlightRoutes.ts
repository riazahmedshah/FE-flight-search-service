import express from "express"
import { createFlight, deleteFlight, getAllFlights } from "../../controllers/FlightController";

export const v1FlightRoutes = express.Router();

v1FlightRoutes.post("/flight", createFlight);
v1FlightRoutes.get("/flight",  getAllFlights);
v1FlightRoutes.delete("/flight/:id", deleteFlight);