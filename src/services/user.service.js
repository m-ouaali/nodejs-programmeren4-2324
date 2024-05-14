// const database = require('../dao/inmem-db')
const logger = require('../util/logger')
const pool = require('../dao/meal-mysql-db')

const userService = {
    create: (user, callback) => {
        logger.info('create user')
        pool.query('INSERT INTO user SET ?', user, (err, results) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, {
                    status: 201,
                    message: `User created with id ${results.insertId}.`,
                    data: results
                })
            }
        })
    },

    getByEmail: (email, callback) => {
        pool.query('SELECT * FROM user WHERE emailAdress = ?', [email], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results[0]);
            }
        });
    },

    getAll: (callback) => {
        logger.info('getAll')
        pool.query('SELECT * FROM user', (err, results) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, {
                    status: 200,
                    message: `Found ${results.length} users.`,
                    data: results
                })
            }
        })
    },

    getById: (id, callback) => {
        pool.query('SELECT * FROM user WHERE id = ?', [id], (err, results) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, {
                    status: 200,
                    message: `User found with id ${id}.`,
                    data: results
                })
            }
        })
    },

    update: (id, user, callback) => {
        pool.query('UPDATE user SET ? WHERE id = ?', [user, id], (err, results) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, {
                    status: 200,
                    message: `User with id ${id} updated.`,
                    data: results
                })
            }
        })
    },

    delete: (id, callback) => {
        pool.query('DELETE FROM user WHERE id = ?', [id], (err, results) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, {
                    status: 200,
                    message: `User with id ${id} deleted.`,
                    data: results
                })
            }
        })
    }
}

module.exports = userService
