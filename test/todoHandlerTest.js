const ToDoHandler = require('../src/todoHandler.js');
const ToDo = require('../src/todo.js');
const Item = require('../src/item.js');

// const fs =require('fs');
const assert = require('chai').assert;
// a user have a ToDoHandler to handle his ToDo's
describe("A ToDoHandler class object should:",()=>{
  it("have a username, thus a path for storing data is created by itself",()=>{
    let harshab = new ToDoHandler("harshab");
    harshab.createNew("battleship","should complete by this sunday");
    let expected = new ToDo("battleship","should complete by this sunday")
    assert.deepEqual(harshab.getToDo("battleship"),expected);
    let expectedPath = "./users/harshab.js";
    assert.equal(harshab.getStoragePath,expectedPath);
  });
  it("be able to delete a todo",()=>{
    let harshab = new ToDoHandler("harshab");
    harshab.createNew("battleship","should complete by this sunday");
    harshab.createNew("flowerCatalog","should complete backend code by next tuesday");
    harshab.deleteToDo("battleship");
    assert.equal(harshab.todo_s_count,2);
  });
  describe("be able to edit",()=>{
    it("name of todo",()=>{
      let harshab = new ToDoHandler("harshab");
      harshab.createNew("battleship","should complete by this sunday");
      harshab.editToDo("battleship","airCarrier");
      let expected = new ToDo("airCarrier","should complete by this sunday");
      assert.deepEqual(harshab.getToDo("airCarrier"),expected);
    });
    it("description of todo",()=>{
      let harshab = new ToDoHandler("harshab");
      harshab.createNew("battleship","should complete by this sunday");
      harshab.editToDo("battleship","battleship","complete soon");
      let expected = new ToDo("battleship","complete soon");
      assert.deepEqual(harshab.getToDo("battleship"),expected);
    });
    it("name & description of todo",()=>{
      let harshab = new ToDoHandler("harshab");
      harshab.createNew("battleship","should complete by this sunday");
      harshab.editToDo("battleship","airCarrier","complete soon");
      let expected = new ToDo("airCarrier","complete soon");
      assert.deepEqual(harshab.getToDo("airCarrier"),expected);
    });
  });
});
