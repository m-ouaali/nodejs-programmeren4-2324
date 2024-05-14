const database = require('../dao/meal.db')
const logger = require('../util/logger')

const mealService = {
    create: (meal, callback) => {
        logger.info('create meal')
        database.add(meal, (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, {
                    status: 201,
                    message: `meal created with id ${data.id}.`,
                    data: data
                })
            }
        })
    },

    getAll: (callback) => {
        logger.info('getAll')
        database.getAll((err, data) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, {
                    status: 200,
                    message: `Found ${data.length} meals.`,
                    data: data
                })
            }
        })
    },
    getById: (id, callback) => {
        database.getById(id, (err, data) => {
            if (err) {
                callback(err, null, {});
            } else {
                callback(null, {
                    status: 200,
                    message: `Meal found with id ${id}.`,
                    data: data
                });
            }
        });
    },
    update: (id, meal, callback) => {
        database.update(id, meal, (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, {
                    status: 200,
                    message: `Meal with id ${id} updated.`,
                    data: data
                })
            }
        })
    },

    delete: (id, callback) => {
        database.delete(id, (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, {
                    status: 200,
                    message: `Meal with id ${id} deleted.`,
                    data: data
                })
            }
        })
    }
}

module.exports = mealService
