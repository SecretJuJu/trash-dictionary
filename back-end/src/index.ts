import dotenv from "dotenv"

import express from "express"
import { ErrorType, errorMessages } from "errors"
import { sync } from "models"
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
    console.log('Server listening on port ' +PORT)
})
