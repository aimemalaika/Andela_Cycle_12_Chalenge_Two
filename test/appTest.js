import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';

chai.use(chaiHttp);
const should = chai.should();
const { expect } = chai;

describe('Test app.js', () => {
  describe('Test welcome route', () => {
    it('path not found', (done) => {
      chai.request(app)
        .get('/you')
        .end((err, res) => {
          res.should.have.status(404);
        });
      done();
    });
  });
});
