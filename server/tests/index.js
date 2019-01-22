import chai from 'chai';

import chaiHttp from 'chai-http';


chai.use(chaiHttp);

chai.should();

let server = require ('../../app');

//testing meetup endpoints

//GET /meetups/

describe ('RESTFUL API ENDPOINT: MEETUPS', () =>{
    it ('Should return 200 as STATUS RESPONSE CODE and an OBJECT containing its DUMMY DATA', (done) => {
         chai.request(server)
         .get('/api/v1/meetups/')
         .set('Accept', 'Application/JSON')
         .end((err, res) => {
             res.body.should.status(200);
             res.body.should.be.a('object');done()
         })
    })

})

//GET /meetups/:id

//id: 1

describe ('RESTFUL API ENDPOINT: MEETUPS', () =>{
    it ('Should return 200 as STATUS RESPONSE CODE and an OBJECT containing its DUMMY DATA', (done) => {
         chai.request(server)
         .get('/api/v1/meetups/1')
         .set('Accept', 'Application/JSON')
         .end((err, res) => {
             res.body.should.status(200);
             res.body.should.be.a('object');done()
         })
    })

})

//id: 2

describe ('RESTFUL API ENDPOINT: MEETUPS', () =>{
    it ('Should return 200 as STATUS RESPONSE CODE and an OBJECT containing its DUMMY DATA', (done) => {
         chai.request(server)
         .get('/api/v1/meetups/2')
         .set('Accept', 'Application/JSON')
         .end((err, res) => {
             res.body.should.status(200);
             res.body.should.be.a('object');done()
         })
    })

})


//id: 3

describe ('RESTFUL API ENDPOINT: MEETUPS', () =>{
    it ('Should return 200 as STATUS RESPONSE CODE and an OBJECT containing its DUMMY DATA', (done) => {
         chai.request(server)
         .get('/api/v1/meetups/3')
         .set('Accept', 'Application/JSON')
         .end((err, res) => {
             res.body.should.status(200);
             res.body.should.be.a('object');done()
         })
    })

})

//retrieving upcoming meetups

//GET /meetups/upcoming/

describe ('RESTFUL API ENDPOINT: MEETUPS', () =>{
    it ('Should return 200 as STATUS RESPONSE CODE and an OBJECT containing upcoming meetups', (done) => {
         chai.request(server)
         .get('/api/v1/meetups/upcoming')
         .set('Accept', 'Application/JSON')
         .end((err, res) => {
             res.body.should.status(200);
             res.body.should.be.a('object');done()
         })
    })

})

//GET /meetups/:id/rsvps

describe ('RESTFUL API ENDPOINT: MEETUPS', () =>{
    it ('Should return 200 as STATUS RESPONSE CODE and an OBJECT containing meetup rsvp', (done) => {
         chai.request(server)
         .get('/api/v1/meetups/1/rsvps')
         .set('Accept', 'Application/JSON')
         .end((err, res) => {
             res.body.should.status(200);
             res.body.should.be.a('object');done()
         })
    })

})


//POST /meetups/

describe ('RESTFUL API ENDPOINT: MEETUPS', () =>{
    it ('Should return 201 as STATUS RESPONSE CODE and an OBJECT containing MEETUP CREATED RECORD', (done) => {
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
    })

})

//POST /meetup/:id/rsvps

describe ('RESTFUL API ENDPOINT: MEETUPS', () =>{
    it ('Should return 201 as STATUS RESPONSE CODE and an OBJECT containing MEETUP RSVP CREATED RECORD', (done) => {
         chai.request(server)
         .post('/api/v1/meetups/1/rsvps')
         .set('Accept', 'Application/JSON')
         .send({
            "meetup": "3",
            "topic": "PROGATE MEETUP 20",
            "response": "yes"
        })
         .end((err, res) => {
             res.body.should.status(201);
             res.body.should.be.a('object');done()
         })
    })

})


//testing user endpoints

//GET /users/

describe ('RESTFUL API ENDPOINT: USERS', () =>{
    it ('Should return 200 as STATUS RESPONSE CODE and an OBJECT containing its DUMMY DATA', (done) => {
         chai.request(server)
         .get('/api/v1/users/')
         .set('Accept', 'Application/JSON')
         .end((err, res) => {
             res.body.should.status(200);
             res.body.should.be.a('object');done()
         })
    })
})

//GET /users/:id

//id: one

describe ('RESTFUL API ENDPOINT: USERS', () =>{
    it ('Should return 200 as STATUS RESPONSE CODE and an OBJECT containing its DUMMY DATA', (done) => {
         chai.request(server)
         .get('/api/v1/users/1')
         .set('Accept', 'Application/JSON')
         .end((err, res) => {
             res.body.should.status(200);
             res.body.should.be.a('object');done()
         })
    })
})


