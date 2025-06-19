import { z } from "zod"
import { CityRepository } from "../repositories/exports"

export const cityNameSchema = z.string().min(3, "City should contain atleast 3 characters")

export const citySchema = z.object({
    name: cityNameSchema.refine(async(name) => {
        const doesCityExist = await CityRepository.findCityByCityName(name);

        return !doesCityExist
    }, "CITY_ALREADY_EXISTS")
})