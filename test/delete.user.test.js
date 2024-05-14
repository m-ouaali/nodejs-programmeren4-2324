const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.should();
chai.use(chaiHttp);

describe('TC 205', () => {
    let userId;

    before((done) => {
        // Create a user before running the tests
        chai.request(server)
            .post('/api/users')
            .send({
            "firstName": "Test",
            "lastName": 'Persoon',
            "isActive": 1,
            "emailAdress": "testmail@mail.com",
            "password": "secret",
            "phoneNumber": "06 87654321",
            "roles": "guest",
            "street": "Main Street",
            "city": "Amsterdam"
            })
            .end((err, res) => {
                userId = res.body.data.insertId;
                done();
            });
    });

    it('TC205 gebruikersId bestaat niet', (done) => {
        chai.request(server)
            .delete(`/api/users/1000`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('status').equals(404);
                done();
            });
    });

    it('TC205 gebruiker succesvol verwijderd', (done) => {
        chai.request(server)
            .delete(`/api/users/${userId}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').equals(200);
                done();
            });
    });
});