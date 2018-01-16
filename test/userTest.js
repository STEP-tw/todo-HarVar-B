const User = require('../src/user.js');
const ToDo = require('../src/todo.js');
const Item = require('../src/item.js');

const fs =require('fs');
const assert = require('chai').assert;

describe("A User class object should:",()=>{
  it("be able to delete a todo",()=>{
    let harshab = new User("harshab");
    harshab.createNew("battleship","should complete by this sunday");
    harshab.createNew("flowerCatalog","should complete backend code by next tuesday");
    harshab.deleteToDo("battleship");
    assert.equal(harshab.todo_s_count,1);
  });
  describe("be able to edit",()=>{
    beforeEach(()=>{
      harshab = new User("harshab");
    });
    it("name of todo",()=>{
      harshab.createNew("battleship","should complete by this sunday");
      harshab.editToDo("battleship","airCarrier");
      let expected = new ToDo("airCarrier","should complete by this sunday");
      assert.deepEqual(harshab.getToDo("airCarrier"),expected);
    });
    it("description of todo",()=>{
      harshab.createNew("battleship","should complete by this sunday");
      harshab.editToDo("battleship","battleship","complete soon");
      let expected = new ToDo("battleship","complete soon");
      assert.deepEqual(harshab.getToDo("battleship"),expected);
    });
    it("name & description of todo",()=>{
      harshab.createNew("battleship","should complete by this sunday");
      harshab.editToDo("battleship","airCarrier","complete soon");
      let expected = new ToDo("airCarrier","complete soon");
      assert.deepEqual(harshab.getToDo("airCarrier"),expected);
    });
  });
  describe("a User class object should",()=>{
    let harshab = new User("harshab");
    it("be able to rebuild todo objects & their behaviour from a json string",()=>{
      let data = fs.readFileSync('/Users/harshab/projects/todo-HarVar-B/users/harshab.json','utf-8');
      harshab.loadToDo_s(data);
      let expected = new ToDo("battleship","should complete by this sunday evening");
      expected.addItem("gameTest");
      assert.deepEqual(harshab.getToDo("battleship"),expected);
    });
  });
});
