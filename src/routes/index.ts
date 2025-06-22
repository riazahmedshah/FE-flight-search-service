import express from "express"
import { v1AirportRoutes, v1CityRoutes, v1FlightRoutes } from "./v1/exports"




export const router = express.Router();

router.use("/v1", v1CityRoutes);
router.use("/v1", v1AirportRoutes);
router.use("/v1", v1FlightRoutes);