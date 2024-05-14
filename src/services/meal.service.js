// const database = require('../dao/meal.db')
const logger = require('../util/logger')
const pool = require('../dao/meal-mysql-db')

const mealService = {
    create: (meal, callback) => {
        logger.info('create')
        pool.query('INSERT INTO meal SET ?', meal, (err, results) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, {
                    status: 201,
                    message: `meal created with id ${results.insertId}.`,
                    data: results
                })
            }
        })
    },

    getAll: (callback) => {
        logger.info('getAll')
        pool.query('SELECT * FROM meal', (err, results) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, {
                    status: 200,
                    message: `Found ${results.length} meals.`,
                    data: results
                })
            }
        })
    },
    getById: (id, callback) => {
        pool.query('SELECT * FROM meal WHERE id = ?', [id], (err, results) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, {
                    status: 200,
                    message: `Meal found with id ${id}.`,
                    data: results
                })
            }
        })
    },
    update: (id, meal, callback) => {
        pool.query('UPDATE meal SET ? WHERE id = ?', [meal, id], (err, results) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, {
                    status: 200,
                    message: `Meal with id ${id} updated.`,
                    data: results
                })
            }
        })
    },

    delete: (id, callback) => {
        pool.query('DELETE FROM meal WHERE id = ?', [id], (err, results) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, {
                    status: 200,
                    message: `Meal with id ${id} deleted.`,
                    data: results
                })
            }
        })
    }
}

module.exports = mealService
