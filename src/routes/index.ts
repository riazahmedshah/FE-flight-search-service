import express from "express"

import { v1Cityroutes } from "./v1/index"

export const router = express.Router();

router.use("/v1", v1Cityroutes);