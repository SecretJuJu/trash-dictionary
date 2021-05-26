import express from 'express'
import { body } from "express-validator"
import { validationResultChecker } from 'middlewares'
import { register, auth } from './controller'
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

router.post('/register', registerValidator, register)
router.post('/auth',authValidator, auth)


export default router