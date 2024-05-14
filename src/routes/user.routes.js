const express = require('express')
const assert = require('assert')
const chai = require('chai')
chai.should()
const router = express.Router()
const userController = require('../controllers/user.controller')

// Tijdelijke functie om niet bestaande routes op te vangen
const notFound = (req, res, next) => {
    res.status(404).json({
        status: 404,
        message: 'Route not found user',
        data: {}
    })
}

// Input validation functions for user routes
const validateUserCreate = (req, res, next) => {
    if (!req.body.emailAdress || !req.body.firstName || !req.body.lastName) {
        return res.status(400).json({
            status: 400,
            message: 'Missing email or password',
            data: {}
        })
    }
    next()
}



const validateUserCreateChaiExpect = (req, res, next) => {
    try {
        assert(req.body.firstName, 'Missing or incorrect firstName field')
        chai.expect(req.body.firstName).to.not.be.empty
        chai.expect(req.body.firstName).to.be.a('string')
        chai.expect(req.body.firstName).to.match(
            /^[a-zA-Z]+$/,
            'Missing or incorrect firstName field'
        )
        chai.expect(req.body.emailAdress).to.be.a('string')
        chai.expect(req.body.emailAdress).to.match(
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            'Invalid email address'
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

// Userroutes
router.post('/api/users', validateUserCreateChaiExpect, userController.create)
router.get('/api/users', userController.getAll)
router.get('/api/users/:userId', userController.getById)
//update route hieronder
router.put('/api/users/:userId', validateUserCreateChaiExpect, userController.update)
router.delete('/api/users/:userId', userController.delete)


module.exports = router
