const Item = require('../src/item.js');
const assert = require('chai').assert;

describe("item class object should:",()=>{
  beforeEach(()=>{
    item = new Item("item_name");
  });

  it("be undone in state by default.",()=>{
    assert.isNotOk(item.isDone);
  });

  it("be able to tell whether it is done or not.",()=>{
    assert.isNotOk(item.isDone);
    item.tick();
    assert.isOk(item.isDone);
    item.untick();
  });

  it("give it's name when asked for.",()=>{
    let expected = "item_name"
    assert.equal(item.getName,expected);
  });

  // it("give it's description when asked for.",()=>{
  //   let item = new Item("item_name","using for a test");
  //   let expected = "using for a test";
  //   assert.deepEqual(item.getDescription,expected);
  // });

  // it("be able to set own description.",()=>{
  //   item.setDescription("descibing after creation of object");
  //   let expected = "descibing after creation of object";
  //   assert.deepEqual(item.getDescription,expected);
  //
  // });
});
