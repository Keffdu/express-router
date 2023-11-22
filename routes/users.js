const { Router } = require("express")
const { User } = require("../models/index")
const user = Router()

user.get("/", async (req, res) => {
    const allUsers = await User.findAll()
    res.json(allUsers)
})

user.get("/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id)
    res.json(user)
})

user.post("/", async (req, res, next) => {
    try {
    const user = await User.create(req.body)
    res.json(user)
    } catch (error) {
        next(error)
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