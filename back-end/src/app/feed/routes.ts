import express from 'express';
import { body, query } from 'express-validator';
import { validationResultChecker } from 'middlewares';
import passport from 'passport';

import {browseFeed, createFeed,searchFeed} from './controller'

const router = express.Router();

const tokenCheckMiddleware = [
    passport.authenticate("jwt", { session: false })
]

const createFeedValidator = [
    body("title")
        .notEmpty().isString(),
    body("content").isString(),
    validationResultChecker
]

const searchFeedValidator = [
    query("search")
        .notEmpty().isString(),
    validationResultChecker
]

router.post('/createFeed',tokenCheckMiddleware,createFeedValidator,createFeed)
router.get('/searchFeed',searchFeedValidator,searchFeed)
router.get('/browse/:id',browseFeed)
export default router