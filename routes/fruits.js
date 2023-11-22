const { Router } = require("express")
const { Fruit } = require("../models/index")
const fruit = Router()

fruit.get("/", async (req, res) => {
    const allFruits = await Fruit.findAll()
    res.json(allFruits)
})

fruit.get("/:id", async (req, res) => {
    const fruit = await Fruit.findByPk(req.params.id)
    res.json(fruit)
})

fruit.post("/", async (req, res, next) => {
    try {
    const fruit = await Fruit.create(req.body)
    res.json(fruit)
    } catch (error) {
        next(error)
    }
})

fruit.put("/:id", async (req, res) => {
    const fruit = await Fruit.findByPk(req.params.id)
    await fruit.update(req.body)
    res.json(fruit)
})

fruit.delete("/:id", async (req, res) => {
    const fruit = await Fruit.findByPk(req.params.id)
    await fruit.destroy()
    res.send(res.statusCode)
})

module.exports = fruit;