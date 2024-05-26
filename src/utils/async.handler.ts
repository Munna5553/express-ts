import { Request, Response, NextFunction } from "express"

export const asyncHandler = (reqHandler: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        return Promise.resolve(reqHandler(req, res, next)).catch(next)
    }
}