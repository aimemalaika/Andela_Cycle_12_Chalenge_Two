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
          expect(res.body.error).to.equal('user already exist in the system');
          res.body.status.should.be.equal(409);
          done();
        });
    });
    it('user should require user to confirm pasword and compare', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(mochadata.passworddontmatch)
        .end((err, res) => {
          res.should.have.status(400);
        });
      done();
    });
    it('user password should at least conatain one catpal letter, one small letter, one number and hahe a size of at least 6 character', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(mochadata.badpassword)
        .end((err, res) => {
          res.should.have.status(400);
        });
      done();
    });
    it('Should login a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(mochadata.loginuser)
        .end((error, res) => {
          res.body.status.should.be.equal(200);
          done();
        });
    });
    it('Should not login non existing user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(mochadata.unregistreduser)
        .end((error, res) => {
          res.body.status.should.be.equal(409);
          expect(res.body.error).to.equal('invalid email address');
          done();
        });
    });
    it('Should reject incorect password', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(mochadata.incorrectpassword)
        .end((error, res) => {
          res.body.status.should.be.equal(401);
          expect(res.body.message).to.equal('user password incorrect');
          done();
        });
    });
    it('Should allow user to update password', (done) => {
      chai.request(app)
        .patch('/api/v1/auth/updatepassword')
        .set('Authorization', mochadata.user1token)
        .send(mochadata.updatePassword)
        .end((error, res) => {
          res.body.status.should.be.equal(201);
          expect(res.body.message).to.equal('Password Updated');
          done();
        });
    });
    it('Should not allow user to update password without login token', (done) => {
      chai.request(app)
        .patch('/api/v1/auth/updatepassword')
        .send(mochadata.updatePassword)
        .end((error, res) => {
          res.body.status.should.be.equal(401);
          done();
        });
    });
    it('Should not allow user to update password without valid token', (done) => {
      chai.request(app)
        .patch('/api/v1/auth/updatepassword')
        .set('Authorization', mochadata.invalidToken)
        .send(mochadata.updatePassword)
        .end((error, res) => {
          res.body.status.should.be.equal(401);
          done();
        });
    });
    it('should allow a user to update profile', (done) => {
      chai.request(app)
        .patch('/api/v1/auth/profile')
        .send(mochadata.userUpdateprofile)
        .set('Authorization', mochadata.user1token)
        .end((error, res) => {
          expect(res.body.message).to.equal('Profile updated');
          res.body.status.should.be.equal(201);
          done();
        });
    });
  });
});
