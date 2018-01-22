const User = require('../src/user.js');
const PostAddTodoHandler = require('../handlers/postAddTodoHandler.js');
const chai = require('chai');
const assert = chai.assert;

describe("postAddTodoHandler() class object",()=>{
  beforeEach(()=>{
    req = {};
    req.body = {title:'pranoy', description:'testing', items:undefined};
    todoHandler = new User('pranoy');
    todoHandler.createNew('pranoy','testing');
  });
  describe("addItems()", ()=>{
    it("should not add an item when items are undefined", ()=>{
      let fs = {};
      let expected = todoHandler
      let postAddTodoHandler = new PostAddTodoHandler(fs);
      assert.deepEqual(postAddTodoHandler.addItems(req,todoHandler),expected);
    });
    it("should add an item when item is a string", ()=>{
      req.body.items = 'item1';
      let fs = {};
      let expected = "item1";
      let postAddTodoHandler = new PostAddTodoHandler(fs);
      postAddTodoHandler.addItems(req,todoHandler);
      assert.equal(todoHandler._todo_s["0"]._items["0"]._content,expected);
    });
    it("should add items when multiple items are given in an Array", ()=>{
      req.body.items = ['item1','item2'];
      let fs = {};
      let expected = {};
      expected.first = "item1";
      expected.second = "item2";
      let postAddTodoHandler = new PostAddTodoHandler(fs);
      postAddTodoHandler.addItems(req,todoHandler);
      assert.deepEqual(todoHandler._todo_s["0"]._items["0"]._content,expected.first);
      assert.deepEqual(todoHandler._todo_s["0"]._items["1"]._content,expected.second);
    });
  });

  describe("addTodo()", ()=>{
    it("should add a todo in user when provided with one", ()=>{
      let fs = {};
      req.body.items=undefined;
      let expected = {};
      expected.title = "pranoy";
      expected.items = {};
      expected.description = "testing";
      let postAddTodoHandler = new PostAddTodoHandler(fs);
      postAddTodoHandler.addTodo(req,todoHandler)
      assert.deepEqual(todoHandler._todo_s["0"]._title,expected.title);
      assert.deepEqual(todoHandler._todo_s["0"]._description,expected.description);
      assert.deepEqual(todoHandler._todo_s["0"]._items,expected.items);
    })
  });

  describe("execute()", ()=>{
    it("should create todo depending on req.body and redirect to homePage",()=>{
      req.cookies = {};
      req.cookies.username = "harshab";
      let fs = {
        readFileSync : ()=>{return "{}"},
        writeFileSync : ()=>{return (`is writing to a file`);}
      }
      let res = {
        statuscode:undefined,
        redirect : function(){this.statuscode=302},
        end : ()=>{return (`response has ended`);}
      }
      let postAddTodoHandler = new PostAddTodoHandler(fs);
      postAddTodoHandler.execute(req,res);
      assert.equal(res.statuscode,302);
    });
  });
});
