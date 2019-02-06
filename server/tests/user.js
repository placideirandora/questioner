import chai from 'chai';
import chaiHTTP from 'chai-http';
import server from '../../app';

process.env.NODE_ENV = 'test';

chai.use(chaiHTTP);
chai.should();

  
describe ('RESTFUL API USER ENDPOINT ROUTES', () =>{
  it ('Should retrieve all users', (done) => {
      const newUser = {
        
      }
       chai.request(server)
       .post('/api/v1/auth/signup')
       .set('Accept', 'Application/JSON')
       .end((err, res) => {
           res.body.should.status(200);
           res.body.should.be.a('object');
           done()
       })
  })

})



