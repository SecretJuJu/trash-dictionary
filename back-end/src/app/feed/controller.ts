import express from 'express'

import Admin from 'models/admin.model'
import Feed from 'models/feed.model'
import User from 'passport'


export const createFeed = (req: express.Request, res: express.Response) => {
    // console.log()
    // res.send("hi")
    const { title, tags, content, writterId } = req.body
    const writter:any = req.user

    console.log(writter._id)

    // res.send("asdasd")
    // TODO create feed using writter!!
}