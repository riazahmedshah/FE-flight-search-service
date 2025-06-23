import { AirplaneRepository } from "../repositories/AirplaneRepository";
import { AirportRepository } from "../repositories/AirportRepository";
import { FlightRepository } from "../repositories/FlightRepository";
import { flightProps,flightFilterProps } from "../types/flightTypes";
import { generateFlightNumber } from "../utils/helper";

export class FlightService{
    static async createFlight(data:flightProps){
        try {
            const [airplane, departureAirport, destinationAirport] = await Promise.all([
                AirplaneRepository.getAirplane(data.airplane_id),
                AirportRepository.getAirport(data.departure_airport_id),
                AirportRepository.getAirport(data.destination_airport_id)
            ])
            if (!airplane) throw new Error('Airplane not found');
            if (!departureAirport) throw new Error('Departure airport not found');
            if (!destinationAirport) throw new Error('Destination airport not found');

            if (departureAirport.id === destinationAirport.id) {
                throw new Error('Departure and destination airports cannot be the same');
            }


            const flightNumber = generateFlightNumber();

            return await FlightRepository.createFlight({...data,totalSeats:airplane.capacity,flight_number:flightNumber})
        } catch (error) {
            console.error(error)
        }
    }

    static async getAllFlights(filter?:flightFilterProps){
        try {
            return FlightRepository.getAllFlights(filter)
        } catch (error) {
            console.error(error)
        }
    }

    static async deleteFlight(id:number){
        try {
            return await FlightRepository.deleteFlight(id)
        } catch (error) {
            console.error(error)
        }
    }
}