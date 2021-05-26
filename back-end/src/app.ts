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
app.use("", routes)

export default app
