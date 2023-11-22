const express = require("express")
const app = express()
const user = require("../routes/users")
const fruit = require("../routes/fruits")

app.use(express.json())
app.use("/users", user)
app.use("/fruits", fruit)

module.exports = app;