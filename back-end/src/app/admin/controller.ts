import express from 'express'
import env from "config/env"
import { createHashedPassword } from "utils/user"
import getErrorMessage from "utils/errors"
import { ErrorType } from 'errors'
import Admin from 'models/admin.model'


export const register = async (req: express.Request, res: express.Response) => {
    const { username, email, password, secretCode } = req.body
    if ( secretCode !== env.SECRETKEYS) {
        return res.status(400).json(getErrorMessage(ErrorType.AccessDenied))
    }
    const hashedPassword = await createHashedPassword(password)
    const alreadyExist = await Admin.findOne({where: {username, email}, raw: true})
    if (alreadyExist != null) {
        if (alreadyExist?.username === username) {
            return res.status(400).json(getErrorMessage(ErrorType.UsernameExist))
        } else {
            return res.status(400).json(getErrorMessage(ErrorType.EmailExist))
        }
    }
    
    try {
        await Admin.create({
            username,email,password: hashedPassword
        })
        return res.json({result: true})
    } catch (err) {
        console.log(err)
        return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError))
    }
}
export const login = (req: express.Request, res: express.Response) => {
    
}