const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { response } = require("express")

const app = express()

app.set("trust proxy", 1)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser)

app.get("/", (request, response) => {
    response.send(`<h1 style='text-align: center'>LEAVE MGMT API</h1>`)
})

module.exports = app