const ToDo = require('./todo.js');

class User{
  constructor(name){
    this.userName=name;
    this._todo_s={};
  }
  loadToDo_s(string){
    this._todo_s = JSON.parse(string);
    for (var i = 0; i < Object.keys(this._todo_s).length; i++) {
      this._todo_s[Object.keys(this._todo_s)[i]].__proto__=new ToDo().__proto__;
      this._todo_s[Object.keys(this._todo_s)[i]].rebuildItems()
    }
  }
  addItem(id,itemContent){
    console.log(`this._todo_s=======>${JSON.stringify(this._todo_s)} && id======>${id}`);
    this._todo_s[id].addItem(itemContent);
  }
  createNew(title,description,id){
    let todo = new ToDo(title,description);
    this._todo_s[id] = todo;
  }
  deleteToDo(name){
    delete this._todo_s[name];
  }
  getToDo(id){
    return this._todo_s[id];
  }
  editToDo(id,newTitle,newDescription){
    let todo = this._todo_s[id];
    todo.changeTitle(newTitle);
    if(newDescription) todo.changeDescription(newDescription);
    this.deleteToDo(id);
    this._todo_s[id]=todo;
  }
  get todo_s_count(){
    return Object.keys(this._todo_s).length;
  }
  write(writeFunc){
    let string = JSON.stringify(this._todo_s);
    writeFunc(string);
  }
}
module.exports= User;
