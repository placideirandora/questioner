import chai from 'chai';
import chaiHTTP from 'chai-http';

chai.use(chaiHTTP);
chai.should();

let server = require ('../../app');

describe ('MEETUP ENDPOINT TESTS', () =>{
    it ('Should retrieve all meetups', (done) => {
         chai.request(server)
         .get('/api/v1/meetups/')
         .set('Accept', 'Application/JSON')
         .end((err, res) => {
             res.body.should.status(200);
             res.body.should.be.a('object');
             done()
         })
    }),
    it ('Should retrieve the first meetup', (done) => {
         chai.request(server)
         .get('/api/v1/meetups/1')
         .set('Accept', 'Application/JSON')
         .end((err, res) => {
             res.body.should.status(200);
             res.body.should.be.a('object');done()
         })
    }),
    it ('Should retrieve the second meetup', (done) => {
         chai.request(server)
         .get('/api/v1/meetups/2')
         .set('Accept', 'Application/JSON')
         .end((err, res) => {
             res.body.should.status(200);
             res.body.should.be.a('object');done()
         }),
    it ('Should retrieve the third meetup', (done) => {
         chai.request(server)
         .get('/api/v1/meetups/3')
         .set('Accept', 'Application/JSON')
         .end((err, res) => {
             res.body.should.status(200);
             res.body.should.be.a('object');done()
         })
    }),
    it ('Should retrieve upcoming meetups', (done) => {
         chai.request(server)
         .get('/api/v1/meetups/upcoming')
         .set('Accept', 'Application/JSON')
         .end((err, res) => {
             res.body.should.status(200);
             res.body.should.be.a('object');done()
         })
    })
}),
    it ('Should create a new meetup', (done) => {
         chai.request(server)
         .post('/api/v1/meetups/')
         .set('Accept', 'Application/JSON')
         .send({
            "location": "University of Rwanda - Huye Campus",
            "images": [ "image 1", "image2" ],
            "topic": "CYBERSECURITY CONFERENCE",
            "happeningOn": new Date("2019-05-11").toGMTString(),
            "tags": [ "information security", "cryptography", "authentication" ]
        })
         .end((err, res) => {
             res.body.should.status(201);
             res.body.should.be.a('object');done()
         })
    }),
    it ('Should respond to the first meetup', (done) => {
         chai.request(server)
         .post('/api/v1/meetups/1/rsvps')
         .set('Accept', 'Application/JSON')
         .send({
            "response": "yes"
        })
         .end((err, res) => {
             res.body.should.status(201);
             res.body.should.be.a('object');done()
         })
    }),
    it ('Should retrieve the first meetup rsvp', (done) => {
        chai.request(server)
        .get('/api/v1/meetups/1/rsvps')
        .set('Accept', 'Application/JSON')
        .end((err, res) => {
            res.body.should.status(200);
            res.body.should.be.a('object');done()
        })
   }),
    it ('Should post a question in the first meetup', (done) => {
        chai.request(server)
        .post('/api/v1/meetups/1/questions')
        .set('Accept', 'Application/JSON')
        .send({
           "title": "ALC",
           "body": "When did ALC start?"
       })
        .end((err, res) => {
            res.body.should.status(201);
            res.body.should.be.a('object');done()
        })
   })
});

