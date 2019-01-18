
const chaiHttp = require('chai-http');

const chai = require('chai');

const {expect} = require('chai');

chai.use(chaiHttp);

chai.should();

let server = require ('../../app');

describe ('Server', () =>{
    it ('Should return 200 as the response and an object containing dummy data', (done) => {
         chai.request(server)
         .get('/api/v1/meetups')
         .end((err, res) => {
             res.body.should.status(200);
             res.body.should.be.a('object');
             console.log(res.body);
             done()
         })
    })

})



describe ('Server', () =>{
    it ('Should return 200 as the response and an object containing dummy data', (done) => {
         chai.request(server)
         .get('/api/v1/users')
         .end((err, res) => {
             res.body.should.status(200);
             res.body.should.be.a('object');
             console.log(res.body);
             done()
         })
    })
})


describe ('Server', () =>{
    it ('Should return 200 as the response and an object containing dummy data', (done) => {
         chai.request(server)
         .get('/api/v1/questions')
         .end((err, res) => {
             res.body.should.status(200);
             res.body.should.be.a('object');
             console.log(res.body);
             done()
         })
    })
})