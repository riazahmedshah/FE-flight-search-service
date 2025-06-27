import express from "express"
import { createFlight, deleteFlight, getAllFlights, getFlight, updateFlight } from "../../controllers/FlightController";

export const v1FlightRoutes = express.Router();

v1FlightRoutes.post  ("/flight", createFlight);
v1FlightRoutes.get   ("/flight",  getAllFlights);
v1FlightRoutes.get   ("/flight/:id", getFlight);
v1FlightRoutes.patch ("/flight/:id", updateFlight)
v1FlightRoutes.delete("/flight/:id", deleteFlight);