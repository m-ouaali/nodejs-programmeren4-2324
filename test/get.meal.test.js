const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index'); // Your Express app

chai.should();
chai.use(chaiHttp);

describe('UC305-3 maaltijdId bestaat niet', () => {
    it('UC305-3 maaltijdId bestaat niet', (done) => {
        chai.request(server)
            .get(`/api/meal/2000`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql(404);
                res.body.should.have.property('message').eql('Meal not found');
                done();
            });
    });
});