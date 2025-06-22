import { FlightRepository } from "../repositories/FlightRepository";
import { flightProps } from "../types/flightTypes";

export class FlightService{
    static async createFlight(data:flightProps){
        try {
            return await FlightRepository.createFlight(data)
        } catch (error) {
            console.error(error)
        }
    }
}