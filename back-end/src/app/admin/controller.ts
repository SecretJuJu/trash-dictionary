import express from 'express'
import env from "config/env"
import { createHashedPassword } from "utils/user"
import getErrorMessage from "utils/errors"
import { ErrorType } from 'errors'
import Admin from 'models/admin.model'
import passport from 'passport'
import * as jwt from 'jsonwebtoken'
import { Op } from 'sequelize'

export const register = async (req: express.Request, res: express.Response) => {
    const { username, email, password, secretCode } = req.body
    if ( secretCode !== env.SECRETKEYS) {
        return res.status(400).json(getErrorMessage(ErrorType.AccessDenied))
    }
    const hashedPassword = await createHashedPassword(password)
    try {
        const alreadyExist = await Admin.findOne({where: {
            [Op.or]: [{ username }, { email }]
        }, raw: true})
        if (alreadyExist != null) {
            if (alreadyExist?.username === username) {
                return res.status(400).json(getErrorMessage(ErrorType.UsernameExist))
            } else {
                return res.status(400).json(getErrorMessage(ErrorType.EmailExist))
            }
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError))
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
export const auth = (req: express.Request, res: express.Response) => {
    const authCallback = (err: any, admin: string | object) => {
        if (err || !admin) {
            const errorMessage = getErrorMessage(ErrorType.LoginFailed)
            const response = {
                errorType: errorMessage.errorType,
                msg: errorMessage.msg,
            }
            return res.status(400).json(response).send()
        }
        
        req.login(admin, { session: false }, (err) => {
            if (err) {
                const errorMessage = getErrorMessage(ErrorType.LoginFailed)
                const response = {
                    errorType: errorMessage.errorType,
                    msg: errorMessage.msg,
                    details: err,
                }
                return res.status(400).json(response).send()
            }
            const token = jwt.sign(admin, env.JWT_SECRET)
            return res.json({ admin, token }).send()
        })
    }
    const auth = passport.authenticate(
        "local",
        { session: false },
        authCallback
    )
    auth(req, res)
}
