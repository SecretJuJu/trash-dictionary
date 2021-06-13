import express from "express"
import routes from "routes"
import setPassport from "config/passport"
import passport from "passport"
import cors from 'cors'

setPassport()

const app = express()

app.use(cors())
app.use(express.json({limit: "5mb"}))
app.use(passport.initialize())
app.use("", routes)

export default app
