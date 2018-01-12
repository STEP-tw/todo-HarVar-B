const Item = require('./item.js');

class ToDo{
  constructor(title,description){
    this.title=title;
    this.description=description;
    this.items={};
  }
  get getTitle(){
    return this.title;
  }
  get getDescription(){
    return this.description;
  }
  addItem(name,description){
    let item = new Item(name,description);
    this.items[name]=item;
  }
  get getItemsCount(){
    return Object.keys(this.items).length;
  }
  getItem(name){
    return this.items[name];
  }
  tickItem(name){
    let item = this.items[name];
    if(item.isDone){item.untick();}
      else{item.tick();}
  }
  deleteItem(name){
    delete this.items[name];
  }
  editItem(oldName,newName,newDescription){
    let item = this.items[oldName];
    let newItem = new Item(newName,newDescription||item.getDescription);
    this.deleteItem(oldName);
    this.addItem(newName,newDescription||item.getDescription);
  }
  checkItems(){
    let itemNames = Object.keys(this.items);
    this._doneItems = itemNames.filter((name)=>{return this.items[name].isDone;});

  }
  get doneItems(){
    this.checkItems();
    return this._doneItems;
  }
}

module.exports=ToDo;
