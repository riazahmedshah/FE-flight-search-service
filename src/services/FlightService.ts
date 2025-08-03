import { AirplaneRepository } from "../repositories/AirplaneRepository";
import { AirportRepository } from "../repositories/AirportRepository";
import { FlightRepository } from "../repositories/FlightRepository";
import { flightProps, flightFilterProps } from "../types/flightTypes";
import { generateFlightNumber } from "../utils/helper";
import { ServiceError } from "../utils/error/ServiceError";

export class FlightService {
    static async createFlight(data: flightProps) {
        try {
            const [airplane, departureAirport, destinationAirport] = await Promise.all([
                AirplaneRepository.getAirplane(data.airplane_id),
                AirportRepository.getAirport(data.departure_airport_id),
                AirportRepository.getAirport(data.destination_airport_id)
            ]);

            if (!airplane) {
                throw new ServiceError(404, "AIRPLANE_NOT_FOUND", "Specified airplane does not exist");
            }
            if (!departureAirport) {
                throw new ServiceError(404, "DEPARTURE_AIRPORT_NOT_FOUND", "Specified departure airport does not exist");
            }
            if (!destinationAirport) {
                throw new ServiceError(404, "DESTINATION_AIRPORT_NOT_FOUND", "Specified destination airport does not exist");
            }

            if (departureAirport.id === destinationAirport.id) {
                throw new ServiceError(400, "INVALID_AIRPORTS", "Departure and destination airports cannot be the same");
            }

            const flightNumber = generateFlightNumber();
            return await FlightRepository.createFlight({
                ...data,
                totalSeats: airplane.capacity,
                flight_number: flightNumber
            });
        } catch (error) {
            if (error instanceof ServiceError) throw error;
            throw new ServiceError(500, "FLIGHT_CREATION_FAILED", "Failed to create flight");
        }
    }

    static async getFlight(id: number) {
        try {
            const flight = await FlightRepository.getFlight(id);
            if (!flight) {
                throw new ServiceError(404, "FLIGHT_NOT_FOUND", `Flight with ID ${id} not found`);
            }
            return flight;
        } catch (error) {
            if (error instanceof ServiceError) throw error;
            throw new ServiceError(500, "FLIGHT_RETRIEVAL_ERROR", `Failed to retrieve flight ${id}`);
        }
    }

    static async getAllFlights(filter?: flightFilterProps) {
        try {
            return await FlightRepository.getAllFlights(filter);
        } catch (error) {
            throw new ServiceError(500, "FLIGHTS_RETRIEVAL_ERROR", "Failed to retrieve flights");
        }
    }

    static async updateFlight(id: number, totalSeats: number) {
        try {
            const updated = await FlightRepository.updateFlight(id, totalSeats);
            if (!updated) {
                throw new ServiceError(404, "FLIGHT_UPDATE_FAILED", `Flight with ID ${id} not found`);
            }
            return updated;
        } catch (error) {
            if (error instanceof ServiceError) throw error;
            throw new ServiceError(500, "FLIGHT_UPDATE_ERROR", `Failed to update flight ${id}`);
        }
    }

    static async deleteFlight(id: number) {
        try {
            const deleted = await FlightRepository.deleteFlight(id);
            if (!deleted) {
                throw new ServiceError(404, "FLIGHT_DELETE_FAILED", `Flight with ID ${id} not found`);
            }
            return deleted;
        } catch (error) {
            if (error instanceof ServiceError) throw error;
            throw new ServiceError(500, "FLIGHT_DELETION_ERROR", `Failed to delete flight ${id}`);
        }
    }
}