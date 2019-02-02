import chai from 'chai';

import chaiHttp from 'chai-http';


chai.use(chaiHttp);

chai.should();

let server = require ('../../app');



//testing logging in

describe ('RESTFUL API ENDPOINT: USERS', () =>{
    it ('Should return 200 as STATUS RESPONSE CODE', (done) => {
         chai.request(server)
         .post('/api/v1/users/auth/login')
         .set('Accept', 'Application/JSON')
         .send({
            "email": "placideirandora@gmail.com",
            "password": "123456"
        })
         .end((err, res) => {
             res.body.should.status(200);
             res.body.should.be.a('object');
             done()
         })
    })

})




