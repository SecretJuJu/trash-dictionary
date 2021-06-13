import { Request, Response } from "express"
import getErrorMessage from 'utils/errors'
import { ErrorType } from 'errors'
import path from 'path'


const isProperExtension = (fileExtension: string) => {
    const acceptableExtensions = [".jpg", ".jpeg", ".png"]
    return acceptableExtensions.includes(fileExtension)
}

const fileValidators = {
    isFile : (req: Request, _: Response, next: Function) => {
        console.log("req")
        console.log(req)
        if (req.file === undefined) {
            next(ErrorType.ValidationError)
            return
        } else {
            const filename = req.file.filename
            const fileExtension = path.extname(filename).toLowerCase()
            if (!isProperExtension(fileExtension)) {
                next(ErrorType.ValidationError)
                return
            }
        }
        next()
    },
    isFileErrorHandler: (
        err: any,
        req: Request,
        res: Response,
        _: Function
    ) => {
        if (err === ErrorType.ValidationError) {
            const errorMessage = getErrorMessage(ErrorType.ValidationError)
            const response = {
                errorType: errorMessage.errorType,
                msg: errorMessage.msg,
                details: [
                    {
                        value: req.body.img,
                        msg: "Invalid value",
                        param: "img",
                        location: "body",
                    },
                ],
            }
            res.status(400).send(response)
        }
    }
}


export default fileValidators