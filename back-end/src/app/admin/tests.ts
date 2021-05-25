import assert from "assert"
import request from "supertest"
import app from "app"
import Admin from "models/admin.model"

import { ErrorType } from "errors"
import env from "config/env"
import { sync } from "models"

const username = "testaccount"
const email = "dev.tmdqh@gmail.com"
const password = "Testpassword12@@"
const secretCode = "secretjuju"

describe("Admin", async function () {
    before(async function () {
        sync()
        await Admin.destroy({
            where: {},
            truncate: true
        })
    })

    describe("Register", function () {
        it("Normal Register",async ()=>{
            const response = await request(app)
            .post("/api/admin/register")
            .send({
                username: username,
                email: email,
                password: password,
                secretCode: secretCode
            })

            if (response.body.result) {
                assert(true)
            } else {
                console.log("Normal Register failed")
                console.log(response.body)
                assert(false)
            }
        })
    })

    after(async function () {
        await Admin.destroy({
            where: {},
            truncate: true
        })
    })
})