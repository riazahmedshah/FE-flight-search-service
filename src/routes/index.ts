import express from "express"
import { v1Cityroutes, v1AirportRoutes } from "./v1/exports";




export const router = express.Router();

router.use("/v1", v1Cityroutes);
router.use("v1", v1AirportRoutes);