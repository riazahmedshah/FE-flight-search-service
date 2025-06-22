import { Request, Response } from "express";
import { flighFilterSchema, flightSchema } from "../schemas/FlightSchema";
import { ResponseHandler } from "../utils/ResponseHandler";
import { FlightService } from "../services/FlightService";

export const createFlight = async (req:Request, res:Response) => {
    const body = req.body;
    const {success,data,error} = await flightSchema.safeParseAsync(body);
    if(!success){
        return ResponseHandler.zodError(res,error.errors)
    }
    try {
        const newFlight = await FlightService.createFlight(data);
        return ResponseHandler.created(res,{newFlight}) 
    } catch (error) {
        return ResponseHandler.json(res,{
            success:false,
            message:"ERROR_IN_CREATING_FLIGHT",
        },500)
    }
}

export const getAllFlights = async (req:Request, res:Response) => {
    const query = req.query
    const {success,data,error} = flighFilterSchema.safeParse(query);
    if(!success){
        return ResponseHandler.zodError(res, error.errors)
    }
    try {
        const result = await FlightService.getAllFlights(data)
        return ResponseHandler.json(res, result)
    } catch (error) {
        return ResponseHandler.json(res,{
            success:false,
            message:"ERROR_IN_CREATING_FLIGHT",
        },500)
    }
}

export const deleteFlight = async (req:Request, res:Response) => {
    const id = Number(req.params.id);
    try {
        await FlightService.deleteFlight(id)
        return ResponseHandler.json(res)
    } catch (error) {
        return ResponseHandler.json(res,{
            success:false,
            message:"ERROR_IN_CREATING_FLIGHT",
        },500)
    }
}