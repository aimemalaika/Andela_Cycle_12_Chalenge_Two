import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';
import mochadata from '../mockdata/tokens';
chai.use(chaiHttp);
const should = chai.should();
const { expect } = chai;

describe('Test users auth', () => {
  describe('Test signup', () => {
    it('user should signup', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(mochadata.signupUser)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body.message).to.equal('User created successfully');
        });
      done();
    });
    it('user should signup with all info required', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(mochadata.requiredinfo)
        .end((err, res) => {
          res.should.have.status(400);
        });
      done();
    });
    it('user names should only be text', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(mochadata.validatetex)
        .end((err, res) => {
          res.should.have.status(400);
        });
      done();
    });
    it('user input should should respect string lenght', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(mochadata.lengthrequired)
        .end((err, res) => {
          res.should.have.status(400);
        });
      done();
    });
    it('user should signup without an email', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(mochadata.noemailsignup)
        .end((err, res) => {
          res.should.have.status(400);
        });
      done();
    });
    it('should not duplicate a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(mochadata.signupUser)
        .end((error, res) => {
          res.body.status.should.be.equal(409);
          done();
        });
    });
  });
});
