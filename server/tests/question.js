import chai from 'chai';
import chaiHTTP from 'chai-http';

chai.use(chaiHTTP);
chai.should();

let server = require ('../../app');

describe ('QUESTION ENDPOINT TESTS', () =>{
    it ('Should upvote the question', (done) => {
         chai.request(server)
         .patch('/api/v1/questions/1/upvote')
         .set('Accept', 'Application/JSON')
         .end((err, res) => {
             res.body.should.status(200);
             res.body.should.be.a('object');
             done()
         })
    }),
    it ('Should downvote the question', (done) => {
         chai.request(server)
         .patch('/api/v1/questions/1/downvote')
         .set('Accept', 'Application/JSON')
         .end((err, res) => {
             res.body.should.status(200);
             res.body.should.be.a('object');
             done()
         })
    }),
    it ('Should retrieve meetup question', (done) => {
         chai.request(server)
         .get('/api/v1/questions/1')
         .set('Accept', 'Application/JSON')
         .end((err, res) => {
             res.body.should.status(200);
             res.body.should.be.a('object');
             done()
         })
    }),
    it ('Should retrieve meetup question', (done) => {
        chai.request(server)
        .get('/api/v1/questions/2')
        .set('Accept', 'Application/JSON')
        .end((err, res) => {
            res.body.should.status(200);
            res.body.should.be.a('object');
            done()
        })
   })
})
