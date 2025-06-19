import { prisma } from "../config/db"

interface flightProps{
    flight_number:string
    departure_airport_id:number
    destination_airport_id:number
    airplane_id:number
    airport_id:number
    departure:Date
    arrival:Date

}
export class FlightRepository{
    static async createFlight({
        airplane_id, airport_id, arrival,departure, departure_airport_id,destination_airport_id,flight_number
    }:flightProps){
        return await prisma.flight.create({
            data:{
                departure_airport_id,
                destination_airport_id,
                airplane_id,
                airport_id,
                departure,
                arrival,
                flight_number
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