import express from "express"
import {createCity,getCity} from "../../controllers/index"

export const v1Cityroutes = express.Router();

v1Cityroutes.post("/city", createCity);
v1Cityroutes.get("/city/:id", getCity)