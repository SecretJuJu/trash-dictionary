import dotenv from "dotenv"

import express from "express"
import { ErrorType, errorMessages } from "errors"
import { sync } from "models"
// import esClient from 'lib/elasticsearch'
import env from "config/env"

import app from "app"


dotenv.config()

const PORT = process.env.PORT || 8080

app.get("/custom-errors", (req: express.Request, res: express.Response) => {
    res.json({
        errorTypes: ErrorType,
        errorMessages: errorMessages,
    })
})

app.listen(PORT, () => {
    sync()
    // if(esClient) {
    //     console.log("make elasticsearch client success")
    // }
    console.log('Server listening on port ' +PORT)
})
