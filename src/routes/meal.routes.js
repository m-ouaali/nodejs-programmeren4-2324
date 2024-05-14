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
const validateMealCreate = (req, res, next) => {
    if (!req.body.mealName || !req.body.description || !req.body.ingredients) {
        return res.status(400).json({
            status: 400,
            message: 'Missing field(s)',
            data: {}
        })
    }
    next()
}

// Input validation function 2 met gebruik van assert
const validateMealCreateAssert = (req, res, next) => {
    try {
        assert(req.body.mealName, 'Missing mealName')
        assert(req.body.description, 'Missing description')
        assert(req.body.ingredients, 'Missing ingredients')
        next()
    } catch (ex) {
        return res.status(400).json({
            status: 400,
            message: ex.message,
            data: {}
        })
    }
}

// Input validation function 2 met gebruik van assert
const validateMealCreateChaiShould = (req, res, next) => {
    try {
        req.body.mealName.should.not.be.empty.and.a('string')
        req.body.description.should.not.be.empty.and.a('string')
        req.body.ingredients.should.not.be.empty.and.a('string')
        next()
    } catch (ex) {
        return res.status(400).json({
            status: 400,
            message: ex.message,
            data: {}
        })
    }
}

const validateMealCreateChaiExpect = (req, res, next) => {
    try {
        assert(req.body.mealName, 'Missing or incorrect name field')
        chai.expect(req.body.mealName).to.not.be.empty
        chai.expect(req.body.mealName).to.be.a('string')
        chai.expect(req.body.mealName).to.match(
            /^[a-zA-Z]+$/,
            'mealName must be a string'
        )
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
