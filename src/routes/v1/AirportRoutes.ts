import express from "express"
import { createAirport } from "../../controllers/AirportController";

export const v1AirportRoutes = express.Router();

v1AirportRoutes.post("/airport", createAirport);