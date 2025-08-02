import { AirportRepository } from "../repositories/AirportRepository";
import { ServiceError } from "../utils/error/ServiceError";

export class AirportService {
    static async createAirport(name: string, address: string, city_id: number) {
        try {
            if (!name || !address || !city_id) {
                throw new ServiceError(
                    400,
                    "MISSING_REQUIRED_FIELDS",
                    "Name, address, and city_id are required to create an airport"
                );
            }

            return await AirportRepository.createAirport(name, address, city_id);
        } catch (error) {
            if (error instanceof ServiceError) {
                throw error;
            }
            throw new ServiceError(
                500,
                "AIRPORT_CREATION_FAILED",
                "Failed to create a new airport due to an internal error",
            );
        }
    }
    
    static async getAirport(id: number) {
        try {
            if (!id || isNaN(id)) {
                throw new ServiceError(
                    400,
                    "INVALID_ID",
                    "A valid numeric airport ID is required"
                );
            }

            const airport = await AirportRepository.getAirport(id);
            if (!airport) {
                throw new ServiceError(
                    404,
                    "AIRPORT_NOT_FOUND",
                    `Airport with ID ${id} does not exist`,
                );
            }
            return airport;
        } catch (error) {
            if (error instanceof ServiceError) {
                throw error;
            }
            throw new ServiceError(
                500,
                "AIRPORT_RETRIEVAL_ERROR",
                `Failed to retrieve airport with ID ${id}`
            );
        }
    }

    static async getAllAirports() {
        try {
            const airports = await AirportRepository.getAllAirports();
            if (!airports || airports.length === 0) {
                throw new ServiceError(
                    404,
                    "NO_AIRPORTS_FOUND",
                    "No airports currently exist in the database"
                );
            }
            return airports;
        } catch (error) {
            if (error instanceof ServiceError) {
                throw error;
            }
            throw new ServiceError(
                500,
                "AIRPORTS_RETRIEVAL_ERROR",
                "Failed to retrieve the list of airports"
            );
        }
    }

    static async updateAirport(id: number, name: string, address: string) {
        try {
            if (!id || isNaN(id)) {
                throw new ServiceError(
                    400,
                    "INVALID_ID",
                    "A valid numeric airport ID is required for update"
                );
            }

            if (!name && !address) {
                throw new ServiceError(
                    400,
                    "NO_UPDATE_DATA",
                    "At least one field (name or address) must be provided for update"
                );
            }

            const updatedAirport = await AirportRepository.updateAirport(id, name, address);
            if (!updatedAirport) {
                throw new ServiceError(
                    404,
                    "AIRPORT_NOT_FOUND",
                    `Cannot update - airport with ID ${id} does not exist`
                );
            }
            return updatedAirport;
        } catch (error) {
            if (error instanceof ServiceError) {
                throw error;
            }
            throw new ServiceError(
                500,
                "AIRPORT_UPDATE_FAILED",
                `Failed to update airport with ID ${id}`
            );
        }
    }

    static async deleteAirport(id: number) {
        try {
            if (!id || isNaN(id)) {
                throw new ServiceError(
                    400,
                    "INVALID_ID",
                    "A valid numeric airport ID is required for deletion"
                );
            }

            const deletionResult = await AirportRepository.deleteAirport(id);
            if (!deletionResult) {
                throw new ServiceError(
                    404,
                    "AIRPORT_NOT_FOUND",
                    `Cannot delete - airport with ID ${id} does not exist`,
                );
            }
            return deletionResult;
        } catch (error) {
            if (error instanceof ServiceError) {
                throw error;
            }
            throw new ServiceError(
                500,
                "AIRPORT_DELETION_FAILED",
                `Failed to delete airport with ID ${id}`
            );
        }
    }
}