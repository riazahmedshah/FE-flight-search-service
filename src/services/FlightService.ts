import { FlightRepository } from "../repositories/FlightRepository";
import { flightProps } from "../types/flightTypes";

export class FlightService{
    static async createFlight(data:flightProps){
        return await FlightRepository.createFlight(data)
    }
}