import { Request, Response } from "express";
import { cityNameSchema, citySchema } from "../schemas/citySchema";
import { CityService } from "../services/exports";
import { ResponseHandler } from "../utils/ResponseHandler";

export const createCity = async (req:Request, res:Response) => {
    const name = req.body
    const {success,data,error} = await citySchema.safeParseAsync(name);

    if(!success){
        return ResponseHandler.zodError(res, error.errors)
    }
    try {
        const newCity = await CityService.createCity(data.name);
        return ResponseHandler.created(res, {
            newCity
        })
    } catch (error) {
        return ResponseHandler.json(res, {
            success:false,
            message:"ERROR_IN_CREATING_CITY"
        },500)
    }
}

export const getCity = async (req:Request, res:Response) => {
    const id = Number(req.params.id)
    try {
        const city = await CityService.getCity(id)
        return ResponseHandler.json(res, {city})
    } catch (error) {
        console.error(error)
        return ResponseHandler.json(res, {
            success:false,
            message:"ERROR_IN_FETCHING_CITY_DATA",
        },500)
    }
}

export const deleteCity = async (req:Request, res:Response) => {
    const id = Number(req.params.id)
    try {
        await CityService.deleteCity(id)
        return ResponseHandler.json(res)
    } catch (error) {
        console.error(error)
        return ResponseHandler.json(res, {
            success:false,
            message:"ERROR_IN_DELETING_CITY",
        },500)
    }
}

export const updateCity = async (req:Request, res:Response) => {
    const id = Number(req.params.id)
    const name = req.body
    const {success,error} = cityNameSchema.safeParse(name);

    if(!success){
        console.error(error.message)
        return ResponseHandler.zodError(res, error.errors)
    }

    try {
        const updatedCity = await CityService.updateCity(id, name)
        return ResponseHandler.json(res, updatedCity)
    } catch (error) {
        console.error(error)
        return ResponseHandler.json(res, {
            success:false,
            message:"ERROR_IN_UPDATING_CITY"
        },500)
    }
}

export const getAllCities = async (req:Request, res:Response) => {
    const filter = req.query.filter as string
    try {
        const citiesData = await CityService.getAllCities(filter);
        return ResponseHandler.json(res, citiesData)
    } catch (error) {
        console.error(error)
        return ResponseHandler.json(res, {
            success:false,
            message:"ERROR_IN_GETTING_ALL_CITY"
        },500)
    }
}

