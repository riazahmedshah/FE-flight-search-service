import { CityRepository } from "../repositories/exports";
import { ServiceError } from "../utils/error/ServiceError";

export class CityService {
    static async createCity(name: string) {
        try {
            return await CityRepository.createCity(name);
        } catch (error) {
            throw new ServiceError(500, "CITY_CREATION_FAILED", "Failed to create city");
        }
    }

    static async deleteCity(cityId: number) {
        try {
            const result = await CityRepository.deleteCity(cityId);
            if (!result) {
                throw new ServiceError(404, "CITY_NOT_FOUND", `City with ID ${cityId} not found`);
            }
            return result;
        } catch (error) {
            if (error instanceof ServiceError) throw error;
            throw new ServiceError(500, "CITY_DELETION_FAILED", `Failed to delete city ${cityId}`);
        }
    }

    static async getCity(cityId: number) {
        try {
            const city = await CityRepository.getCity(cityId);
            if (!city) {
                throw new ServiceError(404, "CITY_NOT_FOUND", `City with ID ${cityId} not found`);
            }
            return city;
        } catch (error) {
            if (error instanceof ServiceError) throw error;
            throw new ServiceError(500, "CITY_RETRIEVAL_FAILED", `Failed to get city ${cityId}`);
        }
    }

    static async updateCity(cityId: number, data: { name: string }) {
        try {
            const updated = await CityRepository.updateCity(cityId, data);
            if (!updated) {
                throw new ServiceError(404, "CITY_UPDATE_FAILED", `City with ID ${cityId} not found`);
            }
            return updated;
        } catch (error) {
            if (error instanceof ServiceError) throw error;
            throw new ServiceError(500, "CITY_UPDATE_ERROR", `Failed to update city ${cityId}`);
        }
    }

    static async getAllCities(filter: string) {
        try {
            return await CityRepository.getAllCities(filter);
        } catch (error) {
            throw new ServiceError(500, "CITIES_RETRIEVAL_ERROR", "Failed to retrieve cities");
        }
    }
}