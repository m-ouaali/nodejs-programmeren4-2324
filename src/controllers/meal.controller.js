const mealService = require('../services/meal.service')
const logger = require('../util/logger')

let mealController = {
    create: (req, res, next) => {
        logger.info('create meal')
        logger.trace('create meal', req.body)
        const meal = req.body
        mealService.create(meal, (error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {}
                })
            }
            if (success) {
                res.status(200).json({
                    status: success.status,
                    message: success.message,
                    data: success.data
                })
            }
        })
    },

    getAll: (req, res, next) => {
        logger.trace('getAll')
        mealService.getAll((error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {}
                })
            }
            if (success) {
                res.status(200).json({
                    status: 200,
                    message: success.message,
                    data: success.data
                })
            }
        })
    },

    getById: (req, res, next) => {
        const mealId = req.params.mealId
        logger.trace('mealController: getById', mealId)
        mealService.getById(mealId, (error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {}
                })
            }
            if (success && success.data && success.data.length > 0) {
                res.status(200).json({
                    status: 200,
                    message: success.message,
                    data: success.data
                })
            } else {
                res.status(404).json({
                    status: 404,
                    message: 'Meal not found',
                    data: {}
                })
            }
        })
    },

    update: (req, res, next) => {
        const mealId = req.params.mealId
        const meal = req.body
        mealService.update(mealId, meal, (error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {}
                })
            }
            if (success) {
                res.status(200).json({
                    status: success.status,
                    message: success.message,
                    data: success.data
                })
            }
        })
    },

    delete: (req, res, next) => {
        const mealId = req.params.mealId
        mealService.delete(mealId, (error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {}
                })
            }
            if (success) {
                if (success.data && success.data.affectedRows === 0) {
                    // No rows were affected, so the meal with the provided ID does not exist
                    res.status(404).json({
                        status: 404,
                        message: 'Meal not found',
                        data: {}
                    })
                } else {
                    // A row was affected, so the meal with the provided ID did exist and was successfully deleted
                    res.status(200).json({
                        status: 200,
                        message: 'Meal successfully deleted',
                        data: success.data
                    })
                }
            }
        })
    }
}


module.exports = mealController
