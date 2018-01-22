const assert = require('chai').assert;
const Item = require('../src/item.js');
const ToDo = require('../src/todo.js');

describe("ToDo class object should:",()=>{
  beforeEach(()=>{
    todo = new ToDo("title","little description");
    todo.addItem("item1_name");
    todo.addItem("item2_name");
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
  it("mark any todo-item as done/undone",()=>{
    todo.addItem("name");
    todo.tickItem("2");
    let expected = new Item("name");
    expected.tick();
    assert.deepEqual(todo.getItem("2"),expected);
    assert.isOk(todo.getItem("2").isDone);
  });
  it("be able to delete a todo-item",()=>{
    todo.deleteItem("item1_name");
    assert.deepEqual(todo.getItem("item1_name"),undefined);
  });
  describe("get doneItems", ()=>{
    it("should have zero done items",()=>{
      let expected = 0;
      assert.equal(todo.doneItems.length,expected);
    });
    it("should have one done item when tickItem() is called", ()=>{
      let expected = 0;
      assert.equal(todo.doneItems.length,expected);
      todo.tickItem('0');
      expected++;
      assert.equal(todo.doneItems.length,expected);
    });
    it("should undone item when tickItem() is called upon already ticked item", ()=>{
      todo.tickItem('0');
      // ticking the item"0"
      todo.tickItem('0');
      // unticking the item"0"
      let expected = 0;
      assert.equal(todo.doneItems.length,expected);
    });
  });
  it("be able to rebuild prototypes of item object it have",()=>{
    todo._items["2"]={
      _content:"item3_name",
      _isDone:false
    };
    todo.rebuildItems();
    let expected = new Item("item3_name");
    assert.deepEqual(todo.getItem("2"),expected)
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
