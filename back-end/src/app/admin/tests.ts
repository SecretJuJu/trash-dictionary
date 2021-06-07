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
            truncate: true,
            cascade: true
        })
    })

    describe("Register", () => {
        describe("Success Cases", async () => {
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
                    console.log("===== Normal Register failed ======")
                    console.log(response.body)
                    assert(false)
                }
            })
        })
        describe("Error Cases", async () => {
            it("not valid email",async ()=>{
                const response = await request(app)
                .post("/api/admin/register")
                .send({
                    username: username,
                    email: "dev.tmdq@@@@gmail.com",
                    password: password,
                    secretCode: secretCode
                })
                const { errorType } = JSON.parse(response.text)
                assert.strictEqual(errorType, ErrorType.ValidationError)
            })
            it("not strong password",async ()=>{
                const response = await request(app)
                .post("/api/admin/register")
                .send({
                    username: username,
                    email: email,
                    password: "imnotstrongpassword",
                    secretCode: secretCode
                })
                const { errorType } = JSON.parse(response.text)
                assert.strictEqual(errorType, ErrorType.ValidationError)
            })
            it("already exist user",async ()=>{
                const response = await request(app)
                .post("/api/admin/register")
                .send({
                    username: username,
                    email: email,
                    password: password,
                    secretCode: secretCode
                })
                const { errorType } = JSON.parse(response.text)
                assert.strictEqual(errorType, ErrorType.UsernameExist)
            })
        })
    })
    describe("Login", () => {
        describe("Success Cases", async () => {
            it("Normal Login",async () => {
                const response = await request(app)
                .post("/api/admin/auth")
                .send({
                    email: email,
                    password: password
                })
    
                if (response.body.token && response.body.admin.email === email) {
                    assert(true)
                } else {
                    console.log("===== Normal login failed ======")
                    console.log(response.body)
                    assert(false)
                }
            })
        })
        describe("Error Cases", async () => {
            it("without password",async () => {
                const response = await request(app)
                .post("/api/admin/auth")
                .send({
                    username: username,
                    email: email
                })
                const { errorType } = JSON.parse(response.text)
                assert.strictEqual(errorType, ErrorType.ValidationError)
            })
            it("wrong password",async () => {
                const response = await request(app)
                .post("/api/admin/auth")
                .send({
                    email: email,
                    password: password+"11"
                })
                const { errorType } = JSON.parse(response.text)
                assert.strictEqual(errorType, ErrorType.LoginFailed)
            })
            it("wrong email",async () => {
                const response = await request(app)
                .post("/api/admin/auth")
                .send({
                    email: "aa"+email,
                    password: password
                })
                const { errorType } = JSON.parse(response.text)
                assert.strictEqual(errorType, ErrorType.LoginFailed)
            })
        })
    })
    after(async () => {
        await Admin.destroy({
            where: {},
            truncate: true,
            cascade: true
        })
    })
})