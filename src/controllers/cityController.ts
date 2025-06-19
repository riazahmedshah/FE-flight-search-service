import { Request, RequestHandler, Response } from "express";
import { cityNameSchema, citySchema } from "../schemas/citySchema";
import { cityService } from "../services/exports";

export const createCity = async (req:Request, res:Response) => {
    const name = req.body.name
    const Validation = await citySchema.safeParseAsync(name);

    if(!Validation.success){
        console.error(Validation.error.message)
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            err: Validation.error.message
        });
    }
    try {
        await cityService.createCity(Validation.data.name);
        return res.status(201).json({
            success:true,
            message:"SUCCESS",
            err:{}
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"FAILURE",
            err: "Internal server error"
        })
    }
}

export const deleteCity = async (req:Request, res:Response) => {
    const id = Number(req.params.id)
    try {
        await cityService.deleteCity(id)
        return res.status(200).json({
            success:true,
            message:"SUCCESS",
            err:{}
        })
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
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            err: error.message
        });
    }

    try {
        await cityService.updateCity(id, name)
        return res.status(200).json({
            success:true,
            message:"SUCCESS",
            err:{}
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"FAILURE",
            err: error
        })
    }


}

export const getCity = async (req:Request, res:Response) => {
    const id = Number(req.params.id)

    try {
        await cityService.getCity(id)
        return res.status(200).json({
            success:true,
            message:"SUCCESS",
            err:{}
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"FAILURE",
            err: error
        })
    }
}
