import { prisma } from "../config/db"
import { flightFilterProps, flightProps } from "../types/flightTypes"


export class FlightRepository{
    static async createFlight(data:flightProps){
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
    }

    static async findByFlightNumber(flight_number:string){
        return await prisma.flight.findFirst({
            where:{
                flight_number
            }
        })
    }

    static async getFlight(id:number){
        return prisma.flight.findUnique({
            where:{
                id
            }
        })
    }

    static async getAllFlights(filter?: flightFilterProps) {
        return prisma.flight.findMany({
            where: filter ? {
            AND: [
                filter.minPrice ? { price: { gte: filter.minPrice } } : {},
                filter.maxPrice ? { price: { lte: filter.maxPrice } } : {},
                filter.departureAirport ? { 
                departure_airport_id: filter.departureAirport 
                } : {},
                filter.arrivalAirport ? {
                destination_airport_id:filter.arrivalAirport
                }:{},
            ]
            } : undefined,
            
        });

    }

    static async updateFlight(id:number,totalSeats:number){
        return await prisma.flight.update({
            where:{
                id
            },
            data:{
                totalSeats
            }
        })
    }

    static async deleteFlight(id:number){
        return await prisma.flight.delete({
            where:{
                id
            }
        })
    }
}
