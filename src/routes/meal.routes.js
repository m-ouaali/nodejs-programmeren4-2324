const express = require('express')
const assert = require('assert')
const chai = require('chai')
chai.should()
const mealRouter = express.Router()
const mealController = require('../controllers/meal.controller')

// Tijdelijke functie om niet bestaande routes op te vangen
const notFound = (req, res, next) => {
    res.status(404).json({
        status: 404,
        message: 'Route not found meal',
        data: {}
    })
}
const validateMealCreateChaiExpect = (req, res, next) => {
    try {
        assert(req.body.name, 'Missing or incorrect name field')
        chai.expect(req.body.name).to.not.be.empty
        chai.expect(req.body.name).to.be.a('string')
        next()
    } catch (ex) {
        return res.status(400).json({
            status: 400,
            message: ex.message,
            data: {}
        })
    }
}

// MealRoutes
mealRouter.post('/api/meal', validateMealCreateChaiExpect, mealController.create)
mealRouter.get('/api/meal', mealController.getAll)
mealRouter.get('/api/meal/:mealId', mealController.getById)
//update route hieronder
mealRouter.put('/api/meal/:mealId', validateMealCreateChaiExpect, mealController.update)
mealRouter.delete('/api/meal/:mealId', mealController.delete)


module.exports = mealRouter
