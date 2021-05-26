import passport from "passport"
import { Strategy as JWTStrategy, ExtractJwt as ExtractJWT } from "passport-jwt"
import { Strategy as LocalStrategy } from "passport-local"

import Admin from "models/admin.model"
import env from "config/env"
import { checkPassword } from "utils/user"

interface IjwtPayload {
    _id: string
    email: string
    username: string
}

const strategies = () => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
            },
            async (email, password, done) => {
                // find user
                let admin = await Admin.findOne({ where : {email}, raw: true})
                if (!admin) {
                    return done(null, false)
                }

                const isPasswordCorrect = checkPassword(password, admin.password)
                if (!isPasswordCorrect) {
                    return done(null, false)
                }

                const responseAdmin = {
                    _id: admin._id,
                    email: admin.email,
                    username: admin.username,
                }

                return done(null, responseAdmin)
            }
        )
    )

    passport.use(
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
                secretOrKey: env.JWT_SECRET,
            },
            async (jwtPayload: IjwtPayload, done) => {
                let admin = await Admin.findOne({ where : {_id: jwtPayload._id }, raw: true})
                if (!admin) {
                    return done(null, false)
                }

                const responseAdmin = {
                    _id: admin._id,
                    email: admin.email,
                    username: admin.username,
                }

                return done(null, responseAdmin)
            }
        )
    )
}

export default strategies