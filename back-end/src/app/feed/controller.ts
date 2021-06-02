import { ErrorType } from 'errors'
import express from 'express'

import Admin from 'models/admin.model'
import Feed from 'models/feed.model'
import { Op } from 'sequelize/types'
import getErrorMessage from 'utils/errors'


export const createFeed = async (req: express.Request, res: express.Response) => {
    
    const { title, tags, content } = req.body
    const writter:any = req.user
    let flag = false
    
    for (let i=0; i<tags.length; i++) {
        let newTag = tags[i].split(' ')
        newTag = newTag.filter( (x: string) => x!=='')
        newTag = newTag.join('_')
        tags[i] = newTag
    }
    
    
    let feed
    try {
        feed = await Feed.create({
            title,tags,content,writterId: writter._id
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
    const search: any = req.query.search
    
    const queries: Array<string> = search.split(' ')
    res.send("testing")
    // try {
    //     await Feed.findAll({
    //         where: {
    //             tags: {
    //                 [Op.overlap]: queries,
    //             },
    //         },
    //         raw: true
    //     })
    // } catch (err) {

    // }
}