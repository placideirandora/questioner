import chai from 'chai';
import chaiHTTP from 'chai-http';

chai.use(chaiHTTP);
chai.should();

let server = require ('../../app');

describe ('USER ENDPOINT TESTS', () =>{
    it ('Should retrieve all users', (done) => {
         chai.request(server)
         .get('/api/v1/users/')
         .set('Accept', 'Application/JSON')
         .end((err, res) => {
             res.body.should.status(200);
             res.body.should.be.a('object');
             done()
         })
    }),
    it ('Should retrieve the first user', (done) => {
         chai.request(server)
         .get('/api/v1/users/1')
         .set('Accept', 'Application/JSON')
         .end((err, res) => {
             res.body.should.status(200);
             res.body.should.be.a('object');
             done()
         })
    }),
    it ('Should retrieve the second user', (done) => {
         chai.request(server)
         .get('/api/v1/users/2')
         .set('Accept', 'Application/JSON')
         .end((err, res) => {
             res.body.should.status(200);
             res.body.should.be.a('object');
             done()
         })
    }),
    it ('Should retrieve the third user', (done) => {
         chai.request(server)
         .get('/api/v1/users/3')
         .set('Accept', 'Application/JSON')
         .end((err, res) => {
             res.body.should.status(200);
             res.body.should.be.a('object');
             done()
         })
    }),
    it ('Should register a new user', (done) => {
         chai.request(server)
         .post('/api/v1/users/')
         .set('Accept', 'Application/JSON')
         .send ({   
            "firstname": "Emmanuel",
            "lastname": "CYUBAHIRO",
            "othername": "cr7",
            "email": "emmanuelcyubahiro@gmail.com",
            "phoneNumber": "07860456185",
            "username": "emmanuelcyubahiro",
            "isAdmin": "true"
        })
         .end((err, res) => {
             res.body.should.status(201);
             res.body.should.be.a('object');
             done()
         })
    })
})
