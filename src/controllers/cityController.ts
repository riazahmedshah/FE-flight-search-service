import { Request, Response } from "express";
import { cityNameSchema, citySchema } from "../schemas/citySchema";
import { cityService } from "../services/exports";

export const createCity = async (req:Request, res:Response) => {
    const name = req.body.name
    const {success,error} = await citySchema.safeParseAsync(name);

    if(!success){
        console.error(error.message)
        return
    }
    try {
        await cityService.createCity(name);
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
            err: {error}
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
        return
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
