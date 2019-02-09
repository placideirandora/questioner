import jwt from 'jsonwebtoken';
import chai from 'chai';
import chaiHTTP from 'chai-http';
import server from '../../app';
import database from '../db/database';
import { newUser, newUserLogIn } from './dummy';

chai.use(chaiHTTP);
chai.should();
  
describe ('USER ENDPOINT TESTS', () =>{
  it ('Should register a new user', (done) => {
       chai.request(server)
       .post('/api/v1/auth/signup')
       .send(newUser)
       .set('Accept', 'Application/JSON')
       .end((err, res) => {
           res.body.should.have.status(201);
           res.body.should.have.property('status').eql('201');
           res.body.should.have.property('success').eql('user registered');
           res.body.should.be.a('object');
           res.body.data.should.be.a('array');
           done()
       })
  }),

  it ('Should login the new user', (done) => {
     chai.request(server)
     .post('/api/v1/auth/login')
     .send(newUserLogIn)
     .set('Accept', 'Application/JSON')
     .end((err, res) => {
         res.body.should.have.status(200);
         res.body.should.have.property('status').eql('200');
         res.body.should.have.property('success').eql('logged in');
         res.body.should.be.a('object');
         res.body.data.should.be.a('array');
         done()
     })
}),

it('Should return unauthorized access error message', done => {
    chai.request(server)
    .get('/api/v1/users')
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('status').eql('403');
        res.body.should.have.property('error').eql('unauthorized access');
        res.body.should.be.a('object');
        done();
      });
  });
    
    database('TRUNCATE TABLE users CASCADE');

})

