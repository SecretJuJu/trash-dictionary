import express from 'express';
import { body } from 'express-validator';
import { validationResultChecker } from 'middlewares';
import passport from 'passport';

import {createFeed} from './controller'

const router = express.Router();

const tokenCheckMiddleware = [
    passport.authenticate("jwt", { session: false })
]

const createFeedValidato = [
    body("title")
        .notEmpty().isEmail(),
    body("tags")
        .notEmpty().isArray()
        .custom(value => value.every((x: string) => typeof x === "string")),
    body("content").isObject(),
    validationResultChecker
]

router.post('/createFeed',tokenCheckMiddleware,createFeed)

export default router