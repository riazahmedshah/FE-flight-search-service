import { AirportRepository } from "../repositories/AirportRepository";
import { ServiceError } from "../utils/error/ServiceError";

export class AirportService {
    static async createAirport(name: string, address: string, city_id: number) {
        try {
            return await AirportRepository.createAirport(name, address, city_id);
        } catch (error) {
            throw new ServiceError(
                500,
                "AIRPORT_CREATION_FAILED",
                "Failed to create airport"
            );
        }
    }
    
    static async getAirport(id: number) {
        try {
            const airport = await AirportRepository.getAirport(id);
            if (!airport) {
                throw new ServiceError(
                    404,
                    "AIRPORT_NOT_FOUND",
                    `Airport with ID ${id} not found`
                );
            }
            return airport;
        } catch (error) {
            if (error instanceof ServiceError) throw error;
            throw new ServiceError(
                500,
                "AIRPORT_RETRIEVAL_ERROR",
                `Error retrieving airport ${id}`
            );
        }
    }

    static async getAllAirports() {
        try {
            return await AirportRepository.getAllAirports();
        } catch (error) {
            throw new ServiceError(
                500,
                "AIRPORTS_RETRIEVAL_ERROR",
                "Error retrieving airports list"
            );
        }
    }

    static async updateAirport(id: number, name: string, address: string) {
        try {
            const updated = await AirportRepository.updateAirport(id, name, address);
            if (!updated) {
                throw new ServiceError(
                    404,
                    "AIRPORT_UPDATE_FAILED",
                    `Airport with ID ${id} not found for update`
                );
            }
            return updated;
        } catch (error) {
            if (error instanceof ServiceError) throw error;
            throw new ServiceError(
                500,
                "AIRPORT_UPDATE_ERROR",
                `Error updating airport ${id}`
            );
        }
    }

    static async deleteAirport(id: number) {
        try {
            const deleted = await AirportRepository.deleteAirport(id);
            if (!deleted) {
                throw new ServiceError(
                    404,
                    "AIRPORT_DELETE_FAILED",
                    `Airport with ID ${id} not found for deletion`
                );
            }
            return deleted;
        } catch (error) {
            if (error instanceof ServiceError) throw error;
            throw new ServiceError(
                500,
                "AIRPORT_DELETION_ERROR",
                `Error deleting airport ${id}`
            );
        }
    }
}