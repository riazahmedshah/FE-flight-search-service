import express from "express"
import {createCity,deleteCity,getAllCities,getCity, updateCity,createAirport} from "../../controllers/exports"

export const v1CityRoutes = express.Router();

// CITY ROUTES
v1CityRoutes.post("/city", createCity);
v1CityRoutes.get("/city/:id", getCity);
v1CityRoutes.patch("/city/:id", updateCity);
v1CityRoutes.delete("/city/:id", deleteCity);
v1CityRoutes.get("/allCities", getAllCities);
