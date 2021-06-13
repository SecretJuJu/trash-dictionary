import express from "express"
import bodyParser from "body-parser"
import routes from "routes"
import setPassport from "config/passport"
import passport from "passport"
import cors from 'cors'

setPassport()

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(express.json({
    limit : "50mb"
}))
app.use(express.urlencoded({ limit:"50mb", extended: false }));
app.use("", routes)

export default app
