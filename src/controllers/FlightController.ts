import { Request, Response } from "express";
import { flightSchema } from "../schemas/FlightSchema";
import { ResponseHandler } from "../utils/ResponseHandler";
import { FlightService } from "../services/FlightService";

export const createFlight = async (req:Request, res:Response) => {
    const body = req.body;
    const {success,data,error} = flightSchema.safeParse(body);
    if(!success){
        return ResponseHandler.zodError(res,error.errors)
    }
    try {
        const newFlight = await FlightService.createFlight(data);
        return ResponseHandler.created(res,{newFlight}) 
    } catch (error) {
        return ResponseHandler.json(res,{
            success:false,
            message:"ERROR_IN_DCREATING_FLIGHT",
        },500)
    }
}