import { prisma } from "../config/db"
import { flightFilterProps, flightProps } from "../types/flightTypes"


export class FlightRepository{
    static async createFlight(data:flightProps){
        try {
            return await prisma.flight.create({
                data:{
                    flight_number:data.flight_number,
                    departure_airport_id: data.departure_airport_id,
                    destination_airport_id: data.destination_airport_id,
                    airplane_id:data.airplane_id,
                    departure:data.departure,
                    arrival: data.arrival,
                    price:data.price,
                    totalSeats:data.totalSeats,
                    bowdingGate:data.boardingGate
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

    static async getAllFlights(filter?: flightFilterProps) {
        try {
            return prisma.flight.findMany({
                where: filter && Object.keys(filter).length > 0 ? {
                    
                AND: [
                    filter.minPrice ? { price: { gte: filter.minPrice } } : {},
                    filter.maxPrice ? { price: { lte: filter.maxPrice } } : {},
                    filter.departureAirport ? { 
                    departure_airport_id: filter.departureAirport 
                    } : {},
                    filter.arrivalAirport ? {
                    destination_airport_id:filter.arrivalAirport
                    }:{},
                ].filter(condition => Object.keys(condition).length > 0)
                } : undefined,
                
            });
        } catch (error) {
            console.error(error)
        }
    }

    static async deleteFlight(id:number){
        try {
            return await prisma.flight.delete({
                where:{
                    id
                }
            })
        } catch (error) {
            console.error(error)
        }
    }
}