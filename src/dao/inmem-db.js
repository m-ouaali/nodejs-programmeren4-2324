//
// Onze lokale 'in memory database'.
// We simuleren een asynchrone database met een array van objecten.
// De array bevat een aantal dummy records.
// De database heeft twee methoden: get en add.
// Opdracht: Voeg de overige methoden toe.
//
const database = {
    // het array met dummy records. Dit is de 'database'.
    _data: [
        {
            id: 0,
            firstName: 'Hendrik',
            lastName: 'van Dam',
            emailAdress: 'hvd@server.nl'
            // Hier de overige velden uit het functioneel ontwerp
        },
        {
            id: 1,
            firstName: 'Marieke',
            lastName: 'Jansen',
            emailAdress: 'm@server.nl'
            // Hier de overige velden uit het functioneel ontwerp
        }
    ],

    // Ieder nieuw item in db krijgt 'autoincrement' index.
    // Je moet die wel zelf toevoegen aan ieder nieuw item.
    _index: 2,
    _delayTime: 500,

    getAll(callback) {
        // Simuleer een asynchrone operatie
        setTimeout(() => {
            // Roep de callback aan, en retourneer de data
            callback(null, this._data)
        }, this._delayTime)
    },

    getById(id, callback) {
        // Simuleer een asynchrone operatie
        setTimeout(() => {
            if (id < 0 || id >= this._data.length) {
                callback({ status:404, message: `Error: id ${id} does not exist!` }, null)
            } else {
                callback(null, this._data[id])
            }
        }, this._delayTime)
    },

    add(item, callback) {
        console.log('New person added: ', item)
        // Simuleer een asynchrone operatie
        setTimeout(() => {
            // Controleer eerst op duplicaat e-mailadressen
            this.checkDuplicateEmail(item.emailAdress, (error, duplicate) => {
                if (error) {
                    // Roep de callback aan met de foutmelding
                    callback(error, null)
                    return
                }
                if (duplicate) {
                    // Roep de callback aan met de foutmelding dat het e-mailadres al bestaat
                    callback({ status:400, message: 'Error: Email address already exists!' }, null)
                    return
                }
                // Voeg een id toe en voeg het item toe aan de database
                item.id = this._index++
                // Voeg item toe aan de array
                this._data.push(item)

                // Roep de callback aan het einde van de operatie
                // met het toegevoegde item als argument, of null als er een fout is opgetreden
                callback(null, item)
            })
        }, this._delayTime)
    },

    // Voeg zelf de overige database functionaliteit toe
    checkDuplicateEmail(email, callback) {
        // Simuleer een asynchrone operatie
        setTimeout(() => {
            // Controleert of het opgegeven e-mailadres al in de database zit
            const duplicate = this._data.some(item => item.emailAdress === email)
            // Roep de callback aan met true als er een duplicaat is gevonden, anders false
            callback(null, duplicate)
        }, this._delayTime)
    },
    update: function(id, updatedFields, callback) {
        setTimeout(() => {
            const index = this._data.findIndex(data => data.id === Number(id));
            if (index === -1) {
                callback({ status:400, message: 'Error: User not found!' }, null);
                return;
            }

            // Controleert of de email al bestaat
            const newEmail = updatedFields.emailAdress;
            const existingUser = this._data.find(user => user.emailAdress === newEmail && user.id !== Number(id));
            if (existingUser) {
                callback({ status:404, message: 'Error: Email address already exists!' }, null);
                return;
            }

            // Update de user met het gegeven ID met de geupdate velden
            this._data[index] = { ...this._data[index], ...updatedFields };
            callback(null, this._data[index]);
        }, this._delayTime);
    },

    delete: function(id, callback) {
        setTimeout(() => {
            const index = this._data.findIndex(data => data.id === Number(id));
            if (index === -1) {
                callback({ status:404, message: 'Error: User not found!' }, null)
                return
            }
            const deletedData = this._data.splice(index, 1);
            callback(null, deletedData[0])
        }, this._delayTime)
    }
}

module.exports = database
// module.exports = database.index;
