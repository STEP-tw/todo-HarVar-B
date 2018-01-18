const chai = require('chai');
const assert = chai.assert;
const request = require('./testFrameWork.js/requestSimulator.js');
const app = require('../app.js');
const th = require('./testFrameWork.js/testHelper.js');

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
        assert.equal(res.body,"");
      });
    });
  });
  describe("GET /, with sessionId & username",()=>{
    it('serves homePage.html',(done)=>{
      request(app,{method:'GET',url:'/',user:'harshab',headers:{cookies:{sessionid:123456}}},(res)=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        // console.log(res.body);
        th.body_contains(res,'TODO app');
        done()
      });
    });
  });
});
