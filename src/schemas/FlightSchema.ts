import { z } from "zod"

export const flightSchema = z.object({
    flight_number:z.string().toUpperCase().max(4,"Flight number should be 4 Charcters only"),
    departure_airport_id:z.number(),
    destination_airport_id:z.number(),
    airplane_id:z.number(),
    departure:z.date(),
    arrival:z.date(),
    price: z.number(),
    totalSeats:z.number(),
    bowdingGate:z.string().optional()
})