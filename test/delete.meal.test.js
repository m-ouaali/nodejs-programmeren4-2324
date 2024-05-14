const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.should();
chai.use(chaiHttp);

describe('TC-305', () => {
    it('TC-305-3 maaltijdId bestaat niet', (done) => {
        chai.request(server)
            .delete(`/api/meal/1000`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql(404);
                res.body.should.have.property('message').eql('Meal not found');
                done();
            });
    });


    it('TC-305-4 maaltijd succesvol verwijderd', (done) => {
        chai.request(server)
            .delete(`/api/meal/1`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').equals(200);
                done();
            });
    });
});