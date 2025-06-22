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
    departure_airport_id:z.number().int().positive(),
    destination_airport_id:z.number().int().positive(),
    airplane_id:z.number().int().positive(),
    departure:z.coerce.date(),
    arrival:z.coerce.date(),
    price: z.number().int().positive(),
    boardingGate:z.string().optional()
}).superRefine((data, ctx) => {
  if(data.departure >= data.arrival){
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Arrival must be after departure",
      path: ["arrival"],
    });
  }

  if(data.departure_airport_id == data.destination_airport_id){
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message:"Departure and destination airports cannot be the same",
      path:["destination_airport_id"]
    })
  }
})

export const flighFilterSchema = z.object({
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  departureId: z.number().int().positive().optional(),
  arrivalId:z.number().int().positive().optional()
}).superRefine((data, ctx) => {
  if (data.minPrice && data.maxPrice) {
    if(data.minPrice > data.maxPrice)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:"Minimum price should be less than Maximum price",
      })
  }

  if(data.arrivalId && data.departureId){
    if(data.arrivalId == data.departureId){
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:"Arrival should be different from Departure",
      })
    }
  }
});