import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';
import mochadata from '../mockdata/tokens';
import dummypost from '../mockdata/randomPost';
chai.use(chaiHttp);
const should = chai.should();
const { expect } = chai;

describe('Test post management', () => {
  it('user should create a post with a token header', (done) => {
    chai.request(app)
      .post('/api/v1/entry')
      .set('Authorization', mochadata.user1token)
      .send(dummypost.createpostDummy)
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body.message).to.equal('entry successfully created');
      });
    done();
  });
  it('user should allow a user to see his posts with a token header', (done) => {
    chai.request(app)
      .get('/api/v1/entries')
      .set('Authorization', mochadata.user1token)
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });
  it('user should allow a user to update one story', (done) => {
    chai.request(app)
      .patch('/api/v1/entries/2')
      .set('Authorization', mochadata.user2token)
      .send(dummypost.entryUpdate)
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(200);
      });
    done();
  });
  it('user should allow a user to delete one story', (done) => {
    chai.request(app)
      .delete('/api/v1/entries/4')
      .set('Authorization', mochadata.user3token)
      .end((err, res) => {
        res.should.have.status(204);
      });
    done();
  });
});
