const ToDo = require('./todo.js');

class User{
  constructor(name){
    this.userName=name;
    this._todo_s={};
    this._id = null;
  }
  loadToDo_s(string){
    this._todo_s = JSON.parse(string);
    for (var i = 0; i < Object.keys(this._todo_s).length; i++) {
      this._todo_s[Object.keys(this._todo_s)[i]].__proto__=new ToDo().__proto__;
      this._todo_s[Object.keys(this._todo_s)[i]].rebuildItems()
    }
  }
  id(){
    let toDoIds = Object.keys(this.todo_s);
    if(toDoIds.length==0) this._id = 0;
    else {
      let id = toDoIds.reduce((a,b)=>{
        if(+a>+b)return +a;
        else return +b;});
      this._id = ++id;
    }
  }
  addItem(itemContent){
    this._todo_s[this._id].addItem(itemContent);
  }
  createNew(title,description){
    let todo = new ToDo(title,description);
    this.id();
    this._todo_s[this._id] = todo;
  }
  deleteToDo(name){
    delete this._todo_s[name];
  }
  deleteItem(todo,item){
    this._todo_s[todo].deleteItem(item);
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
  get todo_s(){
    return this._todo_s;
  }
}
module.exports= User;
