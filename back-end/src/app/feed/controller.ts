import { ErrorType } from 'errors'
import express, { raw } from 'express'

import Admin from 'models/admin.model'
import Feed from 'models/feed.model'
import { Op } from 'sequelize/types'
import getErrorMessage from 'utils/errors'
import { searchWithKeyword } from '../../elasticsearch'

export const createFeed = async (req: express.Request, res: express.Response) => {
    
    const { title, content } = req.body
    const writter:any = req.user
    let flag = false
    
    
    let feed
    try {
        feed = await Feed.create({
            title,content,writterId: writter._id
        })
        flag = true
    } catch (err) {
        console.log(err)
    }
    if(flag) {
        return res.json(feed)
    } else {
        return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError))
    }
}

export const searchFeed = async (req: express.Request, res: express.Response) => {
    const keyword: any = req.query.search // type : string 

    const result = await searchWithKeyword(keyword)
    
    if( result === null) {
        console.log("error occured")
        return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError))
    } else {
        return res.json(result.body)
    }
}

export const browseFeed = async (req: express.Request, res: express.Response) => {
    const { id } = req.params
    let feed
    try {
        feed = await Feed.findOne({
            where: {_id: id},
            raw: true,
            include: [
                { 
                    model: Admin,
                    attributes: ["username","email"],
                    required: true
                }
            ]
        })
    } catch (err ) {
        console.log(err)
        return res.status(500).json(getErrorMessage(ErrorType.UnexpectedError))
    }
    if ( feed !== null ) { 
        return res.json(feed)
    } else {
        return res.status(400).json(getErrorMessage(ErrorType.NotExist))
    } 
}