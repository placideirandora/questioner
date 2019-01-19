const chai = require('chai');

const chaiHttp = require('chai-http');

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
             res.body.should.be.a('object');
             console.log(res.body);
             done()
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
             res.body.should.be.a('object');
             console.log(res.body);
             done()
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
             res.body.should.be.a('object');
             console.log(res.body);
             done()
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
             res.body.should.be.a('object');
             console.log(res.body);
             done()
         })
    })

})

//POST /meetups/

describe ('RESTFUL API ENDPOINT: MEETUPS', () =>{
    it ('Should return 201 as STATUS RESPONSE CODE and an OBJECT containing CREATED DATA', (done) => {
         chai.request(server)
         .post('/api/v1/meetups/')
         .set('Accept', 'Application/JSON')
         .send({
            "id": 4,
            "createdOn": new Date().toGMTString(),
            "location": "University of Rwanda - Huye Campus",
            "images": [ "image 1", "image2" ],
            "topic": "CYBERSECURITY CONFERENCE",
            "happeningOn": new Date("2019-05-11").toGMTString(),
            "tags": [ "information security", "cryptography", "authentication" ]
        })
         .end((err, res) => {
             res.body.should.status(201);
             res.body.should.be.a('object');
             console.log(res.body);
             done()
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
             res.body.should.be.a('object');
             console.log(res.body);
             done()
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
             res.body.should.be.a('object');
             console.log(res.body);
             done()
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
             res.body.should.be.a('object');
             console.log(res.body);
             done()
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
             res.body.should.be.a('object');
             console.log(res.body);
             done()
         })
    })
})

//POST /users/

describe ('RESTFUL API ENDPOINT: USERS', () =>{
    it ('Should return 201 as STATUS RESPONSE CODE and an OBJECT containing CREATED DATA', (done) => {
         chai.request(server)
         .post('/api/v1/users/')
         .set('Accept', 'Application/JSON')
         .send ({   
            "id": 4,
            "firstname": "Emmanuel",
            "lastname": "CYUBAHIRO",
            "othername": "cr7",
            "email": "emmanuelcyubahiro@gmail.com",
            "phoneNumber": "07860456185",
            "username": "emmanuelcyubahiro"
        })
         .end((err, res) => {
             res.body.should.status(201);
             res.body.should.be.a('object');
             console.log(res.body);
             done()
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
             res.body.should.be.a('object');
             console.log(res.body);
             done()
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
             res.body.should.be.a('object');
             console.log(res.body);
             done()
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
             res.body.should.be.a('object');
             console.log(res.body);
             done()
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
             res.body.should.be.a('object');
             console.log(res.body);
             done()
         })
    })
})



//POST /questions/

describe ('RESTFUL API ENDPOINT: QUESTIONS', () =>{
    it ('Should return 201 as STATUS RESPONSE CODE and an OBJECT containing CREATED DATA', (done) => {
         chai.request(server)
         .post('/api/v1/questions/')
         .set('Accept', 'Application/JSON')
         .send({
            "id": 4,
            "createdOn": new Date().toGMTString(),
            "createdBy": "eb8f4f4b-ca69-4d09-bffc-f004dfd51d6f",
            "meetup": "9837906e-b799-4cdd-90d7-d2f03fd9e3fj",
            "title": "CYBERSECURITY CONFERENCE",
            "body": "Why is Cybersecurity so important?"
        })
         .end((err, res) => {
             res.body.should.status(201);
             res.body.should.be.a('object');
             console.log(res.body);
             done()
         })
    })
})

