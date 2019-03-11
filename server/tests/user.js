import jwt from 'jsonwebtoken';
import chai from 'chai';
import chaiHTTP from 'chai-http';
import server from '../../app';
import database from '../db/database';
import { newUser, newUserLogIn, admin } from './dummy';

chai.use(chaiHTTP);
chai.should();
  
describe ('USER ENDPOINT TESTS', () =>{
  let token;
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
     .send(admin)
     .set('Accept', 'Application/JSON')
     .end((err, res) => {
         token="Bearer " + res.body.token;
         res.body.should.have.status(200);
         res.body.should.have.property('status').eql('200');
         res.body.should.have.property('success').eql('logged in');
         res.body.should.have.property('token');
         res.body.should.be.a('object');
         res.body.data.should.be.a('array');
         done()
     })
}),

it('Should retrieve users', done => {
    chai.request(server)
    .get('/api/v1/users')
    .set("authorization", token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql('200');
        res.body.should.have.property('success').eql('users retrieved');
        res.body.should.be.a('object');
        done();
      });
  });
    
    database('TRUNCATE TABLE users CASCADE');

})

