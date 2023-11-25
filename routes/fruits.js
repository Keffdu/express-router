const { Router } = require("express")
const { Fruit } = require("../models/index")
const fruit = Router()
const { check, validationResult } = require("express-validator")

fruit.get("/", async (req, res) => {
    const allFruits = await Fruit.findAll()
    res.json(allFruits)
})

fruit.get("/:id", async (req, res) => {
    const fruit = await Fruit.findByPk(req.params.id)
    res.json(fruit)
})

fruit.post("/", [
    check("name").not().isEmpty().trim(),
    check("color").not().isEmpty().trim()
], async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.json({errors: errors.array()})
    } else {
        const fruit = await Fruit.create(req.body)
        res.json(fruit)
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