//id: two

describe ('RESTFUL API ENDPOINT: USERS', () =>{
    it ('Should return 200 as STATUS RESPONSE CODE and an OBJECT containing its DUMMY DATA', (done) => {
         chai.request(server)
         .get('/api/v1/users/2')
         .set('Accept', 'Application/JSON')
         .end((err, res) => {
             res.body.should.status(200);
             res.body.should.be.a('object');done()
         })
    })
})

//three

describe ('RESTFUL API ENDPOINT: USERS', () =>{
    it ('Should return 200 as STATUS RESPONSE CODE and an OBJECT containing its DUMMY DATA', (done) => {
         chai.request(server)
         .get('/api/v1/users/3')
         .set('Accept', 'Application/JSON')
         .end((err, res) => {
             res.body.should.status(200);
             res.body.should.be.a('object');done()
         })
    })
})

//POST /users/

describe ('RESTFUL API ENDPOINT: USERS', () =>{
    it ('Should return 201 as STATUS RESPONSE CODE and an OBJECT containing USER CREATED RECORD', (done) => {
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
             res.body.should.be.a('object');done()
         })
    })
})


//testing question endpoints

//GET /questions/

describe ('RESTFUL API ENDPOINT: QUESTIONS', () =>{
    it ('Should return 200 as STATUS RESPONSE CODE and an OBJECT containing its DUMMY DATA', (done) => {
         chai.request(server)
         .get('/api/v1/questions/')
         .set('Accept', 'Application/JSON')
         .end((err, res) => {
             res.body.should.status(200);
             res.body.should.be.a('object');done()
         })
    })
})

//GET /questions/:id

//id: one

describe ('RESTFUL API ENDPOINT: QUESTIONS', () =>{
    it ('Should return 200 as STATUS RESPONSE CODE and an OBJECT containing its DUMMY DATA', (done) => {
         chai.request(server)
         .get('/api/v1/questions/1')
         .set('Accept', 'Application/JSON')
         .end((err, res) => {
             res.body.should.status(200);
             res.body.should.be.a('object');done()
         })
    })
})

//id: two

describe ('RESTFUL API ENDPOINT: QUESTIONS', () =>{
    it ('Should return 200 as STATUS RESPONSE CODE and an OBJECT containing its DUMMY DATA', (done) => {
         chai.request(server)
         .get('/api/v1/questions/2')
         .set('Accept', 'Application/JSON')
         .end((err, res) => {
             res.body.should.status(200);
             res.body.should.be.a('object');done()
         })
    })
})

//id: three

describe ('RESTFUL API ENDPOINT: QUESTIONS', () =>{
    it ('Should return 200 as STATUS RESPONSE CODE and an OBJECT containing its DUMMY DATA', (done) => {
         chai.request(server)
         .get('/api/v1/questions/3')
         .set('Accept', 'Application/JSON')
         .end((err, res) => {
             res.body.should.status(200);
             res.body.should.be.a('object');done()
         })
    })
})



//POST /questions/

describe ('RESTFUL API ENDPOINT: QUESTIONS', () =>{
    it ('Should return 201 as STATUS RESPONSE CODE and an OBJECT containing QUESTION CREATED RECORD', (done) => {
         chai.request(server)
         .post('/api/v1/questions/')
         .set('Accept', 'Application/JSON')
         .send({
            "createdBy": "1",
            "meetup": "4",
            "title": "CYBERSECURITY CONFERENCE",
            "body": "Why is Cybersecurity so important?"
        })
         .end((err, res) => {
             res.body.should.status(201);
             res.body.should.be.a('object');done()
         })
    })
})

//upvoting and downvoting questions

//PATCH /questions/1/upvote

describe ('RESTFUL API ENDPOINT: QUESTIONS', () =>{
    it ('Should return 200 as STATUS RESPONSE CODE and an OBJECT containing UPVOTED QUESTION RECORD', (done) => {
         chai.request(server)
         .patch('/api/v1/questions/1/upvote')
         .set('Accept', 'Application/JSON')
         .end((err, res) => {
             res.body.should.status(200);
             res.body.should.be.a('object');done()
         })
    })
})

//PATCH /questions/1/downvote

describe ('RESTFUL API ENDPOINT: QUESTIONS', () =>{
    it ('Should return 200 as STATUS RESPONSE CODE and an OBJECT containing DOWNVOTED QUESTION RECORD', (done) => {
         chai.request(server)
         .patch('/api/v1/questions/1/downvote')
         .set('Accept', 'Application/JSON')
         .end((err, res) => {
             res.body.should.status(200);
             res.body.should.be.a('object');
             done()
         })
    })
})

