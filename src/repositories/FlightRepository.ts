import { prisma } from "../config/db"
import { flightProps } from "../types/flightTypes"


export class FlightRepository{
    static async createFlight(data:flightProps){
        return await prisma.flight.create({
            data:{
                departure_airport_id: data.departure_airport_id,
                destination_airport_id: data.departure_airport_id,
                airplane_id:data.airplane_id,
                departure:data.departure,
                arrival: data.arrival,
                flight_number: data.flight_number,
                price:data.price,
                totalSeats:data.totalSeats,
            }
        })
    }
}