import express from "express"
import { createAirport,deleteAirport,getAirport, getAllAirports, updateAirport } from "../../controllers/AirportController";

export const v1AirportRoutes = express.Router();

v1AirportRoutes.post("/airport", createAirport);
v1AirportRoutes.get("/airport/:id", getAirport);
v1AirportRoutes.get("/allAirports", getAllAirports);
v1AirportRoutes.patch("/airport/:id", updateAirport);
v1AirportRoutes.delete("/airport/:id", deleteAirport);
