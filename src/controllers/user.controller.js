const userService = require('../services/user.service')
const logger = require('../util/logger')

let userController = {
    create: async (req, res, next) => {
        logger.info('create user')
        logger.trace('create user', req.body)

        const {emailAdress, password} = req.body;

        // Check if the password length is less than 5
        if (password.length < 5) {
            return res.status(400).json({
                status: 400,
                message: 'Invalid password password should be at least 5 characters long'
            });
        }

        try {
            // Check if a user with the same email address already exists
            userService.getByEmail(emailAdress, (error, existingUser) => {
                if (error) {
                    return next({
                        status: error.status,
                        message: error.message,
                        data: {}
                    });
                }
                if (existingUser) {
                    return res.status(403).json({
                        status: 403,
                        message: 'User already exists'
                    });
                }
                // If the user does not exist, create the user
                userService.create(req.body, (error, success) => {
                    if (error) {
                        return next({
                            status: error.status,
                            message: error.message,
                            data: {}
                        });
                    }
                    res.status(200).json({
                        status: success.status,
                        message: success.message,
                        data: success.data
                    });
                });
            });
        } catch (error) {
            return next({
                status: error.status,
                message: error.message,
                data: {}
            });
        }
    },
    getAll: (req, res, next) => {
        logger.trace('getAll')
        userService.getAll((error, success) => {
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
        const userId = req.params.userId
        logger.trace('userController: getById', userId)
        userService.getById(userId, (error, success) => {
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
                    message: 'User not found',
                    data: {}
                })
            }
        })
    },

    // Todo: Implement the update and delete methods
    update: (req, res, next) => {
        const userId = req.params.userId
        const user = req.body
        userService.update(userId, user, (error, success) => {
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
        const userId = req.params.userId
        userService.delete(userId, (error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {}
                })
            }
            if (success) {
                if (success.data && success.data.affectedRows === 0) {
                    // No rows were affected, so the user with the provided ID does not exist
                    res.status(404).json({
                        status: 404,
                        message: 'User not found',
                        data: {}
                    })
                } else {
                    // A row was affected, so the user with the provided ID did exist and was successfully deleted
                    res.status(200).json({
                        status: 200,
                        message: 'User successfully deleted',
                        data: success.data
                    })
                }
            }
        })
    }
}

module.exports = userController
