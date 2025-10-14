import type {Request, Response, NextFunction} from "express"

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack)
    if(err.name === "ValidationError"){
        return res.status(400).json({error: err.message})
    }
    res.status(500).json({message:err.message || "Internal Server Error"})
}

