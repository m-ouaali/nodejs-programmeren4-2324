
const mealDatabase = {

    _data: [
        {
            id: 0,
            mealName: 'Spaghetti',
            description: 'Een verrukelijke spaghetti met tomatensaus en gehakt',
            ingredients: 'Spaghetti, tomatensaus, gehakt, kruiden',
            isVegan: 'false',
        },
        {
            id: 1,
            mealName: 'Sushi',
            description: 'Lekkere sushi met verse zalm en avocado',
            ingredients: 'Rijst, zalm, avocado, sojasaus, wasabi, gember',
            isVegan: 'false',
        }
    ],
    _index: 2,
    _delayTime: 500,

    getAll(callback) {
        setTimeout(() => {
            callback(null, this._data)
        }, this._delayTime)
    },

    getById(id, callback) {
        setTimeout(() => {
            if (id < 0 || id >= this._data.length) {
                callback({ status:404, message: `Error: id ${id} does not exist!` }, null)
            } else {
                callback(null, this._data[id])
            }
        }, this._delayTime)
    },

    add(item, callback) {
        console.log('New meal added: ', item)
        // Simuleer een asynchrone operatie
        setTimeout(() => {
                // Voeg een id toe en voeg het item toe aan de database
                item.id = this._index++
                // Voeg item toe aan de array
                this._data.push(item)
                // Roep de callback aan het einde van de operatie
                // met het toegevoegde item als argument, of null als er een fout is opgetreden
                callback(null, item)
        }, this._delayTime)
    },


    update: function(id, updatedFields, callback) {
        setTimeout(() => {
            const index = this._data.findIndex(data => data.id === Number(id));
            if (index === -1) {
                callback({ status:400, message: 'Error: Meal not found!' }, null);
                return;
            }
            // Update de meal met het gegeven ID met de geupdate velden
            this._data[index] = { ...this._data[index], ...updatedFields };
            callback(null, this._data[index]);
        }, this._delayTime);
    },

    delete: function(id, callback) {
        setTimeout(() => {
            const index = this._data.findIndex(data => data.id === Number(id));
            if (index === -1) {
                callback({ status:404, message: 'Error: Meal not found!' }, null)
                return
            }
            const deletedData = this._data.splice(index, 1);
            callback(null, deletedData[0])
        }, this._delayTime)
    }
}

module.exports = mealDatabase
// module.exports = database.index;
