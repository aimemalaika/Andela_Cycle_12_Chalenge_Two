import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';

chai.use(chaiHttp);
const should = chai.should();
const { expect } = chai;

describe('Test users auth', () => {
  describe('Test entries', () => {
    it('user should create a post with a token header', (done) => {
      const entry = {
        subject: 'the story of a ma starting to date kklko',
        content: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
      };
      chai.request(app)
        .post('/api/v1/entry')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiamhoZ2dqaCIsImxhc3RfbmFtZSI6ImNlc2FyIiwiZW1haWwiOiJhaW1lbWFsYWlrYTEwcGo5azk1QGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE1NzI4NTEzMDAsImV4cCI6MTU3NDkyNDkwMH0.0pXPYVprjEQ3DncyjGtCW4HQSLzQJYwmnpHqNv3hZWo')
        .send(entry)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body.message).to.equal('entry successfully created');
        });
      done();
    });
    it('user should create a post again', (done) => {
      const entry = {
        subject: 'the story of a ma starting to date update',
        content: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
      };
      chai.request(app)
        .post('/api/v1/entry')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiamhoZ2dqaCIsImxhc3RfbmFtZSI6ImNlc2FyIiwiZW1haWwiOiJhaW1lbWFsYWlrYTEwcGo5azk1QGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE1NzI4NTEzMDAsImV4cCI6MTU3NDkyNDkwMH0.0pXPYVprjEQ3DncyjGtCW4HQSLzQJYwmnpHqNv3hZWo')
        .send(entry)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body.message).to.equal('entry successfully created');
        });
      done();
    });
    it('user should not dupicate a post', (done) => {
      const entry = {
        subject: 'the story of a ma starting to date kklko',
        content: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
      };
      chai.request(app)
        .post('/api/v1/entry')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiamhoZ2dqaCIsImxhc3RfbmFtZSI6ImNlc2FyIiwiZW1haWwiOiJhaW1lbWFsYWlrYTEwcGo5azk1QGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE1NzI4NTEzMDAsImV4cCI6MTU3NDkyNDkwMH0.0pXPYVprjEQ3DncyjGtCW4HQSLzQJYwmnpHqNv3hZWo')
        .send(entry)
        .end((err, res) => {
          res.should.have.status(400);
        });
      done();
    });
    it('user should reject invalid token header', (done) => {
      const entry = {
        subject: 'the story of a ma starting to date kklko',
        content: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
      };
      chai.request(app)
        .post('/api/v1/entry')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IXVCJ9.eyJmaXJzdF9uYW1lIjoiamhoZ2dqaCIsImxhc3RfbmFtZSI6ImNlc2FyIiwiZW1haWwiOiJhaW1lbWFsYWlrYTE5OTVAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTU3MjU3OTMyOSwiZXhwIjoxNTcyNTkzNzI5fQ.Br_DkbnUHRPY6oOsmHHUp2T0NXyG8PLrZbTfqGraS_I')
        .send(entry)
        .end((err, res) => {
          res.should.have.status(401);
          expect(res.body.message).to.equal('request not authentified');
        });
      done();
    });
    it('user should allow a user to see his posts with a token header', (done) => {
      chai.request(app)
        .get('/api/v1/entries')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiamhoZ2dqaCIsImxhc3RfbmFtZSI6ImNlc2FyIiwiZW1haWwiOiJhaW1lbWFsYWlrYTEwcGo5azk1QGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE1NzI4NTEzMDAsImV4cCI6MTU3NDkyNDkwMH0.0pXPYVprjEQ3DncyjGtCW4HQSLzQJYwmnpHqNv3hZWo')
        .end((err, res) => {
          res.should.have.status(200);
        });
      done();
    });
    it('user should allow a user to read one story', (done) => {
      chai.request(app)
        .get('/api/v1/entries/1')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiamhoZ2dqaCIsImxhc3RfbmFtZSI6ImNlc2FyIiwiZW1haWwiOiJhaW1lbWFsYWlrYTEwcGo5azk1QGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE1NzI4NTEzMDAsImV4cCI6MTU3NDkyNDkwMH0.0pXPYVprjEQ3DncyjGtCW4HQSLzQJYwmnpHqNv3hZWo')
        .end((err, res) => {
          res.should.have.status(200);
        });
      done();
    });
    it('user should allow a user to read one story if exist only', (done) => {
      chai.request(app)
        .get('/api/v1/entries/4')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiamhoZ2dqaCIsImxhc3RfbmFtZSI6ImNlc2FyIiwiZW1haWwiOiJhaW1lbWFsYWlrYTEwcGo5azk1QGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE1NzI4NTEzMDAsImV4cCI6MTU3NDkyNDkwMH0.0pXPYVprjEQ3DncyjGtCW4HQSLzQJYwmnpHqNv3hZWo')
        .end((err, res) => {
          res.should.have.status(404);
          expect(res.body.message).to.equal('story not found');
        });
      done();
    });
    it('user should allow a user to update one story', (done) => {
      const entry = {
        subject: 'the story of a ma starting to date olp',
        content: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
      };
      chai.request(app)
        .patch('/api/v1/entries/1')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiamhoZ2dqaCIsImxhc3RfbmFtZSI6ImNlc2FyIiwiZW1haWwiOiJhaW1lbWFsYWlrYTEwcGo5azk1QGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE1NzI4NTEzMDAsImV4cCI6MTU3NDkyNDkwMH0.0pXPYVprjEQ3DncyjGtCW4HQSLzQJYwmnpHqNv3hZWo')
        .send(entry)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.message).to.equal('entry successfully edited');
        });
      done();
    });
    it('user should not allow a user to dipicate on update story', (done) => {
      const entry = {
        subject: 'the story of a ma starting to date update',
        content: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
      };
      chai.request(app)
        .patch('/api/v1/entries/1')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiamhoZ2dqaCIsImxhc3RfbmFtZSI6ImNlc2FyIiwiZW1haWwiOiJhaW1lbWFsYWlrYTEwcGo5azk1QGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE1NzI4NTEzMDAsImV4cCI6MTU3NDkyNDkwMH0.0pXPYVprjEQ3DncyjGtCW4HQSLzQJYwmnpHqNv3hZWo')
        .send(entry)
        .end((err, res) => {
          res.should.have.status(400);
        });
      done();
    });
    it('api should should return validation error', (done) => {
      const entry = {
        subject: '',
        content: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
      };
      chai.request(app)
        .patch('/api/v1/entries/1')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiamhoZ2dqaCIsImxhc3RfbmFtZSI6ImNlc2FyIiwiZW1haWwiOiJhaW1lbWFsYWlrYTEwcGo5azk1QGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE1NzI4NTEzMDAsImV4cCI6MTU3NDkyNDkwMH0.0pXPYVprjEQ3DncyjGtCW4HQSLzQJYwmnpHqNv3hZWo')
        .send(entry)
        .end((err, res) => {
          res.should.have.status(400);
        });
      done();
    });
    it('user should should not update someone else story', (done) => {
      const entry = {
        subject: 'ieiowreworioewrew ewr ew rew r ew rew ',
        content: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
      };
      chai.request(app)
        .patch('/api/v1/entries/1')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiamhoZ2dqaCIsImxhc3RfbmFtZSI6ImNlc2FyIiwiZW1haWwiOiJhaW1lbWFsYWlrYTEwdHBqOWs5NUBnbWFpbC5jb20iLCJpZCI6MiwiaWF0IjoxNTcyODUxMzcxLCJleHAiOjE1NzQ5MjQ5NzF9.U0NXKJE2dcWj-QbRNxgcgql4xiA77b_kGZ0ft7RZFRA')
        .send(entry)
        .end((err, res) => {
          res.should.have.status(403);
        });
      done();
    });
    it('user should not delete unexistent story', (done) => {
      chai.request(app)
        .delete('/api/v1/entries/5')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiamhoZ2dqaCIsImxhc3RfbmFtZSI6ImNlc2FyIiwiZW1haWwiOiJhaW1lbWFsYWlrYTEwcGo5azk1QGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE1NzI4NTEzMDAsImV4cCI6MTU3NDkyNDkwMH0.0pXPYVprjEQ3DncyjGtCW4HQSLzQJYwmnpHqNv3hZWo')
        .end((err, res) => {
          res.should.have.status(404);
          expect(res.body.message).to.equal('story not found');
        });
      done();
    });
    it('user should allow a user to delete one story', (done) => {
      chai.request(app)
        .delete('/api/v1/entries/1')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiamhoZ2dqaCIsImxhc3RfbmFtZSI6ImNlc2FyIiwiZW1haWwiOiJhaW1lbWFsYWlrYTEwcGo5azk1QGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE1NzI4NTEzMDAsImV4cCI6MTU3NDkyNDkwMH0.0pXPYVprjEQ3DncyjGtCW4HQSLzQJYwmnpHqNv3hZWo')
        .end((err, res) => {
          res.should.have.status(204);
        });
      done();
    });
    it('user should allow a user to delete one story', (done) => {
      chai.request(app)
        .delete('/api/v1/entries/2')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiamhoZ2dqaCIsImxhc3RfbmFtZSI6ImNlc2FyIiwiZW1haWwiOiJhaW1lbWFsYWlrYTEwcGo5azk1QGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE1NzI4NTEzMDAsImV4cCI6MTU3NDkyNDkwMH0.0pXPYVprjEQ3DncyjGtCW4HQSLzQJYwmnpHqNv3hZWo')
        .end((err, res) => {
          res.should.have.status(204);
        });
      done();
    });
    it('should return this when the db is empty', (done) => {
      const entry = {
        subject: 'the story of a ma starting to date obrigado',
        content: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
      };
      chai.request(app)
        .patch('/api/v1/entries/1')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiamhoZ2dqaCIsImxhc3RfbmFtZSI6ImNlc2FyIiwiZW1haWwiOiJhaW1lbWFsYWlrYTEwcGo5azk1QGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE1NzI4NTEzMDAsImV4cCI6MTU3NDkyNDkwMH0.0pXPYVprjEQ3DncyjGtCW4HQSLzQJYwmnpHqNv3hZWo')
        .send(entry)
        .end((err, res) => {
          res.should.have.status(404);
          expect(res.body.message).to.equal('story not found');
        });
      done();
    });
  });
});
