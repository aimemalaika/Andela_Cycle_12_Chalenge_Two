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
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body.message).to.equal('User created successfully');
        });
      done();
    });
    it('user should signup', (done) => {
      const user = {
        first_name: 'jhhggjh',
        last_name: 'cesar',
        email: 'aimemalaika1996@gmail.com',
        password: 'Aime1995',
        cpassword: 'Aime1995',
      };

      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body.message).to.equal('User created successfully');
        });
      done();
    });
    it('user should signup with all info required', (done) => {
      const user = {
        first_name: '',
        last_name: '',
        email: 'aimemala',
        password: 'Aime1995',
        cpassword: 'Aime1995',
      };

      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
        });
      done();
    });
    it('user names should only be text', (done) => {
      const user = {
        first_name: '3123131',
        last_name: '321313123',
        email: 'aimemala@fdsfds.dsf',
        password: 'Aime1995',
        cpassword: 'Aime1995',
      };

      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
        });
      done();
    });
    it('user input should should respect min size lenght', (done) => {
      const user = {
        first_name: 'o',
        last_name: 'p',
        email: 'aimemala@fdsfds.dsf',
        password: 'Aime1995',
        cpassword: 'Aime1995',
      };

      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
        });
      done();
    });
    it('user input should should respect max size lenght', (done) => {
      const user = {
        first_name: 'oooooooooooooooooooooooooooooooooooooooooooooo',
        last_name: 'ppppppppppppppppppppppppppppppppppppppppppppppp',
        email: 'aimemala@fdsfds.dsf',
        password: 'Aime1995',
        cpassword: 'Aime1995',
      };

      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
        });
      done();
    });
    it('user should signup without an email', (done) => {
      const user = {
        first_name: 'jhhggjh',
        last_name: 'cesar',
        password: 'Aime1995',
        cpassword: 'Aime1995',
      };

      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
        });
      done();
    });
    it('should not duplicate a user', (done) => {
      const user = {
        first_name: 'jhhggjh',
        last_name: 'cesar',
        email: 'aimemalaika1995@gmail.com',
        password: 'Aime1995',
        cpassword: 'Aime1995',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((error, res) => {
          res.body.status.should.be.equal(400);
          done();
        });
    });
    it('should not duplicate a user on update', (done) => {
      const user = {
        first_name: 'jhhggjh',
        last_name: 'cesar',
        email: 'aimemalaika1996@gmail.com',
        password: 'Aime1995',
        cpassword: 'Aime1995',
      };
      chai.request(app)
        .patch('/api/v1/auth/profile')
        .send(user)
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiamhoZ2dqaCIsImxhc3RfbmFtZSI6ImNlc2FyIiwiZW1haWwiOiJhaW1lbWFsYWlrYTE5OTVAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTU3MjU3OTMyOSwiZXhwIjoxNTcyNTkzNzI5fQ.Br_DkbnUHRPY6oOsmHHUp2T0NXyG8PLrZbTfqGraS_I')
        .end((error, res) => {
          res.body.status.should.be.equal(400);
          done();
        });
    });
    it('user should enter password twice an equal when registering', (done) => {
      const user = {
        first_name: 'jhhggjh',
        last_name: 'cesar',
        email: 'aimemalaika1995@gmail.com',
        password: 'Aime1995',
        cpassword: 'yewryewiru',
      };

      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
        });
      done();
    });
    it('user password should at least conatain one catpal letter, one small letter, one number and hahe a size of at least 6 character', (done) => {
      const user = {
        first_name: 'jhhggjh',
        last_name: 'cesar',
        email: 'aimemalaika1995@gmail.com',
        password: 'aime1995',
        cpassword: 'aime1995',
      };

      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
        });
      done();
    });
    it('Should login a user', (done) => {
      const user = {
        email: 'aimemalaika1995@gmail.com',
        password: 'Aime1995',
      };
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((error, res) => {
          res.body.status.should.be.equal(201);
          expect(res.body.message).to.equal('User logged in successfully!');
          done();
        });
    });
    it('Should not login non existing user', (done) => {
      const user = {
        email: 'aimemalaika@gmail.com',
        password: 'Aime1995',
      };
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((error, res) => {
          res.body.status.should.be.equal(400);
          expect(res.body.message).to.equal('user not found in array');
          done();
        });
    });
    it('Should reject incorect password', (done) => {
      const user = {
        email: 'aimemalaika1995@gmail.com',
        password: 'Aime1995q',
      };
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((error, res) => {
          res.body.status.should.be.equal(400);
          expect(res.body.message).to.equal('user password incorrect');
          done();
        });
    });
    it('Should allow a user to reset password', (done) => {
      const user = {
        email: 'aimemalaika1995@gmail.com',
      };
      chai.request(app)
        .patch('/api/v1/auth/resetpassword')
        .send(user)
        .end((error, res) => {
          res.body.status.should.be.equal(201);
          expect(res.body.message).to.equal('email sent successful');
          done();
        });
    });
    it('Should not allow user to update password without login token', (done) => {
      const user = {
        password: 'Aime1995',
        cpassword: 'Aime1995',
      };
      chai.request(app)
        .patch('/api/v1/auth/updatepassword')
        .send(user)
        .end((error, res) => {
          res.body.status.should.be.equal(401);
          expect(res.body.message).to.equal('request not authentified');
          done();
        });
    });
    it('Should allow user to update password', (done) => {
      const user = {
        password: 'Aime1995',
        cpassword: 'Aime1995',
      };
      chai.request(app)
        .patch('/api/v1/auth/updatepassword')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiamhoZ2dqaCIsImxhc3RfbmFtZSI6ImNlc2FyIiwiZW1haWwiOiJhaW1lbWFsYWlrYTE5OTVAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTU3MjU3OTMyOSwiZXhwIjoxNTcyNTkzNzI5fQ.Br_DkbnUHRPY6oOsmHHUp2T0NXyG8PLrZbTfqGraS_I')
        .send(user)
        .end((error, res) => {
          res.body.status.should.be.equal(201);
          expect(res.body.message).to.equal('Password Updated');
          done();
        });
    });
    it('Should block not found user to update password', (done) => {
      const user = {
        password: 'Aime1995',
        cpassword: 'Aime1995',
      };
      chai.request(app)
        .patch('/api/v1/auth/updatepassword')
        // put unregistred token 3
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiamhoZ2dqaCIsImxhc3RfbmFtZSI6ImNlc2FyIiwiZW1haWwiOiJhaW1lbWFsYWlrYTEwcGo5azk1QGdtYWlsLmNvbSIsImlkIjozLCJpYXQiOjE1NzI1ODY4NTAsImV4cCI6MTU3MjY3MzI1MH0.eU7OZhSwD_ZcQcQ_vpXcXYZRri8AxcWiArXG6pi5nSc')
        .send(user)
        .end((error, res) => {
          res.body.status.should.be.equal(400);
          expect(res.body.message).to.equal('userId not found');
          done();
        });
    });
  });
});
