import { Response } from "express";
import { ZodIssue } from "zod";
import { ServiceError } from "./error/ServiceError";

export class ResponseHandler{
    static json(res:Response, data?:Record<string, any>, status = 200){
        if(data) {
            res.status(status).json(data)
        } else {
            res.status(status).send()
        }
    }

    static created(res: Response, data: Record<string, unknown>) {
        ResponseHandler.json(res, data, 201)
    }

    static zodError = (res: Response, issues: ZodIssue[]) => {
        const errors = issues.reduce((acc: Record<string, string>, issue) => {
            const key = issue.path.join('.')

            acc[key] = issue.message

            return acc
        }, {})

        res.status(400).json({ errors })
    }

    static error(res:Response, error:unknown){
        if(error instanceof ServiceError){
            const responseData = {
                error: error.name,
                message: error.message,
                details: error.details
            }
            ResponseHandler.json(res, responseData, error.statusCode);
        } else{
            ResponseHandler.json(res,{
                error: "INTERNAL_SERVER_ERROR",
                message: "An unexpected error occurred"
            },500);
        }
    }
}