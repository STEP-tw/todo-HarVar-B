const chai = require('chai');
const assert = chai.assert;
const request = require('supertest');
const app = require('../app.js');

const hasCookies = (cookies)=>{
  return (res)=>{
    if (!res.headers['set-cookie'][0].includes(cookies))
      throw new Error(`expected ${res.cookies} to contain ${cookies}`);
  }
}

describe('app',()=>{
  describe('GET /bad',()=>{
    it('responds with 404',done=>{
      request(app)
        .get('/bad')
        .expect(404)
        .end(done);
    })
  })
  describe('GET /loginPage.html',()=>{
    it('responds with 200 and error message',done=>{
      request(app)
        .get('/loginPage.html')
        .set('Cookie','message=login failed')
        .expect(200)
        .expect('Content-Type',/html/)
        .expect(/Username:/)
        .end(done);
    })
  })
  describe('GET /',()=>{
    it('redirects to login',done=>{
      request(app)
        .get('/')
        .expect(302)
        .expect('Location','/loginPage.html')
        .end(done);
    });
  });
  describe("GET /, with sessionId & username",()=>{
    it('gives homePage.html',(done)=>{
      request(app)
        .get('/')
        .set('Cookie','username=harshab')
        .set('Cookie','sessionid=21001')
        .expect(302)
        .expect('Location','/homePage.html')
        .end(done);
    });
  });
  describe("GET getTodo, with username",()=>{
    it("gives JSON object for xhr",done=>{
      request(app)
        .get('/getTodo')
        .set('Cookie','username=harshab')
        .set('Cookie','sessionid=21001')
        .expect(200)
        .expect('Content-Type',/html/)
        .end(done);
    });
  });
  describe("GET logout, with username",()=>{
    it("redirects to /loginPage.html",done=>{
      request(app)
        .get('/logout')
        .expect(302)
        .expect('Location','/loginPage.html')
        .end(done);
    });
  });
  describe("GET /loginPage.html , without cookies",()=>{
    it("should serve loginPage",done=>{
      request(app)
        .get('/loginPage.html')
        .expect(200)
        .expect('Content-Type',/html/)
        .end(done);
    });
  });
  describe("GET /loginPage.html , with sessionId cookies",()=>{
    it("should redirect to homePage",done=>{
      request(app)
        .get('/loginPage.html')
        .set('Cookie','username=harshab')
        .set('Cookie','sessionid=21001')
        .expect(302)
        .expect('Location','/homePage.html')
        .end(done);
    });
  });
  describe("POST /loginPage.html , with badUser",()=>{
    it("should redirect to loginPage with a loginFailed message",done=>{
      request(app)
        .post('/loginPage.html')
        .send('username=badUser')
        .expect(302)
        .expect('Location','/loginPage.html')
        .expect(hasCookies('logInFailed=true; Max-Age=3'))
        .end(done);
    });
  });
  describe("POST /loginPage.html , with valid username",()=>{
    it("should redirect to homePage.html",done=>{
      request(app)
      .post('/loginPage.html')
      .send('username=harshab')
      .expect(302)
      .expect('Location','/homePage.html')
      .end(done);
    });
  });
  //Test logout
  describe('GET /homePage.html ,without cookies',()=>{
    it("redirects to login",done=>{
      request(app)
        .get('/homePage.html')
        .expect(302)
        .expect('Location','/loginPage.html')
        .end(done);
    });
  });
  describe('GET /homePage.html , with sessionId & username',()=>{
    it('serves homePage.html',(done)=>{
      request(app)
        .get('/homePage.html')
        .send('username=harshab')
        .set('Cookie','username=harshab')
        .set('Cookie','sessionid=21001')
        .expect(200)
        .expect('Content-Type',/html/)
        .end(done);
    });
  });
});
