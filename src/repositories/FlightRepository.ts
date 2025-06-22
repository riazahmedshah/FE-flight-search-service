import { prisma } from "../config/db"
import { flightFilterProps, flightProps } from "../types/flightTypes"


export class FlightRepository{
    static async createFlight(data:flightProps){
        try {
            return await prisma.flight.create({
                data:{
                    departure_airport_id: data.departure_airport_id,
                    destination_airport_id: data.departure_airport_id,
                    airplane_id:data.airplane_id,
                    departure:data.departure,
                    arrival: data.arrival,
                    flight_number: data.flight_number,
                    price:data.price
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    static async findByFlightNumber(flight_number:string){
        try {
            return await prisma.flight.findFirst({
                where:{
                    flight_number
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    static async getAllFlights(filter:flightFilterProps){
        try {
            return prisma.flight.findMany({
                where:{
                    OR:[
                        {
                            price:{gte:filter.minPrice}
                        },
                        {
                            price:{lte:filter.maxPrice}
                        }
                    ]
                }
            })
        } catch (error) {
            
        }
    }
}