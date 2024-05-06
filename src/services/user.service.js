const database = require('../dao/inmem-db')

const userService = {
    create: (user, callback) => {
        database.add(user, (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, {
                    status: 201,
                    message: `User created with id ${data.id}.`,
                    data: data
                })
            }
        })
    },

    getAll: (callback) => {
        database.getAll((err, data) => {
            if (err) {
                callback(err, null)
            } else {
                console.log(data)
                callback(null, {
                    status: 200,
                    message: `Found ${data.length} users.`,
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
                    message: `User found with id ${id}.`,
                    data: data
                });
            }
        });
    },
    update: (id, user, callback) => {
        database.update(id, user, (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, {
                    status: 200,
                    message: `User with id ${id} updated.`,
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
                    message: `User with id ${id} deleted.`,
                    data: data
                })
            }
        })
    }
}

module.exports = userService
