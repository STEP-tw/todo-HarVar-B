const ToDo = require('./todo.js');

class User{
  constructor(name){
    this.userName=name;
    this.todo_s={};
  }
  // rebuildTodo(todoName){
  //   this.todo_s[todoName].prototype = new ToDo().prototype;
  //   this.todo_s[todoName].rebuildItems();
  // }
  loadToDo_s(string){
    this.todo_s = JSON.parse(string);
    for (var i = 0; i < Object.keys(this.todo_s).length; i++) {
      this.todo_s[Object.keys(this.todo_s)[i]].__proto__=new ToDo().__proto__;
      this.todo_s[Object.keys(this.todo_s)[i]].rebuildItems()
    }
  }
  addItem(todo,itemName){
    this.todo_s[todo].addItem(itemName);
  }
  createNew(title,description){
    let todo = new ToDo(title,description);
    this.todo_s[title] = todo;
  }
  get getStoragePath(){
    return this.storagePath;
  }
  deleteToDo(name){
    delete this.todo_s[name];
  }
  getToDo(name){
    return this.todo_s[name];
  }
  editToDo(oldTitle,newTitle,newDescription){
    let todo = this.todo_s[oldTitle];
    todo.changeTitle(newTitle);
    if(newDescription) todo.changeDescription(newDescription);
    this.deleteToDo(oldTitle);
    this.todo_s[newTitle]=todo;
  }
  get todo_s_count(){
    return Object.keys(this.todo_s).length;
  }
  write(writeFunc){
    let string = JSON.stringify(this.todo_s);
    writeFunc(string);
  }
}
module.exports= User;
