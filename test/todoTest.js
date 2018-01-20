const assert = require('chai').assert;
const Item = require('../src/item.js');
const ToDo = require('../src/todo.js');

describe("ToDo class object should:",()=>{
  beforeEach(()=>{
    todo = new ToDo("title","little description");
    todo.addItem("item1_name","item1_desc");
    todo.addItem("item2_name","item2_desc");
  });
  it("give title when asked for",()=>{
    let expected= "title";
    assert.deepEqual(todo.title,expected);
  });
  it("give description when asked for",()=>{
    let expected= "little description";
    assert.deepEqual(todo.description,expected);
  });
  it("add items to todo-items list",()=>{
    let expected=2;
    assert.deepEqual(todo.itemsCount,expected);
  });
  it("be able to pick a specific item",()=>{
    todo.addItem("name","description");
    let expected = new Item("item1_name","description");
    assert.deepEqual(todo.getItem("0"),expected);
  });
  it.skip("mark any todo-item as done/undone",()=>{
    todo.addItem("name","description");
    todo.tickItem("name");
    let expected = new Item("name","description");
    expected.tick();
    assert.deepEqual(todo.getItem("name"),expected);
    assert.isNotOk(todo.getItem("item1_name").isDone);
  });
  it("be able to delete a todo-item",()=>{
    todo.deleteItem("item1_name");
    assert.deepEqual(todo.getItem("item1_name"),undefined);
  });
  describe.skip("be able to edit",()=>{
    it("name of item",()=>{
      todo.editItem("item1_name","name1");
      let expected = new Item("name1","item1_desc");
      assert.deepEqual(todo.getItem("name1"),expected);
    });
    it("description of item",()=>{
      todo.editItem("item1_name","item1_name","descr1");
      let expected = new Item("item1_name","descr1");
      assert.deepEqual(todo.getItem("item1_name"),expected);
    });
    it("name & description of item",()=>{
      todo.editItem("item1_name","name1","descr1");
      let expected = new Item("name1","descr1");
      assert.deepEqual(todo.getItem("name1"),expected);
    });
  });
});
