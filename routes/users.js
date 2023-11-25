const { Router } = require("express")
const { User } = require("../models/index")
const user = Router()
const { check, validationResult } = require("express-validator")

user.get("/", async (req, res) => {
    const allUsers = await User.findAll()
    res.json(allUsers)
})

user.get("/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id)
    res.json(user)
})

user.post("/", [
    check("name").not().isEmpty().trim(),
    check("age").not().isEmpty().trim()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.json({errors: errors.array()})
    } else {
        const user = await User.create(req.body)
        res.json(user)
    }
})

user.put("/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id)
    await user.update(req.body)
    res.json(user)
})

user.delete("/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id)
    await user.destroy()
    res.send(res.statusCode)
})

module.exports = user;