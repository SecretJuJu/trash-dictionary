import { Request, Response } from "express"

export const uploadImage = (req: Request, res: Response) => {
    return res.status(201).send({ filename: req.file.filename })
}