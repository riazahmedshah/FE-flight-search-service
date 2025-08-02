import { Response } from "express";
import { ZodIssue } from "zod";

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

    static error(res:Response, error:any){
        ResponseHandler.json(res,error,500)
    }
}