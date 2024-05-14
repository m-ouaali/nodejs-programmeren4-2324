const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.should();
chai.use(chaiHttp);

describe('UC204-3 gebruikersId bestaat niet', () => {
    it('UC204-3 gebruikersId bestaat niet', (done) => {
        chai.request(server)
            .get(`/api/users/2000`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('status').equals(404);
                res.body.should.have.property('message').equals('User not found');
                done();
            });
    });
});





