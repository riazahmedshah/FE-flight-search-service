import { AirplaneRepository } from "../repositories/AirplaneRepository";
import { FlightRepository } from "../repositories/FlightRepository";
import { flightProps } from "../types/flightTypes";

export class FlightService{
    static async createFlight(data:flightProps){
        try {
            const airplane = await AirplaneRepository.getAirplane(data.airplane_id);
            if(!airplane){
                throw new Error("Airplane not found");
            }
            return await FlightRepository.createFlight({...data, totalSeats:airplane.capacity})
        } catch (error) {
            console.error(error)
        }
    }
}