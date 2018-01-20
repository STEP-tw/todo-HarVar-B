const StaticFileHandler = require('../handlers/staticFileHandler.js');
const chai = require('chai');
const assert = chai.assert;

describe("StaticFileHandler class object should be able to",()=>{
  describe("setContent type of response dependeing on the content it serves",()=>{
    beforeEach(()=>{
      handler = new StaticFileHandler();
    });
    it("/css/style.css",()=>{
      let expected = 'text/css';
      assert.equal(handler.setContentType('/css/style.css'),expected);
    });
    it("/js/addTodo.js",()=>{
      let expected = 'text/javascript';
      assert.equal(handler.setContentType('/js/addTodo.js'),expected);
    });
    it("/homePage.html",()=>{
      let expected = 'text/html';
      assert.equal(handler.setContentType('/homePage.html'),expected);
    });
  });
});
