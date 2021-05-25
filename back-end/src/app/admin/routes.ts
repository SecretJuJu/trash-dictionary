import express from 'express'
import { body } from "express-validator"
import { validationResultChecker } from 'middlewares'
import { register, login } from './controller'
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

const loginValidator = [
    body("email")
        .notEmpty().isEmail(),
    body("password")
        .notEmpty().isString(),
    validationResultChecker
]

router.post('/register', registerValidator, register)
router.post('/login',loginValidator, login)


export default router