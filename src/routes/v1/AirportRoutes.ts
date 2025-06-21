import express from "express"
import { createAirport,getAirport, getAllAirports } from "../../controllers/AirportController";

export const v1AirportRoutes = express.Router();

v1AirportRoutes.post("/airport", createAirport);
v1AirportRoutes.get("/airport/:id", getAirport);
v1AirportRoutes.get("/allAirports", getAllAirports);
