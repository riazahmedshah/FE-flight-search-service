import { Request, RequestHandler, Response } from "express";
import { cityNameSchema, citySchema } from "../schemas/citySchema";
import { cityService } from "../services/exports";
import { ResponseHandler } from "../utils/ResponseHandler";

export const createCity = async (req:Request, res:Response) => {
    const name = req.body
    const {success,data,error} = await citySchema.safeParseAsync(name);

    if(!success){
        return ResponseHandler.zodError(res, error.errors)
    }
    try {
        const newCity = await cityService.createCity(data.name);
        return ResponseHandler.created(res, {
            newCity
        })
    } catch (error) {
        return ResponseHandler.json(res, {
            success:false,
            message:"SUCCESS",
            err:{}
        },500)
    }
}

export const getCity = async (req:Request, res:Response) => {
    const id = Number(req.params.id)
    try {
        const city = await cityService.getCity(id)
        return ResponseHandler.json(res, {city})
    } catch (error) {
        console.error(error)
        return ResponseHandler.json(res, {
            success:false,
            message:"SUCCESS",
            err:{}
        },500)
    }
}

export const deleteCity = async (req:Request, res:Response) => {
    const id = Number(req.params.id)
    try {
        await cityService.deleteCity(id)
        return ResponseHandler.json(res)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"FAILURE",
            err: error
        })
    }
}

export const updateCity = async (req:Request, res:Response) => {
    const id = Number(req.params.id)
    const name = req.body.name
    const {success,error} = cityNameSchema.safeParse(name);

    if(!success){
        console.error(error.message)
        return ResponseHandler.zodError(res, error.errors)
    }

    try {
        const updatedCity = await cityService.updateCity(id, name)
        return ResponseHandler.json(res, updatedCity)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"FAILURE",
            err: error
        })
    }


}

