const User = require('../src/user.js');
const ToDo = require('../src/todo.js');
const Item = require('../src/item.js');

const assert = require('chai').assert;

describe("A User class object should:",()=>{
  it("be able to delete a todo",()=>{
    let harshab = new User("harshab");
    harshab.createNew("battleship","should complete by this sunday");
    harshab.createNew("flowerCatalog","should complete backend code by next tuesday");
    harshab.deleteToDo("0");
    assert.equal(harshab.todo_s_count,1);
  });
  describe("be able to edit",()=>{
    beforeEach(()=>{
      harshab = new User("harshab");
    });
    it("name of todo",()=>{
      harshab.createNew("battleship","should complete by this sunday",'0');
      harshab.editToDo("0","airCarrier");
      let expected = new ToDo("airCarrier","should complete by this sunday");
      assert.deepEqual(harshab.getToDo("0"),expected);
    });
    it("description of todo",()=>{
      harshab.createNew("battleship","should complete by this sunday","0");
      harshab.editToDo("0","battleship","complete soon");
      let expected = new ToDo("battleship","complete soon");
      assert.deepEqual(harshab.getToDo("0"),expected);
    });
    it("name & description of todo",()=>{
      harshab.createNew("battleship","should complete by this sunday","0");
      harshab.editToDo("0","airCarrier","complete soon");
      let expected = new ToDo("airCarrier","complete soon");
      assert.deepEqual(harshab.getToDo("0"),expected);
    });
  });
});
describe("A User class object should",()=>{
  beforeEach(()=>{
    harshab = new User("harshab");
  });
  it("be able to rebuild todo objects & their behaviour from a json string",()=>{
    let data = "{}";
    harshab.loadToDo_s(data);
    let expected = {};
    assert.deepEqual(harshab._todo_s,expected);
  });
  it("be able to rebuild todo objects & their behaviour from a json string",()=>{
    let data = `{"0": {
      "_title": "Pranoy",
      "_description": "Testing with null",
      "_items": {},
      "_noOfItems": 0
    }}`;
    harshab.loadToDo_s(data);
    let expected = new ToDo("Pranoy","Testing with null");
    assert.deepEqual(harshab._todo_s["0"],expected);
    assert.instanceOf(harshab._todo_s["0"],ToDo);
  });
  it("be able to name the todo by id.",()=>{
    let expected = null;
    assert.equal(harshab._id,expected);
    harshab.id();
    expected = 0;
    assert.equal(harshab._id,expected);
    harshab.createNew("battleship","description");
    assert.equal(harshab._id,expected);
    expected++;
    harshab.createNew("battleship","no need of description");
    assert.equal(harshab._id,expected);
    expected++;
    harshab.createNew("battleship","no need of desc.");
    assert.equal(harshab._id,expected);
    expected++;
  });
  it("be able to add item to specific todo",()=>{
    harshab.createNew("battleship","description");
    harshab.addItem("item1");
    let expected = new Item("item1");
    assert.deepEqual(harshab.getToDo('0')._items['0'],expected);
  });
});
