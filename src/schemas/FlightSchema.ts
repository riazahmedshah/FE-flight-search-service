import { z } from "zod"
import { FlightRepository } from "../repositories/FlightRepository";

const flight_number_base_schema = z.string().toUpperCase().max(4,"Flight number should be 4 Charcters only");

const checkFlightExist = async(flight_number:string) => {
    try {
        const flight = await FlightRepository.findByFlightNumber(flight_number);
        return !flight
    } catch (error) {
        return false;
    }
}

export const flight_number_schema = flight_number_base_schema.refine(
    checkFlightExist,
    "FLIGHT_ALREADY_EXISTS"
)

export const flightSchema = z.object({
    flight_number:flight_number_schema,
    departure_airport_id:z.number(),
    destination_airport_id:z.number(),
    airplane_id:z.number(),
    departure:z.coerce.date(),
    arrival:z.coerce.date(),
    price: z.number(),
    totalSeats:z.number().optional(),
    boardingGate:z.string().optional()
})

export const flighFilterSchema = z.object({
    minPrice:z.number().optional(),
    maxPrice:z.number().optional()
})