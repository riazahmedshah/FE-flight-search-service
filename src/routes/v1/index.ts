import express from "express"
import {createCity,deleteCity,getCity, updateCity} from "../../controllers/index"

export const v1Cityroutes = express.Router();

v1Cityroutes.post("/city", createCity);
v1Cityroutes.get("/city/:id", getCity);
v1Cityroutes.patch("/city/:id", updateCity);
v1Cityroutes.delete("/city/:id", deleteCity);