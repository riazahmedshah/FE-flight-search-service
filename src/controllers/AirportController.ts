import { Request, Response } from "express";
import { airportSchema, updateAirportSchema } from "../schemas/airportSchema";
import { ResponseHandler } from "../utils/ResponseHandler";
import { AirportService } from "../services/AirportService";

export const createAirport = async (req:Request, res:Response) => {
    const body = req.body
    const {success,data,error} = await airportSchema.safeParseAsync(body);
    if(!success){
        return ResponseHandler.zodError(res,error.errors);
    }
    try {
        const {name, address, city_id} = data;
        const newAirport = await AirportService.createAirport(name,address,city_id);
        return ResponseHandler.created(res, {newAirport});
    } catch (error) {
        return ResponseHandler.json(res, {
            success:false,
            message:"ERROR_IN_CREATING_CITY"
        },500);
    }
}

export const getAirport = async (req:Request, res:Response) => {
    const id = Number(req.params.id);
    try {
        const airport = await AirportService.getAirport(id);
        return ResponseHandler.json(res,airport)
    } catch (error) {
        return ResponseHandler.json(res, {
            success:false,
            message:"ERROR_IN_CREATING_CITY"
        },500)
    }
}

export const getAllAirports = async (req:Request, res:Response) => {
    try {
        const allAirports = await AirportService.getAllAirports();
        return ResponseHandler.json(res, allAirports);
    } catch (error) {
        return ResponseHandler.json(res, {
            success:false,
            message:"ERROR_IN_CREATING_CITY"
        },500)
    }
}

export const updateAirport = async (req:Request, res:Response) => {
    const id = Number(req.params.id)
    const {success, data, error} = updateAirportSchema.safeParse(req.body)
    if(!success){
        return ResponseHandler.zodError(res,error.errors);
    }
    try {
        const {address, name} = data
        const updatedAirport = await AirportService.updateAirport(id, name, address);
        return ResponseHandler.json(res,updatedAirport)
    } catch (error) {
        return ResponseHandler.json(res, {
            success:false,
            message:"ERROR_IN_CREATING_CITY"
        },500)
    }
}

export const deleteAirport = async (req:Request, res:Response) => {
    const id = Number(req.params.id)
    try {
        await AirportService.deleteAirport(id);
        return ResponseHandler.json(res);
    } catch (error) {
        return ResponseHandler.json(res, {
            success:false,
            message:"ERROR_IN_CREATING_CITY"
        },500)
    }
}