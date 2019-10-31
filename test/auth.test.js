import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';

chai.use(chaiHttp);
const should = chai.should();
const { expect } = chai;

describe('Test users auth', () => {
  describe('Test signup', () => {
    it('user should signup', (done) => {
      const user = {
        first_name: 'jhhggjh',
        last_name: 'cesar',
        email: 'aimemalaika1995@gmail.com',
        password: 'Aime1995',
        cpassword: 'Aime1995',
      };

      chai.request(app)
        .post('v1/auth/signup')
        .send(user)
        .end((err, res) => {
          console.log(err);
          console.log(res);
          expect(res.status).to.equal(201);
        });
      done();
    });
    // it('user should signup without an email', (done) => {
    //   const user = {
    //     first_name: 'jhhggjh',
    //     last_name: 'cesar',
    //     password: 'Aime1995',
    //     cpassword: 'Aime1995',
    //   };

    //   chai.request(app)
    //     .post('v1/auth/signup')
    //     .send(user)
    //     .end((err, res) => {
    //       res.should.have.status(404);
    //     });
    //   done();
    // });
    // it('user should enter password twice an equal when registering', (done) => {
    //   const user = {
    //     first_name: 'jhhggjh',
    //     last_name: 'cesar',
    //     email: 'aimemalaika1995@gmail.com',
    //     password: 'Aime1995',
    //     cpassword: 'yewryewiru',
    //   };

    //   chai.request(app)
    //     .post('v1/auth/signup')
    //     .send(user)
    //     .end((err, res) => {
    //       res.should.have.status(404);
    //     });
    //   done();
    // });

    // it('user password should at least conatain one catpal letter, one small letter, one number and hahe a size of at least 6 character', (done) => {
    //   const user = {
    //     first_name: 'jhhggjh',
    //     last_name: 'cesar',
    //     email: 'aimemalaika1995@gmail.com',
    //     password: 'aime1995',
    //     cpassword: 'aime1995',
    //   };

    //   chai.request(app)
    //     .post('v1/auth/signup')
    //     .send(user)
    //     .end((err, res) => {
    //       res.should.have.status(404);
    //     });
    //   done();
    // });
  });
});
