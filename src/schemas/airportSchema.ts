import { z } from "zod";
import { AirportRepository } from "../repositories/AirportRepository";


const airportNameBaseSchema = z.string().min(3, "Name must be at least 3 characters");

const checkAirportExists = async (name: string) => {
  try {
    const airport = await AirportRepository.findAirportByName(name);
    return !airport;
  } catch (error) {
    return false;
  }
};

export const airportNameSchema = airportNameBaseSchema.refine(
  checkAirportExists, 
  "AIRPORT_ALREADY_EXISTS"
);


export const airportSchema = z.object({
  name: airportNameSchema,
  address: z.string().min(10, "Address must be at least 10 characters"),
  city_id: z.number().positive("City ID must be a positive number")
});