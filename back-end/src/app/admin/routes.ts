import express from 'express'
import { body, query } from "express-validator"
import { validationResultChecker } from 'middlewares'
import { register, auth } from './controller'
import passport from 'passport'

const router = express.Router()

const registerValidator = [
    body("username")
        .notEmpty().isString(),
    body("email")
        .notEmpty().isEmail(),
    body("password")
        .notEmpty().isStrongPassword(),
    body("secretCode")
        .notEmpty().isString(),
    validationResultChecker
]

const authValidator = [
    body("email")
        .notEmpty().isEmail(),
    body("password")
        .notEmpty().isString(),
    validationResultChecker
]

const tokenCheckMiddleware = [
    passport.authenticate("jwt", { session: false })
]

router.post('/register', registerValidator, register)
router.post('/auth',authValidator, auth)
router.get('/tokenCheck',tokenCheckMiddleware, (req:express.Request, res:express.Response) => {
    return res.json({result: true})
})

export default router