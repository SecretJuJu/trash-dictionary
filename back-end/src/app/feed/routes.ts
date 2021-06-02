import express from 'express';
import { body, query } from 'express-validator';
import { validationResultChecker } from 'middlewares';
import passport from 'passport';

import {createFeed,searchFeed} from './controller'

const router = express.Router();

const tokenCheckMiddleware = [
    passport.authenticate("jwt", { session: false })
]

const createFeedValidator = [
    body("title")
        .notEmpty().isString(),
    body("tags")
        .notEmpty().isArray()
        .custom(value => value.every((x: string) => typeof x === "string")),
    body("content").isObject(),
    validationResultChecker
]

const searchFeedValidator = [
    query("search")
        .notEmpty().isString()
]

router.post('/createFeed',tokenCheckMiddleware,createFeedValidator,createFeed)
router.get('searchFeedValidator',searchFeedValidator,searchFeed)
export default router