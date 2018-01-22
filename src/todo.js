const Item = require('./item.js');

class ToDo{
  constructor(title,description){
    this._title=title;
    this._description=description;
    this._items={};
    this._noOfItems=0;
  }
  rebuildItems(){
    let items = Object.keys(this._items);
    for (var i = 0; i < items.length; i++) {
      // console.log(JSON.stringify(new Item().__proto__,null,));
      this._items[items[i]].__proto__=new Item().__proto__;
    }
  }
  get title(){
    return this._title;
  }
  get description(){
    return this._description;
  }
  addItem(name){
    let item = new Item(name);
    this._items[this._noOfItems]=item;
    this._noOfItems++;
  }
  get itemsCount(){
    return Object.keys(this._items).length;
  }
  getItem(name){
    return this._items[name];
  }
  tickItem(name){
    let item = this._items[name];
    if(item.isDone){item.untick();}
      else{item.tick();}
  }
  deleteItem(name){
    delete this._items[name];
  }
  editItem(oldName,newName,newDescription){
    let item = this._items[oldName];
    item.changeContent(newName);
    // if(newDescription)item.setDescription(newDescription);
    this.deleteItem(oldName);
    this._items[newName]=item;
  }
  checkItems(){
    let itemNames = Object.keys(this._items);
    this._doneItems = itemNames.filter((name)=>{return this._items[name].isDone;});
  }
  changeTitle(title){
    this._title=title;
  }
  changeDescription(description){
    this._description=description;
  }
  get doneItems(){
    this.checkItems();
    return this._doneItems;
  }
}

module.exports=ToDo;
