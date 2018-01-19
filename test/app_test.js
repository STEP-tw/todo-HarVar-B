const chai = require('chai');
const assert = chai.assert;
const request = require('./requestSimulator.js');
const app = require('../app.js');
const th = require('./testHelper.js');

describe('app',()=>{
  describe('GET /bad',()=>{
    it('responds with 404',done=>{
      request(app,{method:'GET',url:'/bad'},(res)=>{
        assert.equal(res.statusCode,404);
        done();
      })
    })
  })
  describe('GET /',()=>{
    it('redirects to login',()=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        th.should_be_redirected_to(res,'/loginPage.html');
        th.body_contains(res,'');
      });
    });
  });
  describe("GET /, with sessionId & username",()=>{
    it('gives homePage.html',(done)=>{
      request(app,{method:'GET',url:'/',user:'harshab',headers:{cookies:{sessionid:123456}}},(res)=>{
        th.should_be_redirected_to(res,'/homePage.html');
        th.body_contains(res,'');
        done()
      });
    });
  });
  describe("GET /loginPage.html , without cookies",()=>{
    it("should serve loginPage",()=>{
      request(app,{method:"GET",url:'/loginPage.html'},(res)=>{
        th.status_is_ok(res);
        th.body_contains(res,'please login to continue');
      });
    });
  });
  describe("GET /loginPage.html , with sessionId cookies",()=>{
    it("should redirect to homePage",()=>{
      request(app,{method:'GET',url:'/loginPage.html',user:'harshab',headers:{cookie:{sessionid:123456}}},(res)=>{
        th.should_be_redirected_to(res,'/homePage.html');
        th.body_contains(res,"");
      });
    });
  });
  describe("POST /loginPage.html , with badUser",()=>{
    it("should redirect to loginPage with a loginFailed message",()=>{
      request(app,{method:"POST",url:"/loginPage.html",body:"userName=pranoyk"},(res)=>{
        th.should_be_redirected_to(res,"/loginPage.html");
        th.body_contains(res,"");
      });
    });
  });
  describe("POST /loginPage.html , with valid username",()=>{
    it("should redirect to homePage.html",()=>{
      request(app,{method:"POST",url:"/loginPage.html",body:"userName=harshab"},(res)=>{
        th.should_be_redirected_to(res,"/homePage.html");
        th.body_contains(res,"");
      });
    });
  });
  //Test logout
  describe('GET /homePage.html ,without cookies',()=>{
    it("redirects to login",()=>{
      request(app,{method:'GET',url:'/homePage.html'},(res)=>{
        th.should_be_redirected_to(res,'/loginPage.html');
        th.body_contains(res,'');
      });
    });
  });
  describe('GET /homePage.html , with sessionId & username',()=>{
    it('serves homePage.html',(done)=>{
      request(app,{method:'GET',url:'/homePage.html',user:'harshab',headers:{cookie:{sessionid:123456}}},(res)=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'TODO app');
        done()
      });
    });
  });
});
