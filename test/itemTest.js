const Item = require('../src/item.js');
const assert = require('chai').assert;

describe("item class object should:",()=>{
  beforeEach(()=>{
    item = new Item("item_name");
  });

  it("be able to tell whether it is done or not.",()=>{
    item.tick();
    assert.isOk(item.isDone);
    item.untick();
    assert.isNotOk(item.isDone);
  });

  it("give it's name when asked for.",()=>{
    let expected = "item_name";
    assert.equal(item.content,expected);
  });

  it("should change the content of item",()=>{
    let expected = "renewed_item";
    item.changeContent("renewed_item");
    assert.equal(item.content,expected);
  })
});